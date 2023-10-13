import Body from "./components/UI/Body";
import Header from "./components/UI/Header";
import NameAndCurrency from "../src/components/NameAndCurrency/NameAndCurrency";

import "./App.css";
import React, { useState, useEffect } from "react";

const App = (props) => {
  const [expenseTotalCost, setExpenseTotalCost] = useState("");
  const [expensesList, setExpensesList] = useState("");
  const [nameAndCurrency, setNameAndCurrency] = useState(false);
  const [nameAndCurrencyInfo, setNameAndCurrencyInfo] = useState("");

  const totalExpenseCostHandler = (e) => {
    setExpenseTotalCost(e);
  };

  const expensesListHandler = (e) => {
    setExpensesList(e);
  };

  const routeToExpenseApp = (e) => {
    setNameAndCurrencyInfo(e);
    setNameAndCurrency(true);
  };
  console.log(nameAndCurrencyInfo);
  return (
    <div className="App">
      {!nameAndCurrency && <NameAndCurrency onLoginInfo={routeToExpenseApp} />}
      {nameAndCurrency && (
        <header className="App-header">
          <Header
            totalExpenseCost={expenseTotalCost}
            currency={nameAndCurrencyInfo.selectedCurrency}
            username={nameAndCurrencyInfo.username}
            expensesList={expensesList}
            userKey={nameAndCurrencyInfo.userKey}
          />
          <Body
            totalExpenseCost={totalExpenseCostHandler}
            currency={nameAndCurrencyInfo.selectedCurrency}
            expensesList={expensesListHandler}
            userKey={nameAndCurrencyInfo.userKey}
            logout={setNameAndCurrency}
          />
        </header>
      )}
    </div>
  );
};

export default App;
