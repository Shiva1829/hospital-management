import React from "react";

const AIGaugeCard = ({ disease, confidence }) => {

  return (

    <div className="ai-card">

      <h2>{disease}</h2>

      <div className="circle">

        <h1>{confidence}%</h1>

      </div>

    </div>

  );
};

export default AIGaugeCard;