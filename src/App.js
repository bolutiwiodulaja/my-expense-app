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

  return (
    <div className="App">
      {!nameAndCurrency && <NameAndCurrency onSubmitInfo={routeToExpenseApp} />}
      {nameAndCurrency && (
        <header className="App-header">
          <Header
            totalExpenseCost={expenseTotalCost}
            currency={nameAndCurrencyInfo.selectedCurrency}
            userName={nameAndCurrencyInfo.userName}
            expensesList={expensesList}
          />
          <Body
            totalExpenseCost={totalExpenseCostHandler}
            currency={nameAndCurrencyInfo.selectedCurrency}
            expensesList={expensesListHandler}
          />
        </header>
      )}
    </div>
  );
};

export default App;
