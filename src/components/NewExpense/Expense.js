import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import React, { useState, useEffect } from "react";
import "./Expense.css";
import del from "../Img/del-Freepik.png";
const Expense = (props) => {
  const [editExpenses, setEditExpenses] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const retrieveExpenses = () => {
    fetch("https://fewd-todolist-api.onrender.com/tasks/4341?api_key=282")
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

        const parsedExpenseData = JSON.parse(data.task.content);

        setExpenses(parsedExpenseData);
      });
  };

  useEffect(() => {
    retrieveExpenses();
  }, []);

  const onEditExpenseHanlder = () => {
    setEditExpenses(true);
  };

  const onStopEditHandler = () => {
    setEditExpenses(false);
  };

  const addExpense = (e) => {
    let newExpensesState = [];
    let existingExpenses = [];
    const existing = () => {
      existingExpenses = expenses.map((i) => {
        return i;
      });
    };

    if (Array.isArray(expenses) !== false) {
      existing();
      newExpensesState = [e, ...existingExpenses];
    } else {
      newExpensesState = [e];
    }

    fetch(`https://fewd-todolist-api.onrender.com/tasks/4341?api_key=282`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: {
          content: JSON.stringify(newExpensesState),
        },
      }),
    });

    retrieveExpenses();
    onStopEditHandler();
  };

  const deleteButtonHandler = (id) => {
    const updatedList = expenses.filter((e) => e.id !== id);
    fetch(`https://fewd-todolist-api.onrender.com/tasks/4341?api_key=282`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: {
          content: JSON.stringify(updatedList),
        },
      }),
    });
    retrieveExpenses();
  };

  let expenseSum = expenses.reduce(function (prev, current) {
    return prev + +current.expenseAmount;
  }, 0);

  props.expensesList(expenses);
  props.expenseTotal(expenseSum);

  console.log(expenses);

  return (
    <div className="expense">
      {!editExpenses && (
        <button onClick={onEditExpenseHanlder}>
          <span>ADD EXPENSES</span>
        </button>
      )}

      <div className="expenseList">
        {!editExpenses &&
          expenses.map((expense) => (
            <ExpenseList
              key={expense.id}
              type={expense.type}
              expenseAmount={expense.expenseAmount}
              date={expense.date}
              note={expense.note}
              currency={props.currency}
              bttn={
                <img
                  src={del}
                  type="button"
                  onClick={() => deleteButtonHandler(expense.id)}
                  className="icons"
                />
              }
            />
          ))}
      </div>

      {editExpenses && (
        <ExpenseForm value={expenses} onExpenseInfoInput={addExpense} />
      )}

      {editExpenses && (
        <button onClick={onStopEditHandler} type="button">
          <span>Cancel</span>
        </button>
      )}
    </div>
  );
};

export default Expense;
