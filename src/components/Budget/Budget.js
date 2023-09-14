import BudgetForm from "./BudgetForm";
import BudgetList from "./BudgetList";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Budget.css";
import del from "../Img/del-Freepik.png";

const Budget = (props) => {
  const [retrievedBudgets, setRetrievedBudgets] = useState([]);
  const declearedBudgets = [];
  const [budgetList, setBudgetList] = useState(false);
  const [editBudget, setEditBudget] = useState(false);

  let expenseSum = [
    { sum: 0, type: "food & drink" },
    { sum: 0, type: "home" },
    { sum: 0, type: "utility" },
    { sum: 0, type: "living essentials" },
    { sum: 0, type: "debt" },
    { sum: 0, type: "pet cost" },
    { sum: 0, type: "internet" },
    { sum: 0, type: "subscription" },
    { sum: 0, type: "medical/dental" },
    { sum: 0, type: "savings" },
    { sum: 0, type: "investing" },
    { sum: 0, type: "charity" },
    { sum: 0, type: "fun" },
    { sum: 0, type: "other" },
  ];

  const incomeSum = props.incomeTotal;
  const expensesList = props.expensesList;

  const [budgets, setBudgets] = useState([
    { id: 1, budget: null, type: "food & drink" },
    { id: 2, budget: null, type: "home" },
    { id: 3, budget: null, type: "utility" },
    { id: 4, budget: null, type: "living essentials" },
    { id: 4, budget: null, type: "debt" },
    { id: 5, budget: null, type: "pet cost" },
    { id: 6, budget: null, type: "internet" },
    { id: 7, budget: null, type: "subscription" },
    { id: 8, budget: null, type: "medical/dental" },
    { id: 9, budget: null, type: "savings" },
    { id: 10, budget: null, type: "investing" },
    { id: 11, budget: null, type: "charity" },
    { id: 12, budget: null, type: "fun" },
    { id: 13, budget: null, type: "other" },
  ]);

  const retrieveBudgets = () => {
    fetch("https://fewd-todolist-api.onrender.com/tasks/4342?api_key=282")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("retrieveBudget - data:", data);
        console.log("data.task.content:", data.task.content);
        console.log(
          "JSON.parse(data.task.content):",
          JSON.parse(data.task.content)
        );

        const parsedBudgetData = JSON.parse(data.task.content);

        setRetrievedBudgets(parsedBudgetData);
      });
  };

  useEffect(() => {
    retrieveBudgets();
  }, []);

  const modifiedBudgets = [
    { id: 1, budget: 0, type: "food & drink" },
    { id: 2, budget: 0, type: "home" },
    { id: 3, budget: 0, type: "utility" },
    { id: 4, budget: 0, type: "living essentials" },
    { id: 4, budget: 0, type: "debt" },
    { id: 5, budget: 0, type: "pet cost" },
    { id: 6, budget: 0, type: "internet" },
    { id: 7, budget: 0, type: "subscription" },
    { id: 8, budget: 0, type: "medical/dental" },
    { id: 9, budget: 0, type: "savings" },
    { id: 10, budget: 0, type: "investing" },
    { id: 11, budget: 0, type: "charity" },
    { id: 12, budget: 0, type: "fun" },
    { id: 13, budget: 0, type: "other" },
  ];

  const budgetListHandler = () => {
    setBudgetList(true);
  };

  const stopBudgetListHandler = () => {
    setBudgetList(false);
  };

  const editBudgetHandler = () => {
    setEditBudget(true);
  };

  const stopEditBudgetHandler = () => {
    setEditBudget(false);
  };

  for (let i = 0; i < budgets.length; i++) {
    budgets[i].budget = retrievedBudgets[i];
  }

  for (let i = 0; i < expenseSum.length; i++) {
    for (let j = 0; j < expensesList.length; j++) {
      if (expenseSum[i].type === expensesList[j].type) {
        expenseSum[i].sum = expenseSum.reduce(function () {
          return expenseSum[i].sum + +expensesList[j].expenseAmount;
        }, 0);
        console.log(expenseSum);
      }
    }
  }
  const addBudget = (e) => {
    let newBudgetState = [];

    {
      setBudgets((existingBudgets) => {
        for (let i = 0; i < budgets.length; i++) {
          if (budgets[i].type === e.type) {
            budgets[i].budget = e.budgetAmount;
            newBudgetState = [...existingBudgets];

            return newBudgetState;
          }
        }
      });
    }

    let newBudgetStateMap = newBudgetState.map((i) => {
      return i.budget;
    });

    fetch("https://fewd-todolist-api.onrender.com/tasks/4342?api_key=282", {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: {
          content: JSON.stringify(newBudgetStateMap),
        },
      }),
    });
    retrieveBudgets();
    console.log(newBudgetState);
  };

  const deleteButtonHandler = (e) => {
    const updatedList = retrievedBudgets.map((i) => {
      return i;
    });

    updatedList[e] = null;

    fetch(`https://fewd-todolist-api.onrender.com/tasks/4342?api_key=282`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: {
          content: JSON.stringify(updatedList),
        },
      }),
    });
    retrieveBudgets();
  };

  for (let i = 0; i < budgets.length; i++) {
    modifiedBudgets[i].budget = budgets[i].budget - expenseSum[i].sum;
    if (budgets[i].budget !== null) {
      declearedBudgets.push(modifiedBudgets[i]);
    }
  }

  const modifiedBudgetsSum = modifiedBudgets.reduce(function (prev, current) {
    return prev + +current.budget;
  }, 0);

  console.log(modifiedBudgetsSum);

  return (
    <div className="budget">
      <div className="d-flex justify-content-end">
        {
          <p>
            Allocable Income Remaining: {props.currency}
            {(incomeSum - modifiedBudgetsSum)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        }
      </div>
      <div className="d-flex justify-content-end">
        {!editBudget && !budgetList && (
          <button onClick={editBudgetHandler}>
            <span>ADD BUDGET</span>
          </button>
        )}
        {editBudget && (
          <BudgetForm
            onBudgetInfoInput={addBudget}
            expensesList={expensesList}
            onStopEdit={stopEditBudgetHandler}
          />
        )}

        {!budgetList && !editBudget && (
          <button
            onClick={budgetListHandler}
            className="minimizeButton"
            type="button"
          >
            ˅
          </button>
        )}
        {budgetList && (
          <button
            onClick={stopBudgetListHandler}
            className="minimizeButton"
            type="button"
          >
            ˄
          </button>
        )}
      </div>

      {budgetList &&
        declearedBudgets &&
        declearedBudgets.map((declearedBudget) => (
          <BudgetList
            key={declearedBudget.id}
            type={declearedBudget.type}
            currency={props.currency}
            amount={declearedBudget.budget}
            bttn={
              <img
                src={del}
                type="button"
                onClick={() =>
                  deleteButtonHandler(modifiedBudgets.indexOf(declearedBudget))
                }
                className="icons"
                alt="delete icon"
              />
            }
          />
        ))}
    </div>
  );
};

export default Budget;
