import BudgetForm from "./BudgetForm";
import BudgetList from "./BudgetList";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Budget.css";
import del from "../Img/del-Freepik.png";

const Budget = (props) => {
  const [retrievedData, setRetrievedData] = useState([]);
  const [retrievedBudgets, setRetrievedBudgets] = useState([]);
  const declearedBudgets = [];
  const summedNumbers = [];
  const [budgetList, setBudgetList] = useState(false);
  const [editBudget, setEditBudget] = useState(false);
  const userKey = props.userKey;

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
    { budget: "budget-" },
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

  let userTaskID;

  const budgetHandler = () => {
    retrievedData.map((i) => {
      if (i.content.includes("budget-")) {
        return (userTaskID = i.id);
      }
    });
  };

  const retrieveBudgets = () => {
    fetch(
      `https://fewd-todolist-api.onrender.com/tasks/${userTaskID}?api_key=${userKey}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const parsedBudgetData = JSON.parse(data.task.content);

        setRetrievedBudgets(parsedBudgetData);
      });
  };

  const initializeBudget = () => {
    fetch(
      `https://fewd-todolist-api.onrender.com/tasks/${userTaskID}?api_key=${userKey}`,
      {
        method: "PUT",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: {
            content: JSON.stringify([
              "budget-",
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ]),
          },
        }),
      }
    ).then(retrieveBudgets);
  };
  console.log(userKey);
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

  budgetHandler();

  useEffect(() => {
    if (userTaskID) {
      if (retrievedBudgets.length < 13) {
        initializeBudget();
      } else {
        retrieveBudgets();
      }
    }
  }, [userTaskID]);

  console.log(retrievedBudgets);
  console.log(userTaskID);

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

  for (let i = 1; i < budgets.length; i++) {
    budgets[i].budget = retrievedBudgets[i];
  }

  for (let i = 0; i < expenseSum.length; i++) {
    for (let j = 0; j < expensesList.length; j++) {
      if (expenseSum[i].type === expensesList[j].type) {
        expenseSum[i].sum = expenseSum.reduce(function () {
          return expenseSum[i].sum + +expensesList[j].expenseAmount;
        }, 0);
      }
    }
  }

  const declearedBudgetHandler = () => {
    for (let i = 1; i < budgets.length; i++) {
      modifiedBudgets[i - 1].budget = budgets[i].budget - expenseSum[i - 1].sum;
      if (budgets[i].budget !== null) {
        declearedBudgets.push(modifiedBudgets[i - 1]);
      }
    }
  };

  const addBudget = (e) => {
    let newBudgetState = [];

    {
      setBudgets((existingBudgets) => {
        for (let i = 1; i < budgets.length; i++) {
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

    if (userTaskID) {
      fetch(
        `https://fewd-todolist-api.onrender.com/tasks/${userTaskID}?api_key=${userKey}`,
        {
          method: "PUT",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: {
              content: JSON.stringify(newBudgetStateMap),
            },
          }),
        }
      ).then(retrieveBudgets);
    }
  };

  const deleteButtonHandler = (e) => {
    const updatedList = retrievedBudgets.map((i) => {
      return i;
    });

    updatedList[e] = null;

    fetch(
      `https://fewd-todolist-api.onrender.com/tasks/${userTaskID}?api_key=${userKey}`,
      {
        method: "PUT",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: {
            content: JSON.stringify(updatedList),
          },
        }),
      }
    ).then(retrieveBudgets);
  };

  declearedBudgetHandler();

  for (let i = 1; i < budgets.length; i++) {
    summedNumbers.push(budgets[i]);
  }

  const modifiedBudgetsSum = summedNumbers.reduce(function (prev, current) {
    return prev + +current.budget;
  }, 0);

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
                  deleteButtonHandler(
                    modifiedBudgets.indexOf(declearedBudget) + 1
                  )
                }
                className="icons"
                alt="delete icon"
              />
            }
          />
        ))}
      <div className="d-flex flex-column justify-content-end ">
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
            <p>show budget ˅</p>
          </button>
        )}

        {budgetList && (
          <button
            onClick={stopBudgetListHandler}
            className="minimizeButton"
            type="button"
          >
            <p>hide budget ˄</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Budget;
