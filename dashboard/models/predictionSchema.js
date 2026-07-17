import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(

  {

    patientName: {
      type: String,
      required: true,
      trim: true,
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      default: null,
    },

    diseaseType: {
      type: String,
      required: true,
      enum: [
        "Heart Disease",
        "Liver Disease",
        "Kidney Stone",
        "Brain Tumor",
        "Cancer",
        "Pneumonia",
        "X-Ray",
        "OCR Report",
        "Other",
      ],
    },

    prediction: {
      type: String,
      required: true,
      trim: true,
    },

    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    riskLevel: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
      ],
      default: "Low",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Reviewed",
        "Confirmed",
      ],
      default: "Pending",
    },

    recommendation: {
      type: String,
      default: "",
    },

    doctorName: {
      type: String,
      default: "",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    reportUrl: {
      type: String,
      default: "",
    },

  },

  {
    timestamps: true,
  }

);

export const Prediction = mongoose.model(
  "Prediction",
  predictionSchema
);