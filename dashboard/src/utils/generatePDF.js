import jsPDF from "jspdf";

const generatePDF = (
  patientName,
  diseaseType,
  prediction,
  confidence,
  recommendation
) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("AI Hospital Management System", 20, 20);

  doc.setFontSize(18);
  doc.text("Medical Prediction Report", 20, 35);

  doc.setFontSize(13);

  doc.text(`Patient Name : ${patientName}`, 20, 55);
  doc.text(`Disease Type : ${diseaseType}`, 20, 70);
  doc.text(`Prediction : ${prediction}`, 20, 85);
  doc.text(`Confidence : ${confidence}%`, 20, 100);

  doc.text("Recommendation:", 20, 120);

  doc.setFontSize(11);

  doc.text(
    recommendation || "Consult your doctor.",
    20,
    135,
    {
      maxWidth: 170,
    }
  );

  doc.setFontSize(10);

  doc.text(
    `Generated On : ${new Date().toLocaleString()}`,
    20,
    260
  );

  doc.save("AI_Report.pdf");
};

export default generatePDF;