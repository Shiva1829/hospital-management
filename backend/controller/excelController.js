import ExcelJS from "exceljs";
import { AIPrediction } from "../models/AIPrediction.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

export const exportExcel = catchAsyncErrors(async (req, res) => {

    const predictions = await AIPrediction.find()

        .populate("patientId")

        .sort({

            createdAt: -1

        });

    const workbook = new ExcelJS.Workbook();

    workbook.creator = "AI Hospital Management System";

    workbook.created = new Date();

    const worksheet = workbook.addWorksheet(

        "AI Predictions"

    );

    // ====================================================
    // Title
    // ====================================================

    worksheet.mergeCells("A1:F1");

    const title = worksheet.getCell("A1");

    title.value = "AI Hospital Prediction Report";

    title.font = {

        bold: true,

        size: 18,

        color: {

            argb: "FFFFFF"

        }

    };

    title.fill = {

        type: "pattern",

        pattern: "solid",

        fgColor: {

            argb: "2563EB"

        }

    };

    title.alignment = {

        horizontal: "center"

    };

    // ====================================================
    // Date
    // ====================================================

    worksheet.mergeCells("A2:F2");

    worksheet.getCell("A2").value =

        `Generated : ${new Date().toLocaleString()}`;

    worksheet.getCell("A2").font = {

        italic: true

    };

    // ====================================================
    // Header
    // ====================================================

    worksheet.columns = [

        {

            header: "Patient",

            key: "patient",

            width: 25

        },

        {

            header: "Prediction Type",

            key: "type",

            width: 25

        },

        {

            header: "Result",

            key: "result",

            width: 25

        },

        {

            header: "Probability",

            key: "probability",

            width: 18

        },

        {

            header: "Date",

            key: "date",

            width: 25

        }

    ];

    const headerRow = worksheet.getRow(4);

    headerRow.values = [

        "Patient",

        "Prediction Type",

        "Result",

        "Probability",

        "Date"

    ];

    headerRow.font = {

        bold: true,

        color: {

            argb: "FFFFFF"

        }

    };

    headerRow.fill = {

        type: "pattern",

        pattern: "solid",

        fgColor: {

            argb: "16A34A"

        }

    };

    // ====================================================
    // Data
    // ====================================================

    predictions.forEach((prediction) => {

        worksheet.addRow({

            patient:

                prediction.patientId?.firstName +

                " " +

                prediction.patientId?.lastName ||

                "Unknown",

            type:

                prediction.predictionType,

            result:

                prediction.result,

            probability:

                `${prediction.probability}%`,

            date:

                prediction.createdAt

                    .toLocaleString()

        });

    });

    // ====================================================
    // Borders
    // ====================================================

    worksheet.eachRow((row) => {

        row.eachCell((cell) => {

            cell.border = {

                top: {

                    style: "thin"

                },

                bottom: {

                    style: "thin"

                },

                left: {

                    style: "thin"

                },

                right: {

                    style: "thin"

                }

            };

        });

    });

    // ====================================================
    // Auto Filter
    // ====================================================

    worksheet.autoFilter = {

        from: "A4",

        to: "E4"

    };

    // ====================================================
    // Download
    // ====================================================

    res.setHeader(

        "Content-Type",

        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

    );

    res.setHeader(

        "Content-Disposition",

        "attachment; filename=AI_Hospital_Prediction_Report.xlsx"

    );

    await workbook.xlsx.write(res);

    res.end();

});