import express from "express";

import {

    addNotification,

    getNotifications

} from "../controller/notificationController.js";

const router = express.Router();

// ===========================================
// Notification API Health Check
// GET /api/v1/notification
// ===========================================

router.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "Notification API Running Successfully"

    });

});

// ===========================================
// Add Notification
// POST /api/v1/notification/add
// ===========================================

router.post(

    "/add",

    addNotification

);

// ===========================================
// Get All Notifications
// GET /api/v1/notification/all
// ===========================================

router.get(

    "/all",

    getNotifications

);

export default router;