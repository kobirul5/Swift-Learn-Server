import { Schema, model, Types } from 'mongoose';

const chatSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  message: { type: String, required: true },
  images: [{ type: String }],
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

export const Chat = model('Chat', chatSchema);
