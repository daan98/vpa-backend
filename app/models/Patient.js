import mongoose from "mongoose";

const PatientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    symptom: {
      type: String,
      required: true,
    },
    veterinarianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veterinarian",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PatientModel = mongoose.model("Patient", PatientSchema);

export default PatientModel;
