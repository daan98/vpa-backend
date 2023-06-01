import express from 'express';
import checkAuth from '../middleware/auth.middleware.js';
import { 
         getPatients,
         createPatient,
         getSinglePatient,
         updatePatient,
         deletePatient
        } from '../controllers/patient.controller.js';

const router = express.Router();

router.route('/').get(checkAuth, getPatients).post(checkAuth, createPatient);

router.route("/:id")
                    .get(checkAuth, getSinglePatient)
                    .put(checkAuth, updatePatient)
                    .delete(checkAuth, deletePatient)

export default router;