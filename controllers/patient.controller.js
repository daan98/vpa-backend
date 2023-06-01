import PatientModel from "../models/Patient.js";

const createPatient = async (req, res) => {
  console.log("createPatient request: ", req);
  const newPatient = new PatientModel(req.body);
  newPatient.veterinarianId = req.veterinarian._id;

  if (!newPatient.veterinarianId) {
    const error = new Error(
      "You have no access to this functionality. You are not login as a veterinarian."
    );
    res.status(401).json({ message: error.message });
  }

  try {
    const patientCreated = await newPatient.save();
    res
      .status(200)
      .json({ message: "Patient correctly saved.", content: patientCreated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await PatientModel.find()
      .where("veterinarianId")
      .equals(req.veterinarian);
    return res.status(200).json({ patientList: patients });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSinglePatient = async (req, res) => {
  const { id } = req.params;
  const foundPatient = await PatientModel.findById(id);

  if (!foundPatient)
    return res.status(404).json({ message: "No patient were found." });

  if (
    req.veterinarian._id.toString() !== foundPatient.veterinarianId.toString()
  )
    return res.json({ message: "No valid action" });

  res.status(200).json({ patient: foundPatient });
};

const updatePatient = async (req, res) => {
  const { id } = req.params;
  const foundPatient = await PatientModel.findById(id);

  if (!foundPatient)
    return res.status(404).json({ message: "No patient were found." });

  if (
    req.veterinarian._id.toString() !== foundPatient.veterinarianId.toString()
  )
    return res.json({ message: "No valid action" });

  // UPDATING INFORMATION
  foundPatient.name = req.body.name || foundPatient.name;
  foundPatient.owner = req.body.owner || foundPatient.owner;
  foundPatient.email = req.body.email || foundPatient.email;
  foundPatient.appointmentDate =
    req.body.appointmentDate || foundPatient.appointmentDate;
  foundPatient.symptom = req.body.symptom || foundPatient.symptom;

  try {
    const updatedPatient = await foundPatient.save();
    return res.status(200).json({ updatedPatient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePatient = async (req, res) => {
  const { id } = req.params;
  const foundPatient = await PatientModel.findById(id);

  if (!foundPatient)
    return res.status(404).json({ message: "No patient were found." });

  if (
    req.veterinarian._id.toString() !== foundPatient.veterinarianId.toString()
  )
    return res.json({ message: "No valid action" });

  try {
    await foundPatient.deleteOne();
    res
      .status(200)
      .json({
        message: "Patient deleted correctly.",
        patientId: foundPatient._id,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getPatients,
  createPatient,
  getSinglePatient,
  updatePatient,
  deletePatient,
};
