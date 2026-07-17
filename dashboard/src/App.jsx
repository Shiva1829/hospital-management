import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";

/* Layout */
import Sidebar from "./components/Sidebar";

/* Main Components */
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Doctors from "./components/Doctors";
import Messages from "./components/Messages";
import AddNewDoctor from "./components/AddNewDoctor";
import AddPatient from "./pages/AddPatient";
import AddNewAdmin from "./components/AddNewAdmin";

/* Patient Pages */
import Patients from "./pages/Patients";
import PatientSearch from "./pages/PatientSearch";
import RecentPatients from "./pages/RecentPatients";
import PatientHistory from "./pages/PatientHistory";
import PatientProfile from "./pages/PatientProfile";

/* Reports */
import UploadReport from "./pages/UploadReport";
import Reports from "./pages/Reports";

/* Prediction */
import PredictionHistory from "./pages/PredictionHistory";

/* Revenue */
import RevenueDashboard from "./pages/RevenueDashboard";

/* Notifications */
import Notifications from "./pages/Notifications";

/* Scheduler */
import Scheduler from "./pages/Scheduler";

/* AI Modules */
import HeartDiseasePrediction from "./pages/HeartDiseasePrediction";
import LiverDiseasePrediction from "./pages/LiverDiseasePrediction";
import BrainTumorPrediction from "./pages/BrainTumorPrediction";
import KidneyStonePrediction from "./pages/KidneyStonePrediction";
import CancerPrediction from "./pages/CancerPrediction";
import OCRReader from "./pages/OCRReader";
import XrayAnalysis from "./pages/XrayAnalysis";

const App = () => {

  return (

    <Router>

      <Sidebar />

      <Routes>

        {/* Dashboard */}

        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* Login */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Doctors */}

        <Route
          path="/doctors"
          element={<Doctors />}
        />

        <Route
          path="/doctor/addnew"
          element={<AddNewDoctor />}
        />

        <Route
          path="/patient/addnew"
          element={<AddPatient />}
        />

        {/* Admin */}

        <Route
          path="/admin/addnew"
          element={<AddNewAdmin />}
        />

        {/* Messages */}

        <Route
          path="/messages"
          element={<Messages />}
        />

        {/* Patients */}

        <Route
          path="/patients"
          element={<Patients />}
        />

        <Route
          path="/patient-search"
          element={<PatientSearch />}
        />

        <Route
          path="/recent-patients"
          element={<RecentPatients />}
        />

        <Route
          path="/patient-history"
          element={<PatientHistory />}
        />

        <Route
          path="/patient/:id"
          element={<PatientProfile />}
        />


        {/* Reports */}

        <Route
          path="/upload-report"
          element={<UploadReport />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        {/* Prediction */}

        <Route
          path="/prediction-history"
          element={<PredictionHistory />}
        />

        {/* Notifications */}

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        {/* Scheduler */}

        <Route
          path="/scheduler"
          element={<Scheduler />}
        />

        {/* Revenue */}

        <Route
          path="/revenue"
          element={<RevenueDashboard />}
        />

        {/* AI Modules */}

        <Route
          path="/heart-prediction"
          element={<HeartDiseasePrediction />}
        />

        <Route
          path="/liver-prediction"
          element={<LiverDiseasePrediction />}
        />

        <Route
          path="/brain-tumor"
          element={<BrainTumorPrediction />}
        />

        <Route
          path="/kidney-stone"
          element={<KidneyStonePrediction />}
        />

        <Route
          path="/cancer-detection"
          element={<CancerPrediction />}
        />

        <Route
          path="/ocr-reader"
          element={<OCRReader />}
        />

        <Route
          path="/xray-analysis"
          element={<XrayAnalysis />}
        />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

    </Router>

  );

};

export default App;