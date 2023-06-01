import mongoose from "mongoose";
import bcrypt from "bcrypt";
import createId from "../helpers/createId.js";

const veterinarianSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    default: null,
    trim: true,
  },
  web: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: createId(),
  },
  isConfirm: {
    type: Boolean,
    default: false,
  },
});

veterinarianSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

veterinarianSchema.methods.CheckPassword = async function (formPassword) {
  return await bcrypt.compare(formPassword, this.password);
};

const VeterinarianModel = mongoose.model("Veterinarian", veterinarianSchema);

export default VeterinarianModel;
