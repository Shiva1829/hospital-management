import PDFDocument from "pdfkit";

const generatePDF = (res, reportData) => {

    const {

        patientName = "N/A",

        diseaseType = reportData.disease || "N/A",

        prediction = reportData.result || reportData.prediction || "N/A",

        confidence = 0,

        recommendation = "Consult your physician.",

        doctorName = "AI Hospital System"

    } = reportData;

    const doc = new PDFDocument({

        margin: 50,

        size: "A4"

    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(

        "Content-Disposition",

        "attachment; filename=AI_Medical_Report.pdf"

    );

    doc.pipe(res);

    // =====================================================
    // Title
    // =====================================================

    doc
        .fontSize(24)
        .fillColor("#0B5394")
        .text("AI Hospital Management System", {
            align: "center"
        });

    doc
        .fontSize(18)
        .fillColor("#38761D")
        .text("Medical Prediction Report", {
            align: "center"
        });

    doc.moveDown(2);

    // =====================================================
    // Patient Information
    // =====================================================

    doc
        .fontSize(18)
        .fillColor("#0B5394")
        .text("Patient Information");

    doc.moveDown();

    doc
        .fontSize(13)
        .fillColor("black")
        .text(`Patient Name : ${patientName}`);

    doc.moveDown(2);

    // =====================================================
    // Prediction Details
    // =====================================================

    doc
        .fontSize(18)
        .fillColor("#0B5394")
        .text("Prediction Details");

    doc.moveDown();

    doc
        .fontSize(13)
        .fillColor("black")
        .text(`Disease : ${diseaseType}`);

    doc.moveDown();

    doc.text(`Prediction : ${prediction}`);

    doc.moveDown();

    doc.text(`Confidence : ${confidence}%`);

    doc.moveDown();

    doc.text(`Recommendation : ${recommendation}`);

    doc.moveDown(2);

    // =====================================================
    // Doctor Information
    // =====================================================

    doc
        .fontSize(18)
        .fillColor("#38761D")
        .text("Doctor Information");

    doc.moveDown();

    doc
        .fontSize(13)
        .fillColor("black")
        .text(`Consultant : ${doctorName}`);

    doc.moveDown(2);

    // =====================================================
    // Date
    // =====================================================

    doc
        .fontSize(12)
        .fillColor("blue")
        .text(`Generated On : ${new Date().toLocaleString()}`);

    doc.moveDown(2);

    // =====================================================
    // Footer
    // =====================================================

    doc
        .fontSize(11)
        .fillColor("red")
        .text(

            "Disclaimer: This report is AI generated and should always be verified by a qualified medical professional.",

            {

                align: "center"

            }

        );

    doc.end();

};

export default generatePDF;