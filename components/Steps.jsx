import { StepsDetail } from "@/constants";
import React, { useState } from "react";

const Steps = ({ steps }) => {
  return (
    <div className="steps">
      {StepsDetail.map((step) => (
        <div className="step" key={step.subtitle}>
          <div className={`circle ${steps == step.step ? "activeCircle" : ""}`}>
            {step.step}
          </div>
          <div className="stepDetail">
            <h4>{step.subtitle}</h4>
            <h3>{step.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Steps;
