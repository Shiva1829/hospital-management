import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaUserInjured,
  FaPhoneAlt,
  FaTint,
  FaEye,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import "./Patients.css";

const Patients = () => {

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {

    try {

      const { data } = await axios.get(
        "http://localhost:4000/api/v1/patient/getall"
      );

      setPatients(data.patients);

    } catch (error) {

      console.log(error);

    }

  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

<div className="patientsPage">

<div className="patientsHeader">

<div>

<span className="patientTag">

PATIENT MANAGEMENT

</span>

<h1>

Registered

<span> Patients</span>

</h1>

<p>

Manage and monitor all hospital patients
from one dashboard.

</p>

</div>

</div>

<div className="searchBox">

<FaSearch/>

<input
type="text"
placeholder="Search Patient..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

<div className="patientTable">

<table>

<thead>

<tr>

<th>Name</th>

<th>Age</th>

<th>Gender</th>

<th>Blood Group</th>

<th>Phone</th>

<th>Profile</th>

</tr>

</thead>

<tbody>

{filteredPatients.map((patient)=>(

<tr key={patient._id}>

<td>

<div className="patientName">

<FaUserInjured/>

<span>{patient.name}</span>

</div>

</td>

<td>{patient.age}</td>

<td>{patient.gender}</td>

<td>

<div className="bloodGroup">

<FaTint/>

<span>{patient.bloodGroup}</span>

</div>

</td>

<td>

<div className="phone">

<FaPhoneAlt/>

<span>{patient.phone}</span>

</div>

</td>

<td>

<Link
to={`/patient/${patient._id}`}
className="viewBtn"
>

<FaEye/>

View

</Link>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

  );

};

export default Patients;