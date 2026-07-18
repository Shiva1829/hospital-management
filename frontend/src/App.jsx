import React, { useContext, useEffect } from "react";
import AIChat from "./components/AIChat/AIChat";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Appointment from "./Pages/Appointment";

import Login from "./Pages/Login";
import Register from "./Pages/Register";

import Patients from "./Pages/Patients";
import PatientDetails from "./Pages/PatientDetails";
import UploadReport from "./Pages/UploadReport";
import AddPatient from "./Pages/AddPatient";

import { Context } from "./main";

const App = () => {
  const {
    setIsAuthenticated,
    setUser,
  } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "https://hospital-backend-28d9.onrender.com/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );

        setIsAuthenticated(true);
        setUser(data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };

    fetchUser();
  }, []);

  return (
    <Router>

      <div className="app-container">

        <Navbar />

        <main className="page-wrapper">

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/appointment"
              element={<Appointment />}
            />

            <Route
              path="/about"
              element={<AboutUs />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/patients"
              element={<Patients />}
            />

            <Route
              path="/patient/:id"
              element={<PatientDetails />}
            />

            <Route
              path="/upload-report"
              element={<UploadReport />}
            />

            <Route
              path="/add-patient"
              element={<AddPatient />}
            />

          </Routes>

        </main>

        <Footer />

        <AIChat />

        <ToastContainer
          position="top-right"
          autoClose={2500}
          theme="colored"
        />

      </div>

    </Router>
  );
};

export default App;
