"use client";
import { StepInformation, Steps } from "@/components";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  return (
    <form action="#" className="formContainer">
      <Steps steps={step} />
      <StepInformation step={step} setStep={setStep} />
      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="#">M Ibrahim</a>.
      </div>
    </form>
  );
}
