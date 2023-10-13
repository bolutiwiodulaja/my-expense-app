import BudgetOptions from "./BudgetOptions";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./BudgetFormElements.css";

const BudgetForm = (props) => {
  const [budgetAmount, setBudgetAmount] = useState("");
  const [type, setType] = useState("");

  const budgetAmountHandler = (e) => {
    setBudgetAmount(e.target.value);
  };

  const typeChangeHandler = (e) => {
    setType(e);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const budgetInfo = {
      budgetAmount: budgetAmount,
      type: type,
      id: Math.random().toString(),
    };

    props.onBudgetInfoInput(budgetInfo);

    setBudgetAmount("");
    setType("");
    props.onStopEdit();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          className="incomeInputField"
          placehodler="budget-amount"
          type="number"
          onChange={budgetAmountHandler}
          value={budgetAmount}
          placeholder="budget amount"
        />
        <BudgetOptions optionsValue={typeChangeHandler} />

        <div className="col-8 d-flex offset-md-2">
          <button type="submit">
            <span>ADD</span>
          </button>
          <button type="button" onClick={props.onStopEdit}>
            <span>CANCEL</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm;
