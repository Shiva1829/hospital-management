import generatePDF from "../utils/generatePDF.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

// ======================================================
// Generate Prediction PDF Report
// ======================================================

export const createPDF = catchAsyncErrors(async (req, res, next) => {

    const reportData = req.body;

    if (

        !reportData ||

        Object.keys(reportData).length === 0

    ) {

        return next(

            new ErrorHandler(

                "No report data provided.",

                400

            )

        );

    }

    try {

        await generatePDF(

            res,

            reportData

        );

    }

    catch (error) {

        return next(

            new ErrorHandler(

                error.message ||

                "Failed to generate PDF.",

                500

            )

        );

    }

});