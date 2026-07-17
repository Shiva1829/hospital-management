import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(

    {

        patientName: {

            type: String,

            required: [true, "Patient name is required"],

            trim: true

        },

        patientId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Patient",

            default: null

        },

        reportType: {

            type: String,

            enum: [

                "Blood Report",

                "X-Ray",

                "MRI",

                "CT Scan",

                "Ultrasound",

                "ECG",

                "Prescription",

                "Other"

            ],

            default: "Other"

        },

        disease: {

            type: String,

            required: true,

            trim: true

        },

        confidence: {

            type: Number,

            required: true,

            min: 0,

            max: 100,

            default: 0

        },

        recommendation: {

            type: String,

            default: ""

        },

        extractedText: {

            type: String,

            default: ""

        },

        fileUrl: {

            type: String,

            default: ""

        },

        imagePath: {

            type: String,

            default: ""

        },

        status: {

            type: String,

            enum: [

                "Healthy",

                "Low Risk",

                "Medium Risk",

                "High Risk",

                "Critical",

                "Unknown"

            ],

            default: "Unknown"

        },

        aiModel: {

            type: String,

            default: "CNN"

        },

        doctorVerified: {

            type: Boolean,

            default: false

        },

        doctorRemarks: {

            type: String,

            default: ""

        }

     
    },

    {

        timestamps: true

    }

);

const Report =

    mongoose.models.Report ||

    mongoose.model(

        "Report",

        reportSchema

    );

export default Report;