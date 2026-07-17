import mongoose from "mongoose";

const aiReportSchema = new mongoose.Schema(

    {

        patientName: {

            type: String,

            required: true,

            trim: true

        },

        diseaseType: {

            type: String,

            required: true,

            trim: true

        },

        prediction: {

            type: String,

            required: true

        },

        confidence: {

            type: Number,

            required: true,

            min: 0,

            max: 100

        },

        status: {

            type: String,

            enum: [

                "Normal",

                "Low Risk",

                "Medium Risk",

                "High Risk",

                "Critical"

            ],

            default: "Normal"

        },

        recommendation: {

            type: String,

            default: ""

        },

        aiModel: {

            type: String,

            default: "Custom AI"

        },

        imagePath: {

            type: String,

            default: ""

        },

        extractedText: {

            type: String,

            default: ""

        },

        doctorRemarks: {

            type: String,

            default: ""

        },

        reportType: {

            type: String,

            enum: [

                "Heart",

                "Liver",

                "Brain Tumor",

                "Kidney Stone",

                "Pneumonia",

                "Lung Cancer",

                "OCR",

                "General"

            ],

            default: "General"

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

    "AIReport",

    aiReportSchema

);