import { Prediction } from "../models/predictionSchema.js";
import generatePDF from "../utils/generatePDF.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

// ======================================================
// Get Single Prediction
// ======================================================

export const getSinglePrediction = catchAsyncErrors(async (req, res, next) => {

    const prediction = await Prediction.findById(req.params.id);

    if (!prediction) {

        return next(

            new ErrorHandler(

                "Prediction not found.",

                404

            )

        );

    }

    return res.status(200).json({

        success: true,

        prediction

    });

});


// ======================================================
// Download Prediction Report PDF
// ======================================================

export const downloadReport = catchAsyncErrors(async (req, res, next) => {

    const prediction = await Prediction.findById(req.params.id);

    if (!prediction) {

        return next(

            new ErrorHandler(

                "Prediction not found.",

                404

            )

        );

    }

    await generatePDF(res, {

        patientName:

            prediction.patientName,

        diseaseType:

            prediction.diseaseType,

        prediction:

            prediction.result,

        confidence:

            prediction.confidence,

        status:

            prediction.status,

        recommendation:

            prediction.recommendation,

        reportDate:

            prediction.createdAt

    });

});


