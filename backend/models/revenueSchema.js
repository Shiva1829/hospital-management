import mongoose from "mongoose";

const revenueSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      default: null,
    },

    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },

    doctorName: {
      type: String,
      default: "",
      trim: true,
    },

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "UPI", "Net Banking"],
      default: "Cash",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Paid",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes
revenueSchema.index({ patientName: 1 });
revenueSchema.index({ department: 1 });
revenueSchema.index({ createdAt: -1 });

// Prevent OverwriteModelError
const Revenue =
  mongoose.models.Revenue ||
  mongoose.model("Revenue", revenueSchema);

export default Revenue;