import React, { useState, useEffect } from "react";
import "./NameAndCurrency.css";
import "bootstrap/dist/css/bootstrap.css";
export const NameAndCurrency = (props) => {
  const [retrievedData, setRetrievedData] = useState([]);

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
  const [loggingIn, setLoggingIn] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(
    currencyOptions[0].value
  );

  const [userKey, setUserKey] = useState("");
  const [username, setUsername] = useState("");
  const [userPassword, setPassword] = useState("");
  const [verifyUsername, setVerifyUsername] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [usernameExists, setUsernameExists] = useState();
  const [incorrectUsernameOrPassword, setIncorrectUsernameOrPassword] =
    useState();
  const pretext = "username&Password-";
  let verifiedUsernameandPassword;

  const usernameandPasswordHandler = () => {
    retrievedData.map((i) => {
      if (i.content.includes("username&Password-")) {
        if (
          i.content.includes(verifyUsername) &&
          i.content.includes(verifyPassword)
        ) {
          return (verifiedUsernameandPassword = JSON.parse(i.content));
        }
      }
    });
  };

  const retrieveData = () => {
    fetch("https://fewd-todolist-api.onrender.com/tasks?api_key=322")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRetrievedData(data.tasks);
      });
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const usernameList = retrievedData.map((i) => {
    let parsedData = JSON.parse(i.content);
    return parsedData.username;
  });

  const registrationSubmitHandler = (e) => {
    e.preventDefault();

    const nameAndCurrencyInfo = [
      {
        userKey: userKey,
        pretext: pretext,
        selectedCurrency: selectedCurrency,
        username: username,
        userPassword: userPassword,
      },
    ];
    if (usernameList.includes(username)) {
      setUsernameExists(true);
    } else {
      setUsernameExists(false);
      fetch(`https://fewd-todolist-api.onrender.com/tasks?api_key=${userKey}`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: {
            content: "budget-",
          },
        }),
      });

      fetch(`https://fewd-todolist-api.onrender.com/tasks?api_key=322`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: {
            content: nameAndCurrencyInfo
              .map((i) => JSON.stringify(i))
              .join("<=>"),
          },
        }),
      }).then(retrieveData);
    }
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    usernameandPasswordHandler();
    if (verifiedUsernameandPassword) {
      setIncorrectUsernameOrPassword(false);
      props.onLoginInfo(verifiedUsernameandPassword);
    } else {
      setIncorrectUsernameOrPassword(true);
    }
  };

  const currencyChangeHandler = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const verifyUsernameHandler = (e) => {
    setVerifyUsername(e.target.value);
  };

  const verifyPasswordHandler = (e) => {
    setVerifyPassword(e.target.value);
  };

  const loginHanlder = (e) => {
    setLoggingIn(true);
    setRegistering(false);
  };

  const registerHanlder = (e) => {
    setLoggingIn(false);
    setRegistering(true);

    fetch(`https://fewd-todolist-api.onrender.com/users`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserKey(data.id);
      });
  };

  console.log(usernameList);

  return (
    <div className="orbMoneyAccess">
      <p className="appName">ORB MONEY</p>

      {registering && (
        <form onSubmit={registrationSubmitHandler} className="nameAndCurrency">
          <input
            className="nameAndCurrencyInputField"
            placeholder="username"
            onChange={usernameHandler}
            maxlength="15"
          ></input>

          <input
            className="nameAndCurrencyInputField"
            placeholder="password"
            onChange={passwordHandler}
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
          {usernameExists && (
            <p className="nameAndCurrencyInputField">
              A user with that username already exists. Try another?
            </p>
          )}
          <button type="submit" className="mb-2">
            Register Account
          </button>
        </form>
      )}

      {loggingIn && (
        <form onSubmit={loginSubmitHandler} className="nameAndCurrency">
          <input
            className="nameAndCurrencyInputField"
            placeholder="username"
            onChange={verifyUsernameHandler}
          ></input>
          <input
            className="nameAndCurrencyInputField"
            placeholder="password"
            onChange={verifyPasswordHandler}
          ></input>
          {incorrectUsernameOrPassword && (
            <p className="nameAndCurrencyInputField">
              Incorrect username or password. Try again.
            </p>
          )}
          <button type="submit" className="mb-2">
            Login
          </button>
        </form>
      )}

      <div>
        {!registering && (
          <button onClick={registerHanlder} className="me-2">
            Register
          </button>
        )}
        {!loggingIn && (
          <button onClick={loginHanlder} className="pe-3 ps-3">
            Login
          </button>
        )}
      </div>

      {!loggingIn && !registering && (
        <p className="appDescription">
          <div className="row d-flex justify-content-center ">
            <div className="col-5 ">
              ORB MONEY is a budgeting app. ORB MONEY allows the user to input
              their different sources of income, create a budget by allowing the
              users allocate their income into different spending categories and
              then track their day to day expenses against their allocated
              spending categories. To start, click on Register and input your
              username or password and select your currency. Then log in using
              your username and password.
            </div>
          </div>
        </p>
      )}
    </div>
  );
};
export default NameAndCurrency;
