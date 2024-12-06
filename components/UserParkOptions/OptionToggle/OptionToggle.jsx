import { useState } from "react";
import "./OptionToggle.css";

export function OptionToggle({ options, defaultOption, onChange, setSelectedOption, selectedOption }) {
  
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div
      className={`option-toggle ${
        selectedOption === options[1] ? "option-toggle--second-selected" : ""
      }`}
    >
      <div className="option-toggle__background" />
      {options.map((option) => (
        <button
          type="button"
          key={option}
          onClick={() => handleOptionClick(option)}
          className={`option-toggle__button ${
            selectedOption === option ? "option-toggle__button--selected" : ""
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
