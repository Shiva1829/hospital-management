import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema(

    {

        firstName: {

            type: String,

            required: [true, "First Name is required."],

            minlength: 3,

            trim: true

        },

        lastName: {

            type: String,

            required: [true, "Last Name is required."],

            minlength: 3,

            trim: true

        },

        email: {

            type: String,

            required: [true, "Email is required."],

            lowercase: true,

            validate: [

                validator.isEmail,

                "Please enter a valid email."

            ]

        },

        phone: {

            type: String,

            required: [true, "Phone number is required."],

            match: [

                /^[6-9]\d{9}$/,

                "Enter a valid Indian mobile number."

            ]

        },

        subject: {

            type: String,

            default: "General Enquiry",

            trim: true

        },

        message: {

            type: String,

            required: [true, "Message is required."],

            minlength: 10,

            maxlength: 1000,

            trim: true

        },

        status: {

            type: String,

            enum: [

                "New",

                "Read",

                "Replied",

                "Closed"

            ],

            default: "New"

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

        adminReply: {

            type: String,

            default: ""

        }

    },

    {

        timestamps: true

    }

);

const Message = mongoose.model(

    "Message",

    messageSchema

);

export default Message;