import express from "express";

import {
  chatWithBot,
  clearConversation,
} from "../controller/chatbotController.js";

const router = express.Router();

// ==========================================
// Health Check
// ==========================================

router.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message: "AI Chatbot API Running Successfully",

  });

});

// ==========================================
// Chat with Gemini AI
// POST /api/v1/chatbot/chat
// ==========================================

router.post("/chat", chatWithBot);

// ==========================================
// Clear Conversation
// POST /api/v1/chatbot/clear
// ==========================================

router.post("/clear", clearConversation);

export default router;