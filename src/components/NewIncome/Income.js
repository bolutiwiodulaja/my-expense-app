import React, { useState, useEffect } from "react";
import IncomeForm from "./IncomeForm";
import IncomeList from "./IncomeList";
import "bootstrap/dist/css/bootstrap.css";
import "./Income.css";
import del from "../Img/del-Freepik.png";

const Income = (props) => {
  const [editIncome, setEditIncome] = useState(false);
  const [incomeList, setIncomeList] = useState(false);
  const [retrieveIncomeData, setRetrieveIncomeData] = useState([]);
  const [entryIncluded, setEntryIncluded] = useState(false);

  useEffect(() => {
    retrieveIncome();
  }, []);

  const retrieveIncome = () => {
    fetch("https://fewd-todolist-api.onrender.com/tasks/4340?api_key=282")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("retrieveIncome - data:", data);
        console.log("data.task.content:", data.task.content);
        console.log(
          "JSON.parse(data.task.content):",
          JSON.parse(data.task.content)
        );

        const parsedIncomeData = JSON.parse(data.task.content);

        setRetrieveIncomeData(parsedIncomeData);
      });

    if (retrieveIncomeData.length >= 0) {
      setEntryIncluded(true);
    }
  };

  const addIncome = (e) => {
    let newIncomesState = [];
    let existingIncomes = [];
    const existing = () => {
      existingIncomes = retrieveIncomeData.map((i) => {
        return i;
      });
    };

    if (Array.isArray(retrieveIncomeData) !== false) {
      existing();
      newIncomesState = [e, ...existingIncomes];
    } else {
      newIncomesState = [e];
    }

    fetch(`https://fewd-todolist-api.onrender.com/tasks/4340?api_key=282`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: {
          content: JSON.stringify(newIncomesState),
        },
      }),
    });

    retrieveIncome();
  };

  const editIncomeHandler = () => {
    setEditIncome(true);
  };

  const stopEditIncomeHandler = () => {
    setEditIncome(false);
  };

  const incomeListHandler = () => {
    setIncomeList(true);
  };

  const stopIncomeListHandler = () => {
    setIncomeList(false);
  };

  const deleteButtonHandler = (id) => {
    const updatedList = retrieveIncomeData.filter((e) => e.id !== id);

    fetch(`https://fewd-todolist-api.onrender.com/tasks/4340?api_key=282`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: {
          content: JSON.stringify(updatedList),
        },
      }),
    });
    retrieveIncome();
  };

  let incomeSum = retrieveIncomeData.reduce(function (prev, current) {
    return prev + +current.amount;
  }, 0);

  props.incomeTotal(incomeSum);

  return (
    <div className="income">
      <div className="d-flex justify-content-start">
        {!incomeList && (
          <p className="incomeTotal">
            {props.currency}
            {(incomeSum - props.expenseTotal)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        )}
      </div>
      {incomeList && !entryIncluded && <p>You have not included any income</p>}
      <div className="incomeList">
        {incomeList &&
          entryIncluded &&
          retrieveIncomeData.map((income) => (
            <IncomeList
              key={income.id}
              description={income.description}
              currency={props.currency}
              amount={income.amount}
              bttn={
                <img
                  src={del}
                  type="button"
                  onClick={() => deleteButtonHandler(income.id)}
                  className="icons"
                  alt="delete icon"
                />
              }
            />
          ))}
      </div>
      <div className="d-flex flex-column justify-content-start ">
        {!editIncome && !incomeList && (
          <button onClick={editIncomeHandler}>
            <span>ADD INCOME</span>
          </button>
        )}
        {editIncome && (
          <IncomeForm
            onIncomeInfoInput={addIncome}
            onStopEdit={stopEditIncomeHandler}
          />
        )}

        {!incomeList && !editIncome && (
          <button
            onClick={incomeListHandler}
            className="minimizeButton"
            type="button"
          >
            <p>show income ˅</p>
          </button>
        )}
        {incomeList && (
          <button
            onClick={stopIncomeListHandler}
            className="minimizeButton"
            type="button"
          >
            <p>hide income ˄</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Income;
