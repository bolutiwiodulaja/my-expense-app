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

  const checkStatus = (response) => {
    if (response.ok) {
      return response;
    }
    throw new Error("Request was either a 404 or 500");
  };

  const json = (response) => response.json();

  useEffect(() => {
    fetch("https://fewd-todolist-api.onrender.com/tasks?api_key=281")
      .then(checkStatus)

      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then(() => {
        console.log("data");
      });
  }, []);

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
