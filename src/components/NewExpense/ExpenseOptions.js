import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./ExpenseFormElements.css";

const ExpenseOptions = (props) => {
  const expenseOption = [
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

  const [expense, setExpense] = useState(expenseOption[0].value);

  props.optionsValue(expense);
  const onChangeHandler = (e) => {
    setExpense(e.target.value);
  };
  return (
    <div className="offset-2 col-8">
      <select
        value={expense}
        onChange={onChangeHandler}
        className="selectField inputField w-100"
      >
        {expenseOption.map((expense) => (
          <option value={expense.value}>{expense.value}</option>
        ))}
      </select>
    </div>
  );
};

export default ExpenseOptions;
