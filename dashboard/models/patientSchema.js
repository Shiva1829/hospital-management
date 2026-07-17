import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(

  {

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
    },

    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    address: {
      type: String,
      default: "",
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    disease: {
      type: String,
      default: "",
    },

    doctorName: {
      type: String,
      default: "",
    },

    appointmentDate: {
      type: Date,
    },

    reportUrl: {
      type: String,
      default: "",
    },

    aiPrediction: {
      type: String,
      default: "",
    },

    predictionConfidence: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Under Treatment",
        "Recovered",
        "Critical",
      ],
      default: "Pending",
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

export const Patient = mongoose.model(
  "Patient",
  patientSchema
);