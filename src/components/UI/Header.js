import React, { useState } from "react";
import Income from "../NewIncome/Income";
import Title from "./Title";
import Budget from "../Budget/Budget";
import "bootstrap/dist/css/bootstrap.css";
import "./Header.css";

const Header = (props) => {
  const [incomeTotal, setIncomeTotal] = useState("");
  const expense = props.totalExpenseCost;
  const expensesList = props.expensesList;
  const userKey = props.userKey;

  const incomeTotalHandler = (e) => {
    setIncomeTotal(e);
  };
  console.log(expensesList);
  return (
    <div className="container-fluid totalIncomeContainer">
      <div className="row">
        <div className="mainHeader d-flex">
          <div className="col-6 incomegrp">
            <Title className="title" username={props.username} />
            <Income
              expenseTotal={expense}
              currency={props.currency}
              incomeTotal={incomeTotalHandler}
              userKey={userKey}
            />
          </div>
          <div className="col-6 budgetgrp">
            <Budget
              expensesList={expensesList}
              currency={props.currency}
              incomeTotal={incomeTotal}
              userKey={userKey}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
