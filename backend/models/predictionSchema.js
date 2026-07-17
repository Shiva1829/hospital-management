import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(

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

        diseaseType: {

            type: String,

            required: [true, "Disease type is required"],

            trim: true

        },

        prediction: {

            type: String,

            required: [true, "Prediction result is required"],

            trim: true

        },

        confidence: {

            type: Number,

            required: true,

            min: 0,

            max: 100,

            default: 0

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

        recommendation: {

            type: String,

            default: ""

        },

        imagePath: {

            type: String,

            default: ""

        },

        reportPath: {

            type: String,

            default: ""

        },

        extractedText: {

            type: String,

            default: ""

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

// Prevent OverwriteModelError
const Prediction =

    mongoose.models.Prediction ||

    mongoose.model(

        "Prediction",

        predictionSchema

    );

export default Prediction;