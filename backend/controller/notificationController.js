import Notification from "../models/notificationSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

// =====================================================
// Create Notification
// =====================================================

export const addNotification = catchAsyncErrors(async (req, res, next) => {

    const {

        title,

        message

    } = req.body;

    if (!title || !message) {

        return next(

            new ErrorHandler(

                "Title and Message are required.",

                400

            )

        );

    }

    const notification = await Notification.create({

        title,

        message,

        isRead: false

    });

    return res.status(201).json({

        success: true,

        message: "Notification created successfully.",

        notification

    });

});

// =====================================================
// Get All Notifications
// =====================================================

export const getNotifications = catchAsyncErrors(async (req, res) => {

    const notifications = await Notification.find()

        .sort({

            createdAt: -1

        });

    return res.status(200).json({

        success: true,

        total: notifications.length,

        notifications

    });

});

// =====================================================
// Get Unread Notifications
// =====================================================

export const getUnreadNotifications = catchAsyncErrors(async (req, res) => {

    const notifications = await Notification.find({

        isRead: false

    }).sort({

        createdAt: -1

    });

    return res.status(200).json({

        success: true,

        total: notifications.length,

        notifications

    });

});

// =====================================================
// Mark Notification As Read
// =====================================================

export const markNotificationRead = catchAsyncErrors(async (req, res, next) => {

    const notification = await Notification.findById(

        req.params.id

    );

    if (!notification) {

        return next(

            new ErrorHandler(

                "Notification not found.",

                404

            )

        );

    }

    notification.isRead = true;

    await notification.save();

    return res.status(200).json({

        success: true,

        message: "Notification marked as read."

    });

});

// =====================================================
// Delete Notification
// =====================================================

export const deleteNotification = catchAsyncErrors(async (req, res, next) => {

    const notification = await Notification.findById(

        req.params.id

    );

    if (!notification) {

        return next(

            new ErrorHandler(

                "Notification not found.",

                404

            )

        );

    }

    await notification.deleteOne();

    return res.status(200).json({

        success: true,

        message: "Notification deleted successfully."

    });

});

// =====================================================
// Notification Count
// =====================================================

export const getNotificationCount = catchAsyncErrors(async (req, res) => {

    const unread = await Notification.countDocuments({

        isRead: false

    });

    const total = await Notification.countDocuments();

    return res.status(200).json({

        success: true,

        total,

        unread

    });

});