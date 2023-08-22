import ExpenseOptions from "../NewExpense/ExpenseOptions";
import React, { useState } from "react";

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

    /*fetch("https://fewd-todolist-api.onrender.com/tasks?api_key=281", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: {
          content: budgetInfo,
        },
      }),
    }).then(() => {
      console.log("budget added");
    });*/

    setBudgetAmount("");
    setType("");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          placehodler="budget-amount"
          type="number"
          onChange={budgetAmountHandler}
          value={budgetAmount}
        />
        <ExpenseOptions optionsValue={typeChangeHandler} />
        <button type="submit">ADD BUDGET</button>
      </form>
    </div>
  );
};

export default BudgetForm;
