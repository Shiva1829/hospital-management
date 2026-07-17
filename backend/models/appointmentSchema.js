import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema(

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

        dob: {

            type: Date,

            required: [true, "Date of Birth is required."]

        },

        gender: {

            type: String,

            enum: [

                "Male",

                "Female",

                "Other"

            ],

            required: true

        },

        appointment_date: {

            type: Date,

            required: true

        },

        appointment_time: {

            type: String,

            required: true

        },

        department: {

            type: String,

            required: true,

            trim: true

        },

        doctor: {

            firstName: {

                type: String,

                required: true

            },

            lastName: {

                type: String,

                required: true

            }

        },

        symptoms: {

            type: String,

            default: ""

        },

        hasVisited: {

            type: Boolean,

            default: false

        },

        address: {

            type: String,

            required: true

        },

        doctorId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        patientId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        aiPredictionId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "AIPrediction",

            default: null

        },

        doctorNotes: {

            type: String,

            default: ""

        },

        meetingMode: {

            type: String,

            enum: [

                "Offline",

                "Online"

            ],

            default: "Offline"

        },

        paymentStatus: {

            type: String,

            enum: [

                "Pending",

                "Paid",

                "Refunded"

            ],

            default: "Pending"

        },

        status: {

            type: String,

            enum: [

                "Pending",

                "Accepted",

                "Rejected",

                "Completed",

                "Cancelled"

            ],

            default: "Pending"

        }

    },

    {

        timestamps: true

    }

);

export const Appointment = mongoose.model(

    "Appointment",

    appointmentSchema

);