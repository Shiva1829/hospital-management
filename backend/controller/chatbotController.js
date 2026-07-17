import { GoogleGenAI } from "@google/genai";
import ChatConversation from "../models/ChatConversation.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

// ======================================================
// AI System Prompt
// ======================================================

const SYSTEM_PROMPT = `
You are ShivShakti AI Medical Assistant.

You work for AI Hospital Management System.

Rules:

1. Always be polite.

2. Always answer in Markdown.

3. Explain diseases in simple language.

4. Never prescribe medicines.

5. Always recommend consulting a qualified doctor.

6. Hospital AI Services:

• Heart Disease Prediction
• Liver Disease Prediction
• Kidney Stone Detection
• Brain Tumor Detection
• Lung Cancer Detection
• X-Ray Analysis
• OCR Medical Report Analysis

7. If user uploads a medical report,
help explain the report.

8. Keep answers concise.

9. Never answer illegal or harmful medical requests.

10. If user asks unrelated questions,
reply politely.

11. Always act like a professional hospital AI assistant.
`;


// ======================================================
// Chat With Bot
// ======================================================

export const chatWithBot = catchAsyncErrors(async (req, res, next) => {

    const { message, sessionId } = req.body;

    if (!message) {

        return next(
            new ErrorHandler(
                "Message is required.",
                400
            )
        );

    }

    // ============================================
    // Gemini Initialization
    // ============================================

    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });

    // ============================================
    // Conversation
    // ============================================

    let conversation = await ChatConversation.findOne({
        sessionId,
    });

    if (!conversation) {

        conversation = await ChatConversation.create({

            sessionId,

            messages: [],

        });

    }

    // ============================================
    // Save User Message
    // ============================================

    conversation.messages.push({

        role: "user",

        text: message,

    });

    // ============================================
    // Previous History
    // ============================================

    const history = conversation.messages
        .slice(-20)
        .map((msg) => ({
            role: msg.role,
            parts: [
                {
                    text: msg.text,
                },
            ],
        }));

    const contents = [

        {

            role: "user",

            parts: [

                {

                    text: SYSTEM_PROMPT,

                },

            ],

        },

        ...history,

    ];

    let reply = "";

    try {

     const response = await ai.models.generateContent({

        model: "gemini-3-flash-preview",

        contents,

    });
    
        console.log("Gemini Response Received");

        reply = response.text;

    }

    catch (error) {

        console.log("Gemini Error");

        console.log(error);

        reply =
            "⚠️ AI Server is temporarily unavailable. Please try again later.";

    }

    // ============================================
    // Save Bot Reply
    // ============================================

    conversation.messages.push({

        role: "model",

        text: reply,

    });

    await conversation.save();

    res.status(200).json({

        success: true,

        reply,

        history: conversation.messages,

    });

});


// ======================================================
// Clear Conversation
// ======================================================

export const clearConversation = catchAsyncErrors(async (req, res) => {

    const { sessionId } = req.body;

    await ChatConversation.deleteOne({

        sessionId,

    });

    res.status(200).json({

        success: true,

        message: "Conversation Cleared Successfully.",

    });

});