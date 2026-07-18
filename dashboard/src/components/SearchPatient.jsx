import React, { useState } from "react";
import axios from "axios";

import {
  FaSearch,
  FaTimes,
} from "react-icons/fa";

import "./SearchPatient.css";

const SearchPatient = ({ setPatients }) => {

  const [keyword, setKeyword] = useState("");

  const [loading, setLoading] = useState(false);

  const searchPatient = async () => {

    if (keyword.trim() === "") return;

    try {

      setLoading(true);

      const { data } = await axios.get(

        `https://hospital-backend-28d9.onrender.com/api/v1/patient/search/${keyword}`

      );

      setPatients(data.patients);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  const clearSearch = () => {

    setKeyword("");

  };

  return (

    <div className="searchPatientContainer">

      <div className="searchBox">

        <FaSearch className="searchIcon"/>

        <input
          type="text"
          placeholder="Search Patient Name..."
          value={keyword}
          onChange={(e)=>setKeyword(e.target.value)}
          onKeyDown={(e)=>{

            if(e.key==="Enter"){

              searchPatient();

            }

          }}
        />

        {

          keyword && (

            <FaTimes
              className="clearIcon"
              onClick={clearSearch}
            />

          )

        }

      </div>

      <button
        className="searchButton"
        onClick={searchPatient}
      >

        {

          loading

          ?

          "Searching..."

          :

          "Search"

        }

      </button>

    </div>

  );

};

export default SearchPatient;
