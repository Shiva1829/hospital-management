import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  FaUserCircle,
  FaBirthdayCake,
  FaVenusMars,
  FaTint,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHospital,
  FaHeartbeat,
} from "react-icons/fa";

import "./PatientDetails.css";

const PatientDetails = () => {

  const { id } = useParams();

  const [patient, setPatient] = useState({});

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {

    try {

      const { data } = await axios.get(
        `https://hospital-backend-28d9.onrender.com/api/v1/patient/${id}`
      );

      setPatient(data.patient);

    } catch (error) {

      console.log(error);

    }

  };

  return (

<div className="patientDetailsPage">

<div className="patientBanner">

<div>

<span className="patientTag">

PATIENT PROFILE

</span>

<h1>

Patient

<span> Information</span>

</h1>

<p>

Complete patient profile with medical
details and personal information.

</p>

</div>

<FaHospital className="hospitalIcon"/>

</div>

<div className="patientCard">

<div className="patientHeader">

<div className="avatar">

<FaUserCircle/>

</div>

<div>

<h2>

{patient.name}

</h2>

<p>

Registered Patient

</p>

</div>

</div>

<div className="patientGrid">

<div className="patientInfo">

<FaBirthdayCake/>

<div>

<h4>Age</h4>

<p>{patient.age}</p>

</div>

</div>

<div className="patientInfo">

<FaVenusMars/>

<div>

<h4>Gender</h4>

<p>{patient.gender}</p>

</div>

</div>

<div className="patientInfo">

<FaTint/>

<div>

<h4>Blood Group</h4>

<p>{patient.bloodGroup}</p>

</div>

</div>

<div className="patientInfo">

<FaHeartbeat/>

<div>

<h4>Health Status</h4>

<p>Active</p>

</div>

</div>

<div className="patientInfo">

<FaPhoneAlt/>

<div>

<h4>Phone Number</h4>

<p>{patient.phone}</p>

</div>

</div>

<div className="patientInfo">

<FaEnvelope/>

<div>

<h4>Email Address</h4>

<p>{patient.email}</p>

</div>

</div>

</div>

<div className="addressCard">

<h3>

<FaMapMarkerAlt/>

Address

</h3>

<p>

{patient.address}

</p>

</div>

</div>

</div>

  );

};

export default PatientDetails;
