import Expense from "../NewExpense/Expense";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Body.css";

const Body = (props) => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [total, setTotal] = useState("");
  const [expensesList, setExpensesList] = useState("");

  const current = new Date();

  const date = `${current.getDate()} ${
    month[current.getMonth()]
  } ${current.getFullYear()}`;

  const expenseTotalHandler = (e) => {
    setTotal(e);
  };

  const expensesListHandler = (e) => {
    setExpensesList(e);
  };

  props.expensesList(expensesList);
  props.totalExpenseCost(total);

  return (
    <div className="container-fluid totalExpenseContainer">
      <div className="row expenseContainer">
        <div className="mainBody">
          <div className="d-flex justify-content-between offset-1 col-10">
            <p className="todaysDate">{date}</p>
            <p className="expenseTotal">
              {props.currency}
              {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </div>
          <div className="row">
            <Expense
              expenseTotal={expenseTotalHandler}
              expensesList={expensesListHandler}
              currency={props.currency}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
