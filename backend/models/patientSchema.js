import mongoose from "mongoose";
import validator from "validator";

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      unique: true,
    },

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

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
      max: 120,
    },

    dob: {
      type: Date,
      default: null,
    },

    bloodGroup: {
      type: String,
      enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ],
      default: "",
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^[6-9]\d{9}$/, "Enter Valid Indian Mobile Number"],
    },

    email: {
      type: String,
      lowercase: true,
      default: "",
      validate: {
        validator: function (v) {
          return v === "" || validator.isEmail(v);
        },
        message: "Enter Valid Email",
      },
    },

    emergencyContact: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    height: {
      type: Number,
      default: 0,
    },

    weight: {
      type: Number,
      default: 0,
    },

    disease: {
      type: String,
      default: "",
    },

    allergies: {
      type: String,
      default: "",
    },

    medicalHistory: {
      type: String,
      default: "",
    },

    doctorName: {
      type: String,
      default: "",
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },

    status: {
      type: String,
      enum: ["Active", "Discharged", "Critical"],
      default: "Active",
    },

    reports: [
      {
        reportName: String,

        reportType: String,

        reportUrl: String,

        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    aiPredictions: [
      {
        disease: String,

        result: String,

        probability: Number,

        predictionType: String,

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

patientSchema.pre("save", async function (next) {

  if (!this.patientId) {

    const count = await mongoose.models.Patient.countDocuments();

    this.patientId = `PAT${1000 + count + 1}`;

  }

  next();

});

export const Patient =
  mongoose.models.Patient ||
  mongoose.model("Patient", patientSchema);