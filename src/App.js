import Body from "./components/UI/Body";
import Header from "./components/UI/Header";
import NameAndCurrency from "../src/components/NameAndCurrency/NameAndCurrency";

import "./App.css";
import React, { useState } from "react";

const App = (props) => {
  const [expenseTotalCost, setExpenseTotalCost] = useState("");
  const [nameAndCurrency, setNameAndCurrency] = useState(false);
  const [nameAndCurrencyInfo, setNameAndCurrencyInfo] = useState("");

  const totalExpenseCostHandler = (e) => {
    setExpenseTotalCost(e);
  };

  const routeToExpenseApp = (e) => {
    setNameAndCurrencyInfo(e);
    setNameAndCurrency(true);
  };

  console.log(nameAndCurrencyInfo);

  return (
    <div className="App">
      {!nameAndCurrency && <NameAndCurrency onSubmitInfo={routeToExpenseApp} />}
      {nameAndCurrency && (
        <header className="App-header">
          <Header
            totalExpenseCost={expenseTotalCost}
            currency={nameAndCurrencyInfo.selectedCurrency}
            userName={nameAndCurrencyInfo.userName}
          />
          <Body
            totalExpenseCost={totalExpenseCostHandler}
            currency={nameAndCurrencyInfo.selectedCurrency}
          />
        </header>
      )}
    </div>
  );
};

export default App;
