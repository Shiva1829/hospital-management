import React from "react";
import { useNavigate } from "react-router-dom";
import "./Departments.css";

const Departments = () => {

  const navigate = useNavigate();

  const departments = [

    {
      title:"Cardiology",
      image:"/departments/cardio.jpg",
      icon:"❤️",
      desc:"Heart disease diagnosis, ECG, Echocardiography and treatment."
    },

    {
      title:"Neurology",
      image:"/departments/neuro.jpg",
      icon:"🧠",
      desc:"Brain, spinal cord and nervous system disorders."
    },

    {
      title:"Orthopedics",
      image:"/departments/ortho.jpg",
      icon:"🦴",
      desc:"Bone fractures, arthritis and joint replacement surgeries."
    },

    {
      title:"Radiology",
      image:"/departments/radio.jpg",
      icon:"🩻",
      desc:"MRI, CT Scan, X-Ray, Ultrasound and AI Imaging."
    },

    {
      title:"Oncology",
      image:"/departments/onco.jpg",
      icon:"🩺",
      desc:"Cancer diagnosis, chemotherapy and advanced treatments."
    },

    {
      title:"Dermatology",
      image:"/departments/derma.jpg",
      icon:"🌿",
      desc:"Skin care, cosmetic procedures and allergy treatment."
    },

    {
      title:"Pediatrics",
      image:"/departments/pedia.jpg",
      icon:"👶",
      desc:"Complete child healthcare and vaccination services."
    },

    {
      title:"ENT",
      image:"/departments/ent.jpg",
      icon:"👂",
      desc:"Ear, Nose and Throat specialist consultation."
    }

  ];

  const handleBookAppointment = (departmentTitle) => {
    navigate("/appointment", { state: { department: departmentTitle } });
  };

  return (

    <section className="department-section">

      <div className="department-header">

        <span>OUR SERVICES</span>

        <h2>Medical Departments</h2>

        <p>

          Comprehensive healthcare services powered by experienced
          specialists and AI assisted diagnosis.

        </p>

      </div>

      <div className="department-grid">

        {departments.map((item,index)=>(

          <div className="department-card" key={index}>

            <img src={item.image} alt={item.title}/>

            <div className="department-content">

              <div className="department-icon">

                {item.icon}

              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

              <button onClick={() => handleBookAppointment(item.title)}>

                Book Appointment

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

};

export default Departments;