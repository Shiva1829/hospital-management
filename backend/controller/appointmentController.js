import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";
import { Patient } from "../models/patientSchema.js";

// ======================================================
// Create Appointment
// ======================================================

export const postAppointment = catchAsyncErrors(async (req, res, next) => {

    const {

        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        appointment_date,
        appointment_time,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address

    } = req.body;

    // Required fields
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !dob ||
        !gender ||
        !appointment_date ||
        !appointment_time ||
        !department ||
        !address
    ) {
        return next(
            new ErrorHandler(
                "Please fill all required fields.",
                400
            )
        );
    }

    // Doctor selection
    if (!doctor_firstName || !doctor_lastName) {
        return next(
            new ErrorHandler(
                "Please select a doctor.",
                400
            )
        );
    }

    // Email validation
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return next(
            new ErrorHandler(
                "Invalid email address.",
                400
            )
        );
    }

    // Indian mobile validation
    if (!/^[6-9]\d{9}$/.test(phone)) {
        return next(
            new ErrorHandler(
                "Invalid mobile number.",
                400
            )
        );
    }

    // Appointment date validation
    const appointmentDate = new Date(
        appointment_date
    );

    if (appointmentDate < new Date()) {

        return next(
            new ErrorHandler(
                "Appointment date cannot be in the past.",
                400
            )
        );

    }

    // Doctor lookup
    const doctors = await User.find({

        firstName: doctor_firstName,

        lastName: doctor_lastName,

        role: "Doctor",

        doctorDepartment: department

    });

    if (doctors.length === 0) {

        return next(
            new ErrorHandler(
                "Doctor not found.",
                404
            )
        );

    }

    if (doctors.length > 1) {

        return next(
            new ErrorHandler(
                "Multiple doctors found. Please contact administrator.",
                400
            )
        );

    }

    // ==========================================================
    // Phase 9 — Auto-create Patient record if one doesn't exist
    // ==========================================================

    let patientRecord = await Patient.findOne({ phone });

    if (!patientRecord) {

        patientRecord = await Patient.create({
            firstName,
            lastName,
            gender,
            age: 0,
            dob,
            phone,
            email,
            address,
            doctorName: `${doctor_firstName} ${doctor_lastName}`,
            doctorId: doctors[0]._id,
        });

    }

    const appointment = await Appointment.create({

        firstName,

        lastName,

        email,

        phone,

        dob,

        gender,

        appointment_date,

        appointment_time,

        department,

        doctor: {

            firstName: doctor_firstName,

            lastName: doctor_lastName

        },

        hasVisited,

        address,

        doctorId: doctors[0]._id,

        patientId: req.user._id

    });

    return res.status(201).json({

        success: true,

        message: "Appointment booked successfully.",

        appointment,

        patient: patientRecord

    });

});

// ======================================================
// Get All Appointments
// ======================================================

export const getAllAppointments = catchAsyncErrors(async (req, res) => {

    const appointments = await Appointment.find()

        .sort({

            createdAt: -1

        });

    return res.status(200).json({

        success: true,

        total: appointments.length,

        appointments

    });

});

// ======================================================
// Update Appointment Status
// ======================================================

export const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {

    const appointment = await Appointment.findById(

        req.params.id

    );

    if (!appointment) {

        return next(
            new ErrorHandler(
                "Appointment not found.",
                404
            )
        );

    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(

        req.params.id,

        req.body,

        {

            new: true,

            runValidators: true

        }

    );

    return res.status(200).json({

        success: true,

        message: "Appointment updated successfully.",

        appointment: updatedAppointment

    });

});

// ======================================================
// Delete Appointment
// ======================================================

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {

    const appointment = await Appointment.findById(

        req.params.id

    );

    if (!appointment) {

        return next(
            new ErrorHandler(
                "Appointment not found.",
                404
            )
        );

    }

    await appointment.deleteOne();

    return res.status(200).json({

        success: true,

        message: "Appointment deleted successfully."

    });

});