import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./ExpenseFormElements.css";

const ExpenseOptions = (props) => {
  const expenseOption = [
    { value: "food & drink", expense: "food & drink" },
    { value: "home", expense: "home" },
    { value: "utility", expense: "utility" },
    { value: "living essentials", expense: "living essentials" },
    { value: "loan payment", expense: "loan payment" },
    { value: "pet cost", expense: "pet cost" },
    { value: "internet", expense: "internet" },
    { value: "subscription", expense: "subscription" },
    { value: "medical/dental", expense: "medical/dental" },
    { value: "savings", expense: "savings" },
    { value: "investing", expense: "investing" },
    { value: "charity", expense: "charity" },
    { value: "fun", expense: "fun" },
    { value: "other", expense: "other" },
  ];

  const [expense, setExpense] = useState(expenseOption[0].value);

  props.optionsValue(expense);
  const onChangeHandler = (e) => {
    setExpense(e.target.value);
  };
  return (
    <div className="container">
      <div className="offset-2 col-8">
        <select
          value={expense}
          onChange={onChangeHandler}
          className="selectField inputField w-100"
        >
          {expenseOption.map((expense) => (
            <option value={expense.value}>{expense.expense}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpenseOptions;
