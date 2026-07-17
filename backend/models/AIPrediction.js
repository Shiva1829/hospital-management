import mongoose from "mongoose";

const aiPredictionSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      default: null,
    },

    patientName: {
      type: String,
      required: [true, "Patient Name is required"],
      trim: true,
    },

    diseaseType: {
      type: String,
      required: [true, "Disease Type is required"],
      trim: true,
    },

    prediction: {
      type: String,
      required: [true, "Prediction is required"],
      trim: true,
    },

    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "Positive",
        "Negative",
        "Pending"
      ],
      default: "Pending",
      trim: true,
    },

    recommendation: {
      type: String,
      default: "",
      trim: true,
    },

    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ==========================================
// Indexes
// ==========================================

aiPredictionSchema.index({ patientId: 1 });

aiPredictionSchema.index({ patientName: 1 });

aiPredictionSchema.index({ diseaseType: 1 });

aiPredictionSchema.index({ createdAt: -1 });

// ==========================================
// Prevent OverwriteModelError
// ==========================================

const AIPrediction =

  mongoose.models.AIPrediction ||

  mongoose.model(

    "AIPrediction",

    aiPredictionSchema

  );

export { AIPrediction };