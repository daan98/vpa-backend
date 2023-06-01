import express from "express";
import dotenv from "dotenv";
import connectDB from "./app/config/db.js";
import veterinarianRoutes from "./app/routes/veterinarian.route.js";
import patientRoutes from "./app/routes/patient.route.js";
import cors from "cors";

const app = express();

app.use(express.json());
dotenv.config();

connectDB();

const acceptedDomains = [process.env.FRONTEND_URL, "http://localhost:4000/api"];
const corsOptions = {
  origin: function (origin, callback) {
    if (acceptedDomains.indexOf(origin) !== -1) {
      // request origin is accepted
      callback(null, true);
    } else {
      callback(new Error("You have no access due to CORS."));
    }
  },
};

app.use(cors(corsOptions));
app.use("/api/veterinarian", veterinarianRoutes);
app.use("/api/patient", patientRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
