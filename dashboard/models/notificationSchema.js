import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(

  {

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "Appointment",
        "Patient",
        "Doctor",
        "AI Prediction",
        "Report",
        "System",
      ],
      default: "System",
    },

    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
      ],
      default: "Medium",
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    actionLink: {
      type: String,
      default: "",
    },

  },

  {
    timestamps: true,
  }

);

export const Notification = mongoose.model(
  "Notification",
  notificationSchema
);