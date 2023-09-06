import React, { useState, useEffect } from "react";
import IncomeForm from "./IncomeForm";
import IncomeList from "./IncomeList";
import "bootstrap/dist/css/bootstrap.css";
import "./Income.css";
import del from "../Img/del-Freepik.png";

const Income = (props) => {
  const [incomes, setIncomes] = useState([]);
  const [editIncome, setEditIncome] = useState(false);
  const [incomeList, setIncomeList] = useState(false);
  const [retrieveIncomeData, setRetrieveIncomeData] = useState([]);
  const [entryIncluded, setEntryIncluded] = useState(false);

  let arrayAonvertedIncomeData = Object.values(retrieveIncomeData);
  let incomeData = arrayAonvertedIncomeData.map((i) => {
    return JSON.parse(i.content);
  });

  console.log(incomes);

  useEffect(() => {
    retrieveIncome();
  }, []);

  const retrieveIncome = () => {
    fetch("https://fewd-todolist-api.onrender.com/tasks/4303?api_key=281")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRetrieveIncomeData(data);
      });

    if (incomes.length >= 0) {
      setEntryIncluded(true);
    }
  };

  const addIncome = (e) => {
    let newIcomesState = [];
    setIncomes((existingIncomes) => {
      newIcomesState = [e, ...existingIncomes];
      return newIcomesState;
    });

    fetch(`https://fewd-todolist-api.onrender.com/task/4303?api_key=281`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: {
          description: newIcomesState.map((i) => JSON.stringify(i.decription)),
          amount: newIcomesState.map((i) => JSON.stringify(i.amount)),
          id: newIcomesState.map((i) => JSON.stringify(i.id)),
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
    if (!id) {
      return;
    }
    fetch(`https://fewd-todolist-api.onrender.com/tasks/${id}?api_key=304`, {
      method: "DELETE",
      mode: "cors",
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
        retrieveIncome();
      });
  };

  let sum = incomeData.reduce(function (prev, current) {
    return prev + +current.amount;
  }, 0);

  return (
    <div className="income">
      <div className="d-flex justify-content-start offset-1">
        {!incomeList && (
          <p className="incomeTotal">
            {props.currency}
            {(sum - props.expenseTotal)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        )}
      </div>
      <div className="d-flex justify-content-start offset-md-1">
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
            ˅
          </button>
        )}
      </div>
      {incomeList && !entryIncluded && <p>You have not included any income</p>}
      <div className="incomeList">
        {incomeList &&
          entryIncluded &&
          retrieveIncomeData.map((income) => (
            <IncomeList
              key={income.id}
              description={JSON.parse(income.content).description}
              currency={props.currency}
              amount={JSON.parse(income.content).amount}
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
      {incomeList && (
        <button
          onClick={stopIncomeListHandler}
          className="minimizeButton"
          type="button"
        >
          ˄
        </button>
      )}
    </div>
  );
};

export default Income;
