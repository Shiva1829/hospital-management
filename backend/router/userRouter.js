import express from "express";

import {

    addNewAdmin,

    addNewDoctor,

    getAllDoctors,

    getUserDetails,

    login,

    logoutAdmin,

    logoutPatient,

    patientRegister

} from "../controller/userController.js";

import {

    isAdminAuthenticated,

    isPatientAuthenticated

} from "../middlewares/auth.js";

const router = express.Router();

// ===========================================
// User API Health Check
// GET /api/v1/user
// ===========================================

router.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "User API Running Successfully"

    });

});

// ===========================================
// Patient Registration
// POST /api/v1/user/patient/register
// ===========================================

router.post(

    "/patient/register",

    patientRegister

);

// ===========================================
// Login
// POST /api/v1/user/login
// ===========================================

router.post(

    "/login",

    login

);

// ===========================================
// Add New Admin
// POST /api/v1/user/admin/addnew
// ===========================================

// TEMPORARY ROUTE - DELETE AFTER FIRST ADMIN CREATED
router.post(
    "/admin/setup",
    addNewAdmin
);

router.post(

    "/admin/addnew",

    isAdminAuthenticated,

    addNewAdmin

);

// ===========================================
// Add New Doctor
// POST /api/v1/user/doctor/addnew
// ===========================================

router.post(

    "/doctor/addnew",

    isAdminAuthenticated,

    addNewDoctor

);

// ===========================================
// Get All Doctors
// GET /api/v1/user/doctors
// ===========================================

router.get(

    "/doctors",

    getAllDoctors

);

// ===========================================
// Patient Profile
// GET /api/v1/user/patient/me
// ===========================================

router.get(

    "/patient/me",

    isPatientAuthenticated,

    getUserDetails

);

// ===========================================
// Admin Profile
// GET /api/v1/user/admin/me
// ===========================================

router.get(

    "/admin/me",

    isAdminAuthenticated,

    getUserDetails

);

// ===========================================
// Patient Logout
// GET /api/v1/user/patient/logout
// ===========================================

router.get(

    "/patient/logout",

    isPatientAuthenticated,

    logoutPatient

);

// ===========================================
// Admin Logout
// GET /api/v1/user/admin/logout
// ===========================================

router.get(

    "/admin/logout",

    isAdminAuthenticated,

    logoutAdmin

);

export default router;