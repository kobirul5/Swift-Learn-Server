
import { Server } from "http";
import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";
import { setupWebSocket } from "./app/socket";

const port = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI as string;

export let server: Server;

/**
 * Graceful shutdown handler
 */
const exitHandler = async (type: string, error?: unknown) => {
  if (error) {
    console.error(type, error);
  } else {
    console.log(`${type} received. Shutting down gracefully...`);
  }

  try {
    if (server) {
      server.close(() => {
        console.log("HTTP server closed.");
      });
    }

    await mongoose.connection.close();
    console.log("MongoDB connection closed.");

    process.exit(0);
  } catch (err) {
    console.error("Error during shutdown:", err);
    process.exit(1);
  }
};

/**
 * Process-level error handling
 */
process.on("uncaughtException", (error) =>
  exitHandler("Uncaught Exception", error)
);

process.on("unhandledRejection", (error) =>
  exitHandler("Unhandled Rejection", error)
);

/**
 * OS signals
 */
["SIGTERM", "SIGINT"].forEach((signal) => {
  process.on(signal, () => exitHandler(signal));
});

async function main() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");

    server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      console.log(`Server Local link : http://localhost:${port}`);
    });

    // Initialize WebSocket
    setupWebSocket(server);
  } catch (error) {
    console.error("Startup failed:", error);
    console.log("Shutting down due to startup failure.");
    process.exit(1);
  }
}

main();
