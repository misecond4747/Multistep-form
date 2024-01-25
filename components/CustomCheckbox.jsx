"use client";

import { useState } from "react";

const CustomCheckbox = ({
  title,
  desc,
  price,
  plan,
  activeOptions,
  setActiveOptions,
  box,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  // const handleCheck = (box) => {
  //   setIsChecked((prev) => !prev);
  //   if (activeOptions.includes(box.title)) {
  //     setActiveOptions(activeOptions.filter((obj) => obj.title != box.title));
  //   } else {
  //     setActiveOptions([
  //       ...activeOptions,
  //       { title: box.title, price: box.price },
  //     ]);
  //   }
  // };

  const handleCheck = (box) => {
    setIsChecked((prev) => !prev);

    if (activeOptions.some((obj) => obj.title === box.title)) {
      // If the box is already in activeOptions, remove it
      setActiveOptions((prevOptions) =>
        prevOptions.filter((obj) => obj.title !== box.title)
      );
    } else {
      // If the box is not in activeOptions, add it
      setActiveOptions((prevOptions) => [
        ...prevOptions,
        {
          title: box.title,
          price: box.price,
        },
      ]);
    }
  };

  return (
    <div
      className={`checkbox__container ${isChecked ? "activeOption" : ""}`}
      onClick={() => handleCheck(box)}
    >
      <div className="checkbox">
        <input
          type="checkbox"
          name="option"
          id="option"
          checked={isChecked}
          onChange={() => handleCheck(box)}
          onClick={handleCheck}
        />
        <div className="optionDetails">
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
      </div>
      <p>
        ${price}/{plan}
      </p>
    </div>
  );
};

export default CustomCheckbox;
