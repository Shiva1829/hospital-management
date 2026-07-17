import express from "express";

import {

    postAppointment,

    getAllAppointments,

    updateAppointmentStatus,

    deleteAppointment

} from "../controller/appointmentController.js";

import {

    isAdminAuthenticated,

    isPatientAuthenticated

} from "../middlewares/auth.js";

const router = express.Router();

// ===========================================
// Patient Routes
// ===========================================

// Book Appointment
// POST /api/v1/appointment/post

router.post(

    "/post",

    isPatientAuthenticated,

    postAppointment

);

// ===========================================
// Admin Routes
// ===========================================

// Get All Appointments
// GET /api/v1/appointment/getall

router.get(

    "/getall",

    isAdminAuthenticated,

    getAllAppointments

);

// Update Appointment Status
// PUT /api/v1/appointment/update/:id

router.put(

    "/update/:id",

    isAdminAuthenticated,

    updateAppointmentStatus

);

// Delete Appointment
// DELETE /api/v1/appointment/delete/:id

router.delete(

    "/delete/:id",

    isAdminAuthenticated,

    deleteAppointment

);

export default router;