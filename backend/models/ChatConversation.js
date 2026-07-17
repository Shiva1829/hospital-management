import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "model"],
      required: true,
    },

    text: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const conversationSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },

    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "ChatConversation",
  conversationSchema
);