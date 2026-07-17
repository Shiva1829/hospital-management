import PDFDocument from "pdfkit";

const generatePDF = (res, reportData) => {

    const {

        patientName,
        diseaseType,
        prediction,
        confidence,
        status,
        recommendation,
        doctorName = "AI Medical Assistant"

    } = reportData;

    const doc = new PDFDocument({

        size: "A4",
        margin: 50

    });

    res.setHeader(
        "Content-Type",
        "application/pdf"
    );

    res.setHeader(

        "Content-Disposition",

        `attachment; filename=${patientName}-AI-Report.pdf`

    );

    doc.pipe(res);


    // =====================================================
    // Title
    // =====================================================

    doc
        .fontSize(25)
        .fillColor("#0B5394")
        .text(

            "AI HOSPITAL MANAGEMENT SYSTEM",

            {

                align: "center"

            }

        );

    doc.moveDown();

    doc
        .fontSize(18)
        .fillColor("black")
        .text(

            "Medical Diagnosis Report",

            {

                align: "center"

            }

        );

    doc.moveDown(2);


    // =====================================================
    // Patient Details
    // =====================================================

    doc
        .fontSize(18)
        .fillColor("#38761D")
        .text("Patient Information");

    doc.moveDown();

    doc
        .fontSize(13)
        .fillColor("black")
        .text(`Patient Name : ${patientName}`);

    doc.text(
        `Disease Category : ${diseaseType}`
    );

    doc.moveDown();


    // =====================================================
    // AI Prediction
    // =====================================================

    doc
        .fontSize(18)
        .fillColor("#0B5394")
        .text("AI Prediction");

    doc.moveDown();

    doc
        .fontSize(13)
        .fillColor("black")
        .text(

            `Predicted Disease : ${prediction}`

        );

    doc.text(

        `Confidence Score : ${confidence}%`

    );

    doc.text(

        `Status : ${status}`

    );

    doc.moveDown();


    // =====================================================
    // Recommendation
    // =====================================================

    doc
        .fontSize(18)
        .fillColor("#CC0000")
        .text("Recommendation");

    doc.moveDown();

    doc
        .fontSize(13)
        .fillColor("black")
        .text(recommendation);

    doc.moveDown(2);


    // =====================================================
    // Doctor Details
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
        .text(

            `Generated On : ${new Date().toLocaleString()}`

        );

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
