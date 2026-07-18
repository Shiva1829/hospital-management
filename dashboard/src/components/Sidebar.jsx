import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { Context } from "../context/Context";

import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu, GiKidneys } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator, MdUploadFile } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaSearch, FaUsers, FaBars } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
import "./Sidebar.css";

import {
FaHeartbeat,
FaLungs,
FaFileMedical,
FaXRay,
FaBrain,
FaHistory,
} from "react-icons/fa";

const Sidebar = () => {

const [show, setShow] = useState(false);
const [collapsed, setCollapsed] = useState(false);

const { isAuthenticated, setIsAuthenticated } = useContext(Context);

const navigateTo = useNavigate();

const go = (path) => {
navigateTo(path);
setShow(false);
};

const handleLogout = async () => {


try {

  const res = await axios.get(
    "https://hospital-backend-28d9.onrender.com/api/v1/user/admin/logout",
    {
      withCredentials: true,
    }
  );

  toast.success(res.data.message);

  setIsAuthenticated(false);

  navigateTo("/login");

} catch (error) {

  toast.error("Logout Failed");

}


};

return (
  <>
    <nav
      className={`sidebar ${show ? "active" : ""} ${collapsed ? "collapsed" : ""}`}
      style={!isAuthenticated ? { display: "none" } : {}}
    >
      <div className="sidebar-header">

        <button
          className="collapse-toggle"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <FaBars />
        </button>

        <img
          src="/logo.png"
          alt="logo"
          className="sidebar-logo"
        />

        <h2 className="label">ShivShakti</h2>

        <span className="label">AI Hospital</span>

      </div>

      <div className="sidebar-section">

        <h4 className="label">MAIN</h4>

        <button className="nav-btn" onClick={() => go("/")} title="Dashboard">
          <TiHome />
          <span className="label">Dashboard</span>
        </button>

      </div>

      <div className="sidebar-section">

        <h4 className="label">DOCTORS</h4>

        <button className="nav-btn" onClick={() => go("/doctors")} title="Doctors">
          <FaUserDoctor />
          <span className="label">Doctors</span>
        </button>

        <button className="nav-btn" onClick={() => go("/doctor/addnew")} title="Add Doctor">
          <IoPersonAddSharp />
          <span className="label">Add Doctor</span>
        </button>

        <button className="nav-btn" onClick={() => go("/admin/addnew")} title="Add Admin">
          <MdAddModerator />
          <span className="label">Add Admin</span>
        </button>

      </div>

      <div className="sidebar-section">

        <h4 className="label">PATIENTS</h4>
        <button
          className="nav-btn"
           onClick={() => go("/patient/addnew")}
        >

        <MdPersonAdd />

        {!collapsed &&

        <span>

        Add Patient

        </span>

}

</button>

        <button
          className="nav-btn"
          onClick={() => go("/patient-search")}
          title="Search Patient"
        >
          <FaSearch />
          <span className="label">Search Patient</span>
        </button>

        <button
          className="nav-btn"
          onClick={() => go("/recent-patients")}
          title="Recent Patients"
        >
          <FaUsers />
          <span className="label">Recent Patients</span>
        </button>

        <button
          className="nav-btn"
          onClick={() => go("/patient-history")}
          title="Patient History"
        >
          <FaHistory />
          <span className="label">Patient History</span>
        </button>

      </div>

      <div className="sidebar-section">

        <h4 className="label">AI DIAGNOSIS</h4>

        <button
          className="nav-btn"
          onClick={() => go("/heart-prediction")}
          title="Heart Disease"
        >
          <FaHeartbeat />
          <span className="label">Heart Disease</span>
        </button>

        <button
          className="nav-btn"
          onClick={() => go("/liver-prediction")}
          title="Liver Disease"
        >
          <FaLungs />
          <span className="label">Liver Disease</span>
        </button>

        <button
          className="nav-btn"
          onClick={() => go("/brain-tumor")}
          title="Brain Tumor"
        >
          <FaBrain />
          <span className="label">Brain Tumor</span>
        </button>

        <button
          className="nav-btn"
          onClick={() => go("/kidney-stone")}
          title="Kidney Stone"
        >
          <GiKidneys />
          <span className="label">Kidney Stone</span>
        </button>

        <button
          className="nav-btn"
          onClick={() => go("/cancer-detection")}
          title="Cancer Detection"
        >
          <FaBrain />
          <span className="label">Cancer Detection</span>
        </button>

        <button
          className="nav-btn"
          onClick={() => go("/xray-analysis")}
          title="X-Ray Analysis"
        >
          <FaXRay />
          <span className="label">X-Ray Analysis</span>
        </button>

        <button
          className="nav-btn"
          onClick={() => go("/ocr-reader")}
          title="OCR Reader"
        >
          <FaFileMedical />
          <span className="label">OCR Reader</span>
        </button>

      </div>

      <div className="sidebar-section">

        <h4 className="label">REPORTS</h4>

        <button
          className="nav-btn"
          onClick={() => go("/upload-report")}
          title="Upload Report"
        >
          <MdUploadFile />
          <span className="label">Upload Report</span>
        </button>

        <button
          className="nav-btn"
          onClick={() => go("/reports")}
          title="Reports"
        >
          <FaFileMedical />
          <span className="label">Reports</span>
        </button>

        <button
          className="nav-btn"
          onClick={() => go("/prediction-history")}
          title="Prediction History"
        >
          <FaHistory />
          <span className="label">Prediction History</span>
        </button>

      </div>

      <div className="sidebar-section">

        <h4 className="label">COMMUNICATION</h4>

        <button
          className="nav-btn"
          onClick={() => go("/messages")}
          title="Messages"
        >
          <AiFillMessage />
          <span className="label">Messages</span>
        </button>

      </div>

      <button
        className="logout-btn"
        onClick={handleLogout}
        title="Logout"
      >
        <RiLogoutBoxFill />
        <span className="label">Logout</span>
      </button>

    </nav>

    <div className="mobile-menu">

      <GiHamburgerMenu
        className="hamburger"
        onClick={() => setShow(!show)}
      />

    </div>
  </>
);
};

export default Sidebar;
