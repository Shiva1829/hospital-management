import React, { useState } from "react";
import axios from "axios";
import { FaFileExcel } from "react-icons/fa";
import { toast } from "react-toastify";

const ExportExcelButton = ({ predictions = [] }) => {

  const [loading, setLoading] = useState(false);

  const exportExcel = async () => {

    if (!predictions.length) {

      toast.warning("No prediction records available.");

      return;

    }

    try {

      setLoading(true);

      const response = await axios.post(

        "http://localhost:4000/api/v1/excel/export",

        predictions,

        {
          responseType: "blob",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }

      );

      const blob = new Blob(
        [response.data],
        {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }
      );

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      const today = new Date().toISOString().split("T")[0];

      link.download = `Prediction_History_${today}.xlsx`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      toast.success("Excel report downloaded successfully.");

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Unable to export Excel file."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <button
      className="excelBtn"
      onClick={exportExcel}
      disabled={loading}
    >

      <FaFileExcel />

      {loading ? " Exporting..." : " Export Excel"}

    </button>

  );

};

export default ExportExcelButton;