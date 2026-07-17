import AIReport from "../models/aiReportSchema.js";
import ErrorHandler from "../middlewares/error.js";

// =====================================================
// Save AI Report
// =====================================================

export const saveAIReport = async (req, res, next) => {

    try {

        const {

            patientName,

            disease,

            prediction,

            confidence,

            recommendation,

            reportUrl,

            extractedText

        } = req.body;

        if (

            !patientName ||

            !prediction

        ) {

            return next(

                new ErrorHandler(

                    "Patient name and prediction are required.",

                    400

                )

            );

        }

        const report = await AIReport.create({

            patientName,

            disease,

            prediction,

            confidence,

            recommendation,

            reportUrl,

            extractedText

        });

        return res.status(201).json({

            success: true,

            message: "AI Report saved successfully.",

            report

        });

    }

    catch (error) {

        next(error);

    }

};

// =====================================================
// Get All Reports
// =====================================================

export const getAllAIReports = async (req, res, next) => {

    try {

        const reports = await AIReport.find()

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,

            total: reports.length,

            reports

        });

    }

    catch (error) {

        next(error);

    }

};

// =====================================================
// Get Report By ID
// =====================================================

export const getAIReportById = async (req, res, next) => {

    try {

        const report = await AIReport.findById(

            req.params.id

        );

        if (!report) {

            return next(

                new ErrorHandler(

                    "AI Report not found.",

                    404

                )

            );

        }

        return res.status(200).json({

            success: true,

            report

        });

    }

    catch (error) {

        next(error);

    }

};

// =====================================================
// Get Patient Reports
// =====================================================

export const getPatientReports = async (req, res, next) => {

    try {

        const reports = await AIReport.find({

            patientName: req.params.name

        }).sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            total: reports.length,

            reports

        });

    }

    catch (error) {

        next(error);

    }

};

// =====================================================
// Update Report
// =====================================================

export const updateAIReport = async (req, res, next) => {

    try {

        const report = await AIReport.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!report) {

            return next(

                new ErrorHandler(

                    "AI Report not found.",

                    404

                )

            );

        }

        return res.status(200).json({

            success: true,

            message: "AI Report updated successfully.",

            report

        });

    }

    catch (error) {

        next(error);

    }

};

// =====================================================
// Delete Report
// =====================================================

export const deleteAIReport = async (req, res, next) => {

    try {

        const report = await AIReport.findById(

            req.params.id

        );

        if (!report) {

            return next(

                new ErrorHandler(

                    "AI Report not found.",

                    404

                )

            );

        }

        await report.deleteOne();

        return res.status(200).json({

            success: true,

            message: "AI Report deleted successfully."

        });

    }

    catch (error) {

        next(error);

    }

};