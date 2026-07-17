import Message from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

// =====================================================
// Send Message
// =====================================================

export const sendMessage = catchAsyncErrors(async (req, res, next) => {

    const {

        firstName,

        lastName,

        email,

        phone,

        message

    } = req.body;

    if (

        !firstName ||

        !lastName ||

        !email ||

        !phone ||

        !message

    ) {

        return next(

            new ErrorHandler(

                "Please fill all required fields.",

                400

            )

        );

    }

    // Email validation

    const emailRegex =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        return next(

            new ErrorHandler(

                "Invalid email address.",

                400

            )

        );

    }

    // Indian mobile validation

    // Indian mobile validation
    if (!/^[6-9]\d{9}$/.test(phone)) {

        return next(

            new ErrorHandler(

                "Invalid mobile number.",

                400

            )

        );

    }

    const newMessage = await Message.create({

        firstName,

        lastName,

        email,

        phone,

        message,

        isRead: false

    });

    return res.status(201).json({

        success: true,

        message: "Message sent successfully.",

        data: newMessage

    });

});

// =====================================================
// Get All Messages
// =====================================================

export const getAllMessages = catchAsyncErrors(async (req, res) => {

    const messages = await Message.find()

        .sort({

            createdAt: -1

        });

    return res.status(200).json({

        success: true,

        total: messages.length,

        messages

    });

});

// =====================================================
// Get Message By ID
// =====================================================

export const getMessageById = catchAsyncErrors(async (req, res, next) => {

    const message = await Message.findById(

        req.params.id

    );

    if (!message) {

        return next(

            new ErrorHandler(

                "Message not found.",

                404

            )

        );

    }

    return res.status(200).json({

        success: true,

        message

    });

});

// =====================================================
// Mark As Read
// =====================================================

export const markMessageAsRead = catchAsyncErrors(async (req, res, next) => {

    const message = await Message.findById(

        req.params.id

    );

    if (!message) {

        return next(

            new ErrorHandler(

                "Message not found.",

                404

            )

        );

    }

    message.isRead = true;

    await message.save();

    return res.status(200).json({

        success: true,

        message: "Message marked as read."

    });

});

// =====================================================
// Delete Message
// =====================================================

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {

    const message = await Message.findById(

        req.params.id

    );

    if (!message) {

        return next(

            new ErrorHandler(

                "Message not found.",

                404

            )

        );

    }

    await message.deleteOne();

    return res.status(200).json({

        success: true,

        message: "Message deleted successfully."

    });

});