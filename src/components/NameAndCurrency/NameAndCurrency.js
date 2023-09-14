import React, { useState } from "react";
import "./NameAndCurrency.css";
import "bootstrap/dist/css/bootstrap.css";

export const NameAndCurrency = (props) => {
  const currencyOptions = [
    { currency: "Dollar", value: "$" },
    { currency: "Euro", value: "€" },
    { currency: "Yen", value: "¥" },
    { currency: "Pound", value: "£" },
    { currency: "Won", value: "₩" },
    { currency: "Franc", value: "₣" },
    { currency: "Peso", value: "₱" },
    { currency: "Baht", value: "฿" },
  ];

  const [selectedCurrency, setSelectedCurrency] = useState(
    currencyOptions[0].value
  );
  const [userName, setUserName] = useState("");

  const currencyChangeHandler = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const nameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const nameAndCurrencyInfo = {
      selectedCurrency: selectedCurrency,
      userName: userName,
    };

    props.onSubmitInfo(nameAndCurrencyInfo);
  };
  console.log(selectedCurrency);
  return (
    <div className="orbMoneyAccess">
      <p className="appName">ORB MONEY</p>
      <form onSubmit={submitHandler} className="nameAndCurrency">
        <input
          className="nameAndCurrencyInputField"
          placeholder="username"
          onChange={nameChangeHandler}
          maxlength="15"
        ></input>

        <select
          className="nameAndCurrencyInputField"
          onChange={currencyChangeHandler}
          value={selectedCurrency}
        >
          {currencyOptions.map((currency) => (
            <option value={currency.value}>{currency.currency}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
      <p className="appDescription">
        <div className="row d-flex justify-content-center ">
          <div className="col-5 ">
            ORB MONEY is a budgeting app. ORB MONEY allows the user to input
            their different sources of income, create a budget by allowing the
            users allocate their income into different spending categories and
            then track their day to day expenses against their allocated
            spending categories. For now, due to server constraints, the user
            can only add 2 or 3 expenses. Input any username, select your
            currency and hit submit to get started.
          </div>
        </div>
      </p>
    </div>
  );
};

export default NameAndCurrency;
