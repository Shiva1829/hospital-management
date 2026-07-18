import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaMoneyBillWave,
  FaChartLine,
  FaWallet,
  FaSyncAlt,
} from "react-icons/fa";

import RevenueChart from "../components/RevenueChart";
import "./RevenueDashboard.css";

const RevenueDashboard = () => {

  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRevenue();
  }, []);

  const loadRevenue = async () => {

    try {

      setLoading(true);

      const revenueResponse = await axios.get(
        "https://hospital-backend-28d9.onrender.com/api/v1/revenue/all"
      );

      setData(revenueResponse.data.revenue || []);

      const totalResponse = await axios.get(
        "https://hospital-backend-28d9.onrender.com/api/v1/revenue/total"
      );

      setTotalRevenue(totalResponse.data.totalRevenue || 0);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="revenueDashboard">

      <div className="dashboardHeader">

        <div>

          <h1>💰 Revenue Analytics</h1>

          <p>
            AI Hospital Financial Dashboard
          </p>

        </div>

        <button
          className="refreshBtn"
          onClick={loadRevenue}
        >
          <FaSyncAlt />
          Refresh
        </button>

      </div>

      {loading ? (

        <div className="loader">

          <div className="spinner"></div>

          <h3>Loading Revenue...</h3>

        </div>

      ) : (

        <>

          <div className="summaryGrid">

            <div className="summaryCard">

              <FaMoneyBillWave className="cardIcon blue" />

              <div>

                <h2>
                  ₹ {Number(totalRevenue).toLocaleString()}
                </h2>

                <p>Total Revenue</p>

              </div>

            </div>

            <div className="summaryCard">

              <FaChartLine className="cardIcon green" />

              <div>

                <h2>+18%</h2>

                <p>Monthly Growth</p>

              </div>

            </div>

            <div className="summaryCard">

              <FaWallet className="cardIcon orange" />

              <div>

                <h2>{data.length}</h2>

                <p>Total Transactions</p>

              </div>

            </div>

          </div>

          <div className="chartCard">

            <h2>Monthly Revenue Trend</h2>

            <RevenueChart data={data} />

          </div>

        </>

      )}

    </div>

  );

};

export default RevenueDashboard;
