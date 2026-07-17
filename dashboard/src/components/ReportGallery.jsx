import React from "react";
import {
  FaFilePdf,
  FaDownload,
  FaCalendarAlt,
  FaUserInjured,
} from "react-icons/fa";

import "./ReportGallery.css";

const reports = [
  {
    id: 1,
    patient: "Rahul Sharma",
    report: "Heart Disease Report",
    date: "25 Jun 2026",
    file: "/reports/Heart_Report.pdf",
  },
  {
    id: 2,
    patient: "Priya Verma",
    report: "Brain Tumor Report",
    date: "26 Jun 2026",
    file: "/reports/Brain_Report.pdf",
  },
  {
    id: 3,
    patient: "Rohit Patil",
    report: "Kidney Stone Report",
    date: "27 Jun 2026",
    file: "/reports/Kidney_Report.pdf",
  },
  {
    id: 4,
    patient: "Anjali Kulkarni",
    report: "Liver Disease Report",
    date: "28 Jun 2026",
    file: "/reports/Liver_Report.pdf",
  },
];

const ReportGallery = () => {
  return (
    <div className="reportGallery">

      <div className="galleryHeader">

        <h1>📑 Medical Report Gallery</h1>

        <p>
          AI generated reports available for download.
        </p>

      </div>

      <div className="galleryGrid">

        {reports.map((report) => (

          <div
            className="reportCard"
            key={report.id}
          >

            <div className="pdfIcon">

              <FaFilePdf />

            </div>

            <h2>{report.report}</h2>

            <div className="patientInfo">

              <FaUserInjured />

              <span>{report.patient}</span>

            </div>

            <div className="dateInfo">

              <FaCalendarAlt />

              <span>{report.date}</span>

            </div>

            <a
              href={report.file}
              download
              className="downloadReportBtn"
            >

              <FaDownload />

              Download Report

            </a>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ReportGallery;