import { Schema, model, Types } from 'mongoose';

const roomSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  lastMessage: { type: Schema.Types.ObjectId, ref: 'Chat' },
}, { timestamps: true });

export const Room = model('Room', roomSchema);
