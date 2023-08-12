import ExpenseOptions from "./ExpenseOptions";
import ExpenseDate from "./ExpenseDate";
import "./ExpenseFormElements.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import moment from "moment";

const ExpenseForm = (props) => {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  let formattedDate = moment(date).format("DD-MMM-YYYY");

  console.log(formattedDate);

  const expenseAmountHandler = (e) => {
    setExpenseAmount(e.target.value);
  };

  const typeChangeHandler = (e) => {
    setType(e);
  };
  const dateChangeHandler = (e) => {
    setDate(e);
  };

  const noteChangeHandler = (e) => {
    setNote(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const expenseInfo = {
      expenseAmount: expenseAmount,
      type: type,
      date: formattedDate,
      note: note,
      id: Math.random().toString(),
    };
    props.onExpenseInfoInput(expenseInfo);

    /* fetch("https://fewd-todolist-api.onrender.com/tasks?api_key=281", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([expenseInfo]),
    }).then(() => {
      console.log("expense added");
    });*/

    setExpenseAmount("");
    setType("");
    setDate("");
    setNote("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="inputForm">
          <form onSubmit={submitHandler}>
            <input
              placeholder="expense amount"
              value={expenseAmount}
              onChange={expenseAmountHandler}
              type="number"
              min="1"
              max="1000000000"
              className="col-8 inputField"
            />
            <ExpenseOptions optionsValue={typeChangeHandler} />
            <ExpenseDate dateValue={dateChangeHandler} />
            <input
              placeholder="notes (30 character limit)"
              value={note}
              type="string"
              maxlength="30"
              className="col-8 inputField"
              onChange={noteChangeHandler}
            />
            <div>
              <button type="submit">
                <span>ADD</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
