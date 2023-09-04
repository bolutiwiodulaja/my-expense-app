import BudgetForm from "./BudgetForm";
import BudgetList from "./BudgetList";
import React, { useState, useEffect } from "react";

const Budget = (props) => {
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

  const expensesList = props.expensesList;

  const [budgets, setBudgets] = useState([
    { id: 1, budget: -1, type: "food & drink" },
    { id: 2, budget: -1, type: "home" },
    { id: 3, budget: -1, type: "utility" },
    { id: 4, budget: -1, type: "living essentials" },
    { id: 4, budget: -1, type: "debt" },
    { id: 5, budget: -1, type: "pet cost" },
    { id: 6, budget: -1, type: "internet" },
    { id: 7, budget: -1, type: "subscription" },
    { id: 8, budget: -1, type: "medical/dental" },
    { id: 9, budget: -1, type: "savings" },
    { id: 10, budget: -1, type: "investing" },
    { id: 11, budget: -1, type: "charity" },
    { id: 12, budget: -1, type: "fun" },
    { id: 13, budget: -1, type: "other" },
  ]);

  /*const [retrievedBudgets, setRetrievedBudgets] = useState([]);*/

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

  const declearedBudgets = [];

  /* useEffect(() => {
    retrieveBudget();
  }, []);

  const retrieveBudget = () => {
    fetch("https://fewd-todolist-api.onrender.com/tasks?api_key=283")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRetrievedBudgets(data.tasks);
      });
  };*/

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
    console.log(newBudgetState);
    fetch("https://fewd-todolist-api.onrender.com/tasks?api_key=283", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: {
          content: newBudgetState.map((i) => {
            JSON.stringify(i);
          }),
        },
      }),
    });
  };

  for (let i = 0; i < budgets.length; i++) {
    modifiedBudgets[i].budget = budgets[i].budget - expenseSum[i].sum;
    if (modifiedBudgets[i].budget > -1) {
      declearedBudgets.push(modifiedBudgets[i]);
    }
  }

  return (
    <div>
      <BudgetForm onBudgetInfoInput={addBudget} expensesList={expensesList} />
      {declearedBudgets &&
        declearedBudgets.map((declearedBudget) => (
          <BudgetList
            key={declearedBudget.id}
            type={declearedBudget.type}
            currency={props.currency}
            amount={declearedBudget.budget}
          />
        ))}
    </div>
  );
};

export default Budget;
