import jsPDF from "jspdf";

export const generatePDF = (
  disease,
  confidence,
  status,
  recommendation
) => {

  const doc = new jsPDF();

  doc.text("AI Hospital Medical Report", 20, 20);

  doc.text(`Disease : ${disease}`, 20, 50);

  doc.text(`Confidence : ${confidence}%`, 20, 70);

  doc.text(`Status : ${status}`, 20, 90);

  doc.text(`Recommendation : ${recommendation}`, 20, 110);

  doc.save("Medical_Report.pdf");

};