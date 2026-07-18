import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaChartLine,
  FaRobot,
  FaTrash,
  FaSearch,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import "./PredictionHistory.css";

const PredictionHistory = () => {

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {

    try {

      const { data } = await axios.get(
        "https://hospital-backend-28d9.onrender.com/api/v1/prediction/all"
      );

      setHistory(data.predictions);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const deletePrediction = async (id) => {

    try {

      await axios.delete(
        `https://hospital-backend-28d9.onrender.com/api/v1/prediction/delete/${id}`
      );

      fetchPredictions();

    } catch (error) {

      console.log(error);

    }

  };

  const filteredHistory = history.filter((item) =>
    item.patientName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {

    return (

      <div className="loading-box">

        Loading Prediction History...

      </div>

    );

  }

  return (

    <div className="prediction-page">

      <div className="prediction-header">

        <div>

          <h1>

            <FaChartLine />

            Prediction History

          </h1>

          <p>

            AI Generated Disease Prediction Records

          </p>

        </div>

      </div>

      <div className="prediction-stats">

        <div className="stat-card">

          <FaRobot className="stat-icon"/>

          <div>

            <h2>{history.length}</h2>

            <p>Total Predictions</p>

          </div>

        </div>

        <div className="stat-card">

          <FaCheckCircle className="stat-icon"/>

          <div>

            <h2>

              {
                history.filter(
                  (item)=>item.status==="Completed"
                ).length
              }

            </h2>

            <p>Completed</p>

          </div>

        </div>

        <div className="stat-card">

          <FaClock className="stat-icon"/>

          <div>

            <h2>

              {
                history.filter(
                  (item)=>item.status==="Pending"
                ).length
              }

            </h2>

            <p>Pending</p>

          </div>

        </div>

      </div>

      <div className="search-box">

        <FaSearch/>

        <input
          type="text"
          placeholder="Search Patient..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </div>

      <div className="table-wrapper">

        <table className="prediction-table">

          <thead>

            <tr>

              <th>Patient</th>

              <th>Disease</th>

              <th>Prediction</th>

              <th>Confidence</th>

              <th>Status</th>

              <th>Recommendation</th>

              <th>Date</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {

              filteredHistory.map((item)=>(

                <tr key={item._id}>

                  <td>

                    {item.patientName}

                  </td>

                  <td>

                    {item.diseaseType}

                  </td>

                  <td>

                    {item.result}

                  </td>

                  <td>

                    {item.confidence}%

                  </td>

                  <td>

                    <span
                      className={
                        item.status==="Completed"
                        ? "status completed"
                        : "status pending"
                      }
                    >

                      {item.status}

                    </span>

                  </td>

                  <td>

                    {item.recommendation}

                  </td>

                  <td>

                    {

                      new Date(
                        item.createdAt
                      ).toLocaleDateString()

                    }

                  </td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={()=>
                        deletePrediction(item._id)
                      }
                    >

                      <FaTrash/>

                    </button>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default PredictionHistory;
