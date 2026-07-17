import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(

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

    doctorName: {
      type: String,
      default: "",
    },

    reportType: {
      type: String,
      enum: [
        "CBC",
        "MRI",
        "CT Scan",
        "X-Ray",
        "Ultrasound",
        "Blood Test",
        "Heart Report",
        "Cancer Report",
        "OCR Report",
        "Other",
      ],
      required: true,
    },

    diseaseType: {
      type: String,
      default: "",
    },

    fileUrl: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      default: "",
    },

    aiPrediction: {
      type: String,
      default: "",
    },

    confidence: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: [
        "Uploaded",
        "Reviewed",
        "Completed",
      ],
      default: "Uploaded",
    },

    remarks: {
      type: String,
      default: "",
    },

  },

  {
    timestamps: true,
  }

);

export const Report = mongoose.model(
  "Report",
  reportSchema
);