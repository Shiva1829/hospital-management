import { Patient } from "../models/patientSchema.js";

// ==========================================
// Add New Patient
// ==========================================

export const addPatient = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      age,
      dob,
      bloodGroup,
      email,
      phone,
      emergencyContact,
      address,
      disease,
      allergies,
      medicalHistory,
      doctorName,
      doctorId,
      appointmentId,
      aiPredictionId,
      reportId,
      height,
      weight,
      status,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !gender ||
      !age ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const patient = await Patient.create({
      firstName,
      lastName,
      gender,
      age,
      dob,
      bloodGroup,
      email,
      phone,
      emergencyContact,
      address,
      disease,
      allergies,
      medicalHistory,
      doctorName,
      doctorId,
      appointmentId,
      aiPredictionId,
      reportId,
      height,
      weight,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Patient added successfully.",
      patient,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// Get All Patients
// ==========================================

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      totalPatients: patients.length,
      patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================================
// Search Patient
// ==========================================

export const searchPatient = async (req, res) => {

  try {

    const keyword = req.params.keyword;

    const patients = await Patient.find({

      $or: [

        {
          firstName: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          lastName: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          email: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          phone: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          disease: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          doctorName: {
            $regex: keyword,
            $options: "i",
          },
        },

      ],

    });

    res.status(200).json({
      success: true,
      total: patients.length,
      patients,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
// ==========================================
// Get Single Patient
// ==========================================

export const getSinglePatient = async (req, res) => {
  try {

    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    res.status(200).json({
      success: true,
      patient,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// Update Patient
// ==========================================

export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient updated successfully.",
      patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================================
// Delete Patient
// ==========================================

export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    await patient.deleteOne();

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Patient Statistics
// ==========================================

export const getPatientStats = async (req, res) => {

  try {

    const totalPatients = await Patient.countDocuments();

    const diseases = await Patient.aggregate([
      {
        $group: {
          _id: "$disease",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      totalPatients,
      diseases,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
      
// ==========================================
// Patient Dashboard Analytics
// ==========================================

export const getPatientAnalytics = async (req, res) => {

  try {

    const totalPatients = await Patient.countDocuments();

    const totalMale = await Patient.countDocuments({
      gender: "Male",
    });

    const totalFemale = await Patient.countDocuments({
      gender: "Female",
    });

    const totalOther = await Patient.countDocuments({
      gender: "Other",
    });

    const diseases = await Patient.aggregate([
      {
        $group: {
          _id: "$disease",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    const doctorWise = await Patient.aggregate([
      {
        $group: {
          _id: "$doctorName",
          patients: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          patients: -1,
        },
      },
    ]);

    const recentPatients = await Patient.find()
      .sort({
        createdAt: -1,
      })
      .limit(10);

    res.status(200).json({

      success: true,

      totalPatients,

      genderStats: {
        male: totalMale,
        female: totalFemale,
        other: totalOther,
      },

      diseases,

      doctorWise,

      recentPatients,

    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};