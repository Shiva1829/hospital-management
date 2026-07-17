import mongoose from "mongoose";

const revenueSchema = new mongoose.Schema(

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
      required: true,
      trim: true,
    },

    doctorDepartment: {
      type: String,
      default: "",
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: [
        "Cash",
        "Card",
        "UPI",
        "Net Banking",
        "Insurance",
      ],
      default: "Cash",
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Refunded",
      ],
      default: "Paid",
    },

    transactionId: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    invoiceNumber: {
      type: String,
      default: "",
    },

  },

  {
    timestamps: true,
  }

);

export const Revenue = mongoose.model(
  "Revenue",
  revenueSchema
);