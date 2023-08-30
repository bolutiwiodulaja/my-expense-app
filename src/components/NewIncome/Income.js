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
  const [entryIncluded, setEntryIncluded] = useState(false);
  const [retrieveIncomeData, setRetrieveIncomeData] = useState([]);
  let incomeData = [];

  useEffect(() => {
    fetch("https://fewd-todolist-api.onrender.com/tasks?api_key=281")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRetrieveIncomeData(data.tasks);
      });
  }, []);

  /*retrieveIncomeData.map((i) => {
    incomeData.push(i.content);
  });
  console.log(incomeData);*/

  retrieveIncomeData.map((i) => {
    console.log(i.content["amount"]);
  });

  const addIncome = (e) => {
    let newIcomesState = [];
    setIncomes((existingIncomes) => {
      newIcomesState = [e, ...existingIncomes];
      return newIcomesState;
    });
    // setState is async, either do this or use useEffect to make the ajax call
    if (newIcomesState.length >= 0) {
      setEntryIncluded(true);
    }

    fetch("https://fewd-todolist-api.onrender.com/tasks?api_key=281", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: {
          content: newIcomesState.map((i) => JSON.stringify(i)).join("<=>"),
        },
      }),
    });
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
    fetch("https://fewd-todolist-api.onrender.com/tasks/${id}?api_key=281", {
      method: "DELETE",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then(() =>
        setRetrieveIncomeData((data) => {
          return data.filter((value) => value.id !== id);
        })
      );

    const updatedList = incomes.filter((e) => e.id !== id);
    setIncomes(updatedList);
  };

  let sum = incomeData.reduce(function (prev, current) {
    return prev + +current["amount"];
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
          retrieveIncomeData &&
          retrieveIncomeData.map((income) => (
            <IncomeList
              key={income.content["id"]}
              description={income.content["description"]}
              currency={props.currency}
              amount={income.content["amount"]}
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
