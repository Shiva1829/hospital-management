import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(

    {

        title: {

            type: String,

            required: [true, "Notification title is required."],

            trim: true

        },

        message: {

            type: String,

            required: [true, "Notification message is required."],

            trim: true

        },

        type: {

            type: String,

            enum: [

                "Appointment",

                "AI Prediction",

                "Medical Report",

                "Revenue",

                "Patient",

                "Doctor",

                "System",

                "General"

            ],

            default: "General"

        },

        priority: {

            type: String,

            enum: [

                "Low",

                "Medium",

                "High"

            ],

            default: "Medium"

        },

        recipient: {

            type: String,

            enum: [

                "Admin",

                "Doctor",

                "Patient",

                "All"

            ],

            default: "Admin"

        },

        userId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            default: null

        },

        status: {

            type: String,

            enum: [

                "Unread",

                "Read"

            ],

            default: "Unread"

        },

        actionLink: {

            type: String,

            default: ""

        },

        isDeleted: {

            type: Boolean,

            default: false

        }

    },

    {

        timestamps: true

    }

);

export default mongoose.model(

    "Notification",

    notificationSchema

);