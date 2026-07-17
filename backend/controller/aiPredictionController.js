import { AIPrediction } from "../models/AIPrediction.js";

import ErrorHandler from "../middlewares/error.js";

import generatePDF from "../utils/generatePDF.js";



// ======================================================

// Save Prediction

// ======================================================



export const savePrediction = async (req, res, next) => {

  try {

    const {

      patientId,

      patientName,

      diseaseType,

      prediction,

      confidence,

      status,

      recommendation,

      imageUrl,

    } = req.body;



    if (

      !patientName ||

      !diseaseType ||

      !prediction

    ) {

      return next(

        new ErrorHandler(

          "Patient Name, Disease Type and Prediction are required.",

          400

        )

      );

    }



    const newPrediction = await AIPrediction.create({

      patientId: patientId || null,

      patientName,

      diseaseType,

      prediction,

      confidence,

      status,

      recommendation,

      imageUrl,

    });



    return res.status(201).json({

      success: true,

      message: "Prediction saved successfully.",

      prediction: newPrediction,

    });

  } catch (error) {

    next(error);

  }

};



// ======================================================

// Get All Predictions

// ======================================================



export const getAllPredictions = async (req, res, next) => {

  try {

    const predictions = await AIPrediction.find().sort({

      createdAt: -1,

    });



    res.status(200).json({

      success: true,

      total: predictions.length,

      predictions,

    });

  } catch (error) {

    next(error);

  }

};



// ======================================================

// Get Predictions For a Specific Patient (Phase 5/7)

// GET /api/v1/predictions/patient/:patientId

// ======================================================



export const getPredictionsByPatient = async (req, res, next) => {

  try {

    const predictions = await AIPrediction.find({

      patientId: req.params.patientId,

    }).sort({ createdAt: -1 });



    return res.status(200).json({

      success: true,

      total: predictions.length,

      predictions,

    });

  } catch (error) {

    next(error);

  }

};



// ======================================================

// Get Single Prediction

// ======================================================



export const getPredictionById = async (req, res, next) => {

  try {

    const prediction = await AIPrediction.findById(req.params.id);



    if (!prediction) {

      return next(

        new ErrorHandler("Prediction not found.", 404)

      );

    }



    res.status(200).json({

      success: true,

      prediction,

    });

  } catch (error) {

    next(error);

  }

};



// ======================================================

// Update Prediction

// ======================================================



export const updatePrediction = async (req, res, next) => {

  try {

    const prediction = await AIPrediction.findByIdAndUpdate(

      req.params.id,

      req.body,

      {

        new: true,

        runValidators: true,

      }

    );



    if (!prediction) {

      return next(

        new ErrorHandler("Prediction not found.", 404)

      );

    }



    res.status(200).json({

      success: true,

      message: "Prediction updated successfully.",

      prediction,

    });

  } catch (error) {

    next(error);

  }

};



// ======================================================

// Delete Prediction

// ======================================================



export const deletePrediction = async (req, res, next) => {

  try {

    const prediction = await AIPrediction.findById(req.params.id);



    if (!prediction) {

      return next(

        new ErrorHandler("Prediction not found.", 404)

      );

    }



    await prediction.deleteOne();



    res.status(200).json({

      success: true,

      message: "Prediction deleted successfully.",

    });

  } catch (error) {

    next(error);

  }

};



// ======================================================

// Download PDF Report

// ======================================================



export const downloadReport = async (req, res, next) => {

  try {

    const prediction = await AIPrediction.findById(req.params.id);



    if (!prediction) {

      return next(

        new ErrorHandler("Prediction not found.", 404)

      );

    }



    generatePDF(res, prediction);

  } catch (error) {

    next(error);

  }

};