import { CardDetails, CheckboxDetails } from "@/constants";
import React, { useState } from "react";
import Card from "./Card";
import CustomCheckbox from "./CustomCheckbox";
import Image from "next/image";

const StepInformation = ({ step, setStep }) => {
  const [error, setError] = useState(false);

  const [plan, setPlan] = useState("monthly");

  const [selectedCard, setSelectedCard] = useState({ title: "", price: "" });

  const [activeOptions, setActiveOptions] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleCardSelection = (card) => {
    setSelectedCard({ title: card.title, price: card.price });
  };

  const handlePlan = () => {
    if (plan === "monthly") {
      setPlan("yearly");
    } else if (plan === "yearly") {
      setPlan("monthly");
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    // Handle step transitions here
    setStep(step - 1);
  };
  const handleChange = () => {
    setStep(1);
  };
  const handleNext = (e) => {
    e.preventDefault();
    // Comprehensive form validation logic
    if (step == 1) {
      if (
        formData.name.trim() === "" ||
        formData.email.trim() === "" ||
        formData.phone.trim() === ""
      ) {
        setError(true);
      } else {
        setError(false);
        setStep(step + 1);
      }
    } else if (step == 2) {
      if (selectedCard.title === "") {
        alert("please select card");
      } else {
        // Handle step transitions here
        setStep(step + 1);
      }
    } else {
      setStep(step + 1);
    }
  };
  const calculatePrice = (options, cardPrice) => {
    // Sum the prices of all options
    const optionsTotal = options.reduce(
      (total, option) => total + option.price,
      0
    );
    // Add the card price to the total
    const totalPrice = optionsTotal + parseFloat(cardPrice); // Convert cardPrice to a numeric value
    return totalPrice;
  };

  return (
    <div className="contentContainer">
      <div className={`stepContent ${step === 1 ? "activeStep" : ""}`}>
        <div className="stepDetails">
          <h1>Personal info</h1>
          <p>Please provide your name, email address, and phone number.</p>
        </div>
        <div className="inputs">
          <div className="name">
            <label htmlFor="name">
              <span>Name</span>
              <span
                className={`errorMessage ${
                  formData.name === "" && error ? "error" : ""
                }`}
              >
                Name is required
              </span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder=" e.g. Stephen King"
              className={`contentInputs ${
                formData.name === "" && error ? "inputError" : ""
              }`}
            />
          </div>
          <div className="email">
            <label htmlFor="email">
              <span>Email Address</span>
              <span
                className={`errorMessage ${
                  formData.email === "" && error ? "error" : ""
                }`}
              >
                Email Address is required
              </span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="e.g. stephenking@lorem.com "
              className={`contentInputs ${
                formData.email === "" && error ? "inputError" : ""
              }`}
            />
          </div>
          <div className="phone">
            <label htmlFor="phone">
              <span>Phone Number</span>
              <span
                className={`errorMessage ${
                  formData.phone === "" && error ? "error" : ""
                }`}
              >
                Phone Number is required
              </span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder=" e.g. +1 234 567 890"
              className={`contentInputs ${
                formData.phone === "" && error ? "inputError" : ""
              }`}
            />
          </div>
        </div>
        <div className="buttons">
          <button
            type="submit"
            onClick={(e) => handlePrevious(e)}
            disabled={step == 1}
            className={`previousButton ${step == 1 ? "disable" : ""} `}
          >
            Go back
          </button>
          <button
            type="submit"
            onClick={(e) => handleNext(e)}
            className="nextButton"
          >
            Next Step
          </button>
        </div>
      </div>
      <div className={`stepContent ${step === 2 ? "activeStep" : ""}`}>
        <div className="stepDetails">
          <h1>Select your plan</h1>
          <p>You have the option of monthly or yearly billing.</p>
        </div>
        <div className="cards">
          {plan == "monthly" &&
            CardDetails.monthly.map((card) => (
              <Card
                key={card.title}
                title={card.title}
                src={card.src}
                price={card.price}
                plan={plan}
                isSelected={selectedCard.title === card.title}
                onSelect={() => handleCardSelection(card)}
              />
            ))}
          {plan == "yearly" &&
            CardDetails.yearly.map((card) => (
              <Card
                key={card.title}
                title={card.title}
                src={card.src}
                price={card.price}
                plan={plan}
                isSelected={selectedCard.title === card.title}
                onSelect={() => handleCardSelection(card)}
                extra={card.extra}
              />
            ))}
        </div>
        <div className="planContainer">
          <span className={`planText ${plan == "monthly" ? "activePlan" : ""}`}>
            Monthly
          </span>
          <label className="switch">
            <input type="checkbox" onClick={handlePlan} />
            <span className="slider round"></span>
          </label>
          <span className={`planText ${plan == "yearly" ? "activePlan" : ""}`}>
            Yearly
          </span>
        </div>
        <div className="buttons">
          <button
            type="submit"
            onClick={(e) => handlePrevious(e)}
            disabled={step === 1}
            className="previousButton"
          >
            Go back
          </button>
          <button
            type="submit"
            onClick={(e) => handleNext(e)}
            className="nextButton"
          >
            Next Step
          </button>
        </div>
      </div>
      <div className={`stepContent ${step === 3 ? "activeStep" : ""}`}>
        <div className="stepDetails">
          <h1>Pick add-ons</h1>
          <p> Add-ons help enhance your gaming experience.</p>
        </div>
        <div className="checkbox__wrapper">
          {plan == "monthly" &&
            CheckboxDetails.monthly.map((box) => (
              <CustomCheckbox
                key={box.title}
                title={box.title}
                desc={box.desc}
                price={box.price}
                plan={plan}
                box={box}
                activeOptions={activeOptions}
                setActiveOptions={setActiveOptions}
              />
            ))}
          {plan == "yearly" &&
            CheckboxDetails.yearly.map((box) => (
              <CustomCheckbox
                key={box.title}
                title={box.title}
                desc={box.desc}
                price={box.price}
                plan={plan}
                box={box}
                activeOptions={activeOptions}
                setActiveOptions={setActiveOptions}
              />
            ))}
        </div>
        <div className="buttons">
          <button
            type="submit"
            onClick={(e) => handlePrevious(e)}
            disabled={step === 1}
            className="previousButton"
          >
            Go back
          </button>
          <button
            type="submit"
            onClick={(e) => handleNext(e)}
            className="nextButton"
          >
            Next Step
          </button>
        </div>
      </div>
      <div className={`stepContent ${step === 4 ? "activeStep" : ""}`}>
        <div className="stepDetails">
          <h1>Finishing up</h1>
          <p> Double-check everything looks OK before confirming.</p>
        </div>
        <div className="counter">
          <div className="selectedCard">
            <div className="cardDetails">
              <h2 className="selectedCard__title">{selectedCard.title}</h2>
              <p onClick={handleChange} className="change__btn">
                Change
              </p>
            </div>
            <p className="selectedCard__price">
              ${selectedCard.price}/{plan === "monthly" ? "mo" : "yr"}
            </p>
          </div>
          {activeOptions.map((option) => (
            <div className="selectedOption" key={option.title}>
              <div className="option" id="option1">
                {option.title}
              </div>
              <p className="optionPrice">
                +${option.price}/{plan === "monthly" ? "mo" : "yr"}
              </p>
            </div>
          ))}
        </div>

        <div className="totalPrice">
          <h4>Total (per month/year)</h4>

          <p className="totalPrice__value">
            ${calculatePrice(activeOptions, selectedCard.price)}/
            {plan === "monthly" ? "mo" : "yr"}
          </p>
        </div>
        <div className="buttons">
          <button
            type="submit"
            onClick={(e) => handlePrevious(e)}
            disabled={step === 1}
            className="previousButton"
          >
            Go back
          </button>
          <button
            type="submit"
            onClick={(e) => handleNext(e)}
            className="nextButton"
          >
            Confirm
          </button>
        </div>
      </div>
      <div className={`stepContent ${step === 5 ? "activeStep" : ""}`}>
        <div className="lastStep">
          <div className="lastImage">
            <Image
              src="/icon-thank-you.svg"
              layout="responsive"
              height={50}
              width={50}
              alt={"Checkmark"}
            ></Image>
          </div>
          <div className="stepDetails">
            <h1>Thank you!</h1>
            <p>
              Thanks for confirming your subscription! We hope you have fun
              using our platform. If you ever need support, please feel free to
              email us at support@loremgaming.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepInformation;
