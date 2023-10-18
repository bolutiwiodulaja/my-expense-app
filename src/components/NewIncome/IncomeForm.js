import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./incomeFormElements.css";

const IncomeForm = (props) => {
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const pretext = "income-";

  const descriptionChangeHandler = (e) => {
    setEnteredDescription(e.target.value);
  };

  const valueChangeHandler = (e) => {
    setEnteredAmount(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const incomeInfo = {
      pretext: pretext,
      description: enteredDescription,
      amount: enteredAmount,
      id: Math.random().toString(),
    };

    props.onIncomeInfoInput(incomeInfo);

    setEnteredDescription("");
    setEnteredAmount("");
    props.onStopEdit();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="col-8 incomeInput ">
        <input
          className="incomeInputField"
          value={enteredDescription}
          type="string"
          onChange={descriptionChangeHandler}
          placeholder="description"
          maxlength="15"
        />
        <input
          className="incomeInputField"
          value={enteredAmount}
          type="number"
          onChange={valueChangeHandler}
          placeholder="income amount"
        />
      </div>
      <div className="col-8 d-flex mt-1 ">
        <button type="submit">
          <span>ADD</span>
        </button>
        <button type="button" onClick={props.onStopEdit}>
          <span>CANCEL</span>
        </button>
      </div>
    </form>
  );
};

export default IncomeForm;
