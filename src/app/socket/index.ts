import { Server } from "http";
import { WebSocket, WebSocketServer } from "ws";
import config from "../../envs";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { Chat } from "../module/chat/chat.model";
import { Room } from "../module/room/room.model";

interface ExtendedWebSocket extends WebSocket {
  userId?: string;
}

const onlineUsers = new Set<string>();
const userSockets = new Map<string, Set<ExtendedWebSocket>>();

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ server });
  console.log("WebSocket server is running");

  wss.on("connection", (ws: ExtendedWebSocket, req) => {
    console.log("A user connected");

    const addUserSocket = (userId: string, socket: ExtendedWebSocket) => {
        if (!userSockets.has(userId)) {
            userSockets.set(userId, new Set());
        }
        userSockets.get(userId)!.add(socket);
    };

    const removeUserSocket = (userId: string, socket: ExtendedWebSocket) => {
        if (userSockets.has(userId)) {
            const sockets = userSockets.get(userId)!;
            sockets.delete(socket);
            if (sockets.size === 0) {
                userSockets.delete(userId);
                onlineUsers.delete(userId);
            }
        }
    };

    const sendToUser = (userId: string, message: object) => {
        const sockets = userSockets.get(userId);
        if (sockets) {
            sockets.forEach(socket => {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify(message));
                }
            });
        }
    };

    // Authenticate via Cookie
    const rawCookies = req.headers.cookie;
    if (rawCookies) {

      
      // Robust cookie parsing
      const parsedCookies = rawCookies.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        if (key && value) acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      const token = parsedCookies['accessToken'];

      if (token) {
        console.log("AccessToken found in cookies");
        try {
          const user: any = jwtHelpers.verifyToken(
            token,
            config.jwt.access_token_secret as string
          );
          
          if (user) {
            const { id, userId, _id } = user;
            const finalId = id || userId || _id;
            
            if (finalId) {
                ws.userId = finalId;
                onlineUsers.add(finalId);
                addUserSocket(finalId, ws);
                console.log("User authenticated via Cookie, ID:", finalId);
                
                broadcastToAll(wss, {
                  event: "userStatus",
                  data: { userId: finalId, isOnline: true },
                });
            } else {
                console.log("User ID missing in token payload:", user);
            }
          } else {
              console.log("Token verification returned null user");
          }
        } catch (error) {
          console.error("Cookie token verification failed:", error);
        }
      } else {
          console.log("No accessToken found in parsed cookies");
      }
    } else {
        console.log("No cookies found in handshake request headers");
    }

    ws.on("message", async (data: string) => {
      try {
        const parsedData = JSON.parse(data);
        switch (parsedData.event) {
          case "authenticate": {
            console.log("Authenticating...");
            const token = parsedData.token;

            if (!token) {
              console.log("No token provided");
              ws.close();
              return;
            }

            try {
              const user: any = jwtHelpers.verifyToken(
                token,
                config.jwt.access_token_secret as string
              );
              console.log("Token verified, user:", user);

              if (!user) {
                console.log("Invalid token user data");
                ws.close();
                return;
              }

              const { id, userId, _id } = user;
              const finalId = id || userId || _id;

              if (!finalId) {
                  console.log("No user ID found in token payload:", user);
                  ws.close();
                  return;
              }

              ws.userId = finalId;
              onlineUsers.add(finalId);
              addUserSocket(finalId, ws);
              console.log("User authenticated, setting ws.userId:", finalId);

              broadcastToAll(wss, {
                event: "userStatus",
                data: { userId: finalId, isOnline: true },
              });
            } catch (err) {
              console.log("Token verification failed:", err);
              ws.close();
            }
            break;
          }

          case "message": {
            const { receiverId, message, images } = parsedData;
            console.log("Message data", receiverId, message, images);
            console.log("ws.userId:", ws.userId);

            if (!ws.userId || !receiverId || !message) {
              console.log("Invalid message payload");
              return;
            }

            // Find or create room
            let room = await Room.findOne({
              participants: { $all: [ws.userId, receiverId] }
            });

            if (!room) {
              room = await Room.create({
                participants: [ws.userId, receiverId]
              });
            }

            const chat = await Chat.create({
              senderId: ws.userId,
              receiverId,
              roomId: room._id,
              message,
              images: images || [],
            });

            // Update room's last message
            await Room.findByIdAndUpdate(room._id, {
                lastMessage: chat._id
            });

            // Send to receiver (all their active sockets)
            sendToUser(receiverId, { event: "message", data: chat });

            // Send back to sender (all their active sockets, so other tabs update too)
            sendToUser(ws.userId, { event: "message", data: chat });
            break;
          }

          case "fetchChats": {
            const { receiverId } = parsedData;
            if (!ws.userId) {
              console.log("User not authenticated");
              return;
            }

            const room = await Room.findOne({
              participants: { $all: [ws.userId, receiverId] }
            });

            if (!room) {
              ws.send(JSON.stringify({ event: "noRoomFound" }));
              return;
            }

            const chats = await Chat.find({ roomId: room._id }).sort({ createdAt: 1 });

            // Mark unread messages as read
            await Chat.updateMany(
              { roomId: room._id, receiverId: ws.userId, isRead: false },
              { $set: { isRead: true } }
            );

            ws.send(
              JSON.stringify({
                event: "fetchChats",
                data: { chats },
              })
            );
            break;
          }

          case "messageList": {
            try {
              // Get all rooms where user is a participant
              const rooms = await Room.find({
                participants: ws.userId
              }).populate('participants', 'name image email role')
                .populate('lastMessage')
                .sort({ updatedAt: -1 });

              ws.send(
                JSON.stringify({
                  event: "messageList",
                  data: rooms,
                })
              );
            } catch (error) {
              console.error("Error fetching message list:", error);
              ws.send(
                JSON.stringify({
                  event: "error",
                  message: "Failed to fetch message list",
                })
              );
            }
            break;
          }

          default:
            console.log("Unknown event type:", parsedData.event);
        }
      } catch (error) {
        console.error("Error handling WebSocket message:", error);
      }
    });

    ws.on("close", () => {
      if (ws.userId) {
        removeUserSocket(ws.userId, ws);

        /* Only broadcast offline if ALL sockets for user are gone
           removeUserSocket handles deleting from map if empty.
           Check map or onlineUsers set */
        if (!userSockets.has(ws.userId)) {
             broadcastToAll(wss, {
               event: "userStatus",
               data: { userId: ws.userId, isOnline: false },
             });
        }
      }
      console.log("User disconnected");
    });
  });

  return wss;
}

function broadcastToAll(wss: WebSocketServer, message: object) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}
