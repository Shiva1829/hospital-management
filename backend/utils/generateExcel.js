import ExcelJS from "exceljs";

const generateExcel = async (res, patients) => {

    const workbook = new ExcelJS.Workbook();

    // ===========================================
    // Workbook Properties
    // ===========================================

    workbook.creator = "AI Hospital Management System";
    workbook.company = "KLE Technological University";
    workbook.subject = "Patient Prediction Report";
    workbook.title = "AI Prediction Report";

    const worksheet = workbook.addWorksheet("Patient Predictions");

    // ===========================================
    // Columns
    // ===========================================

    worksheet.columns = [

        {
            header: "Patient Name",
            key: "patientName",
            width: 25
        },

        {
            header: "Disease",
            key: "disease",
            width: 25
        },

        {
            header: "Prediction",
            key: "prediction",
            width: 25
        },

        {
            header: "Confidence (%)",
            key: "confidence",
            width: 18
        },

        {
            header: "Generated Date",
            key: "date",
            width: 25
        }

    ];

    // ===========================================
    // Header Style
    // ===========================================

    worksheet.getRow(1).font = {
        bold: true,
        color: { argb: "FFFFFFFF" }
    };

    worksheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "1F4E78" }
    };

    worksheet.getRow(1).alignment = {
        vertical: "middle",
        horizontal: "center"
    };

    // ===========================================
    // Data Rows
    // ===========================================

    patients.forEach((patient) => {

        worksheet.addRow({

            patientName: patient.patientName || "N/A",

            disease: patient.diseaseType || patient.disease || "N/A",

            prediction: patient.prediction || patient.result || "N/A",

            confidence: patient.confidence || 0,

            date: patient.createdAt
                ? new Date(patient.createdAt).toLocaleString()
                : "-"

        });

    });

    // ===========================================
    // Borders
    // ===========================================

    worksheet.eachRow((row) => {

        row.eachCell((cell) => {

            cell.border = {

                top: { style: "thin" },

                left: { style: "thin" },

                bottom: { style: "thin" },

                right: { style: "thin" }

            };

        });

    });

    // ===========================================
    // Auto Filter
    // ===========================================

    worksheet.autoFilter = {

        from: "A1",

        to: "E1"

    };

    // ===========================================
    // Response Headers
    // ===========================================

    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
        "Content-Disposition",
        "attachment; filename=AI_Hospital_Predictions.xlsx"
    );

    // ===========================================
    // Write Workbook
    // ===========================================

    await workbook.xlsx.write(res);

    res.end();

};

export default generateExcel;