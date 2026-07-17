import Report from "../models/reportSchema.js";
import PDFDocument from "pdfkit";

import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";


// =====================================================
// Upload AI Report
// =====================================================

export const uploadReport = catchAsyncErrors(async (req, res, next) => {

    const report = await Report.create(req.body);

    return res.status(201).json({

        success: true,

        message: "Report uploaded successfully.",

        report

    });

});


// =====================================================
// Get All Reports
// =====================================================

export const getAllReports = catchAsyncErrors(async (req, res, next) => {

    const reports = await Report.find()

        .sort({

            createdAt: -1

        });

    return res.status(200).json({

        success: true,

        totalReports: reports.length,

        reports

    });

});

// =====================================================
// Get Reports By Patient
// =====================================================

export const getReportsByPatient = catchAsyncErrors(async (req, res, next) => {

    const reports = await Report.find({
        patientId: req.params.patientId,
    }).sort({
        createdAt: -1,
    });

    return res.status(200).json({

        success: true,

        totalReports: reports.length,

        reports,

    });

});

// =====================================================
// Get Single Report
// =====================================================

export const getSingleReport = catchAsyncErrors(async (req, res, next) => {

    const report = await Report.findById(req.params.id);

    if (!report) {

        return next(

            new ErrorHandler(

                "Report not found.",

                404

            )

        );

    }

    return res.status(200).json({

        success: true,

        report

    });

});


// =====================================================
// Generate Professional PDF Report
// =====================================================

export const generateReport = catchAsyncErrors(async (req, res, next) => {

    const {

        patientName,

        disease,

        confidence,

        recommendation

    } = req.body;

    if (

        !patientName ||

        !disease

    ) {

        return next(

            new ErrorHandler(

                "Patient name and disease are required.",

                400

            )

        );

    }

    const doc = new PDFDocument({

        margin: 50,

        size: "A4"

    });

    res.setHeader(

        "Content-Type",

        "application/pdf"

    );

    res.setHeader(

        "Content-Disposition",

        `attachment; filename=${patientName}-Medical-Report.pdf`

    );

    doc.pipe(res);

    // =================================================

    // Header

    // =================================================

    doc

        .fontSize(24)

        .fillColor("#0F62FE")

        .text(

            "AI Hospital Management System",

            {

                align: "center"

            }

        );

    doc

        .moveDown(0.3);

    doc

        .fontSize(16)

        .fillColor("black")

        .text(

            "Medical AI Diagnosis Report",

            {

                align: "center"

            }

        );

    doc.moveDown(2);

    // =================================================

    // Patient Information

    // =================================================

    doc

        .fontSize(18)

        .fillColor("#2563EB")

        .text("Patient Information");

    doc.moveDown();

    doc

        .fontSize(13)

        .fillColor("black")

        .text(`Patient Name : ${patientName}`);

    doc.text(`Disease : ${disease}`);

    doc.text(`Prediction Confidence : ${confidence}%`);

    doc.text(`Generated On : ${new Date().toLocaleString()}`);

    doc.moveDown(2);

    // =================================================

    // Diagnosis

    // =================================================

    doc

        .fontSize(18)

        .fillColor("#2563EB")

        .text("AI Recommendation");

    doc.moveDown();

    doc

        .fontSize(13)

        .fillColor("black")

        .text(

            recommendation ||

            "No recommendation available."

        );

    doc.moveDown(2);

    // =================================================

    // Disclaimer

    // =================================================

    doc

        .fontSize(12)

        .fillColor("red")

        .text(

            "Disclaimer:",

            {

                underline: true

            }

        );

    doc.moveDown(0.5);

    doc

        .fillColor("black")

        .text(

            "This report is generated using Artificial Intelligence. It is intended only for preliminary clinical assistance and must not be considered as a final medical diagnosis. Please consult a qualified medical professional for confirmation."

        );

    doc.moveDown(3);

    // =================================================

    // Footer

    // =================================================

    doc

        .fontSize(12)

        .fillColor("gray")

        .text(

            "AI Hospital Management System",

            {

                align: "center"

            }

        );

    doc.text(

        "Powered by MERN + FastAPI + TensorFlow",

        {

            align: "center"

        }

    );

    doc.end();

});