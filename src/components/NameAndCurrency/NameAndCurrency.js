import React, { useState } from "react";
import "./NameAndCurrency.css";

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

    fetch("https://fewd-todolist-api.onrender.com/tasks?api_key=281", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: {
          content: nameAndCurrencyInfo,
        },
      }),
    }).then(() => {
      console.log("userInfo added");
    });

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
    </div>
  );
};

export default NameAndCurrency;
