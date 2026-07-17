import mongoose from "mongoose";
import validator from "validator";

const patientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      minlength: 3,
    },

    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
      minlength: 3,
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female", "Other"],
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
      min: 0,
      max: 120,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    phone: {
      type: String,
      required: [true, "Phone Number is required"],
      match: [/^[6-9]\d{9}$/, "Enter a valid Indian mobile number"],
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },

    disease: {
      type: String,
      default: "Not Diagnosed",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Discharged"],
      default: "Active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// =====================================
// Indexes
// =====================================

patientSchema.index({ firstName: 1 });

patientSchema.index({ disease: 1 });

patientSchema.index({ createdAt: -1 });

// =====================================
// Prevent OverwriteModelError
// =====================================

const Patient =
  mongoose.models.Patient ||
  mongoose.model("Patient", patientSchema);

export { Patient };