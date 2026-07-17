import express from "express";

import {

    sendMessage,

    getAllMessages

} from "../controller/messageController.js";

const router = express.Router();

// ===========================================
// Message API Health Check
// GET /api/v1/message
// ===========================================

router.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "Message API Running Successfully"

    });

});

// ===========================================
// Contact Us / Send Message
// POST /api/v1/message/send
// ===========================================

router.post(

    "/send",

    sendMessage

);

// ===========================================
// Get All Messages (Admin)
// GET /api/v1/message/all
// ===========================================

router.get(

    "/all",

    getAllMessages

);

export default router;