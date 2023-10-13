import React, { useState, useEffect } from "react";
import IncomeForm from "./IncomeForm";
import IncomeList from "./IncomeList";
import "bootstrap/dist/css/bootstrap.css";
import "./Income.css";
import del from "../Img/del-Freepik.png";

const Income = (props) => {
  const [retrievedData, setRetrievedData] = useState([]);
  const [editIncome, setEditIncome] = useState(false);
  const [incomeList, setIncomeList] = useState(false);
  let incomes = [];
  const userKey = props.userKey;

  const incomeHandler = () => {
    retrievedData.map((i) => {
      if (i.content.includes("income")) {
        return incomes.push(i);
      }
    });
  };

  const retrieveData = () => {
    fetch(`https://fewd-todolist-api.onrender.com/tasks?api_key=${userKey}`)
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

  incomeHandler();

  const addIncome = (e) => {
    let newIncomesState = [e];

    fetch(`https://fewd-todolist-api.onrender.com/tasks?api_key=${userKey}`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: {
          content: newIncomesState.map((i) => JSON.stringify(i)).join("<=>"),
        },
      }),
    }).then(retrieveData);
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
    fetch(
      `https://fewd-todolist-api.onrender.com/tasks/${id}?api_key=${userKey}`,
      {
        method: "DELETE",
        mode: "cors",
      }
    )
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
        retrieveData();
      });
  };

  const parsedIncomes = incomes.map((i) => {
    return JSON.parse(i.content);
  });

  let incomeSum = parsedIncomes.reduce(function (prev, current) {
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
      {!incomes && incomeList && <p>You have not included any income</p>}
      <div className="incomeList">
        {incomeList &&
          incomes &&
          incomes.map((income) => (
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
