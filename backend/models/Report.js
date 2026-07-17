import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
{
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient"
  },

  reportType: String,

  fileUrl: String,

  extractedText: String,

  aiPrediction: String
},
{
  timestamps: true
}
);

export const Report = mongoose.model(
  "Report",
  reportSchema
);