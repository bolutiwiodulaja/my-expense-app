import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./BudgetFormElements.css";

const BudgetOptions = (props) => {
  const budgetOption = [
    { value: "food & drink" },
    { value: "home" },
    { value: "utility" },
    { value: "living essentials" },
    { value: "debt" },
    { value: "pet cost" },
    { value: "internet" },
    { value: "subscription" },
    { value: "medical/dental" },
    { value: "savings" },
    { value: "investing" },
    { value: "charity" },
    { value: "fun" },
    { value: "other" },
  ];

  const [budget, setBudget] = useState(budgetOption[0].value);

  props.optionsValue(budget);
  const onChangeHandler = (e) => {
    setBudget(e.target.value);
  };
  return (
    <div className="offset-2 col-8">
      <select
        value={budget}
        onChange={onChangeHandler}
        className="budgetInputField w-100"
      >
        {budgetOption.map((budget) => (
          <option value={budget.value}>{budget.value}</option>
        ))}
      </select>
    </div>
  );
};

export default BudgetOptions;
