import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import React, { useState, useEffect } from "react";
import "./Expense.css";
import del from "../Img/del-Freepik.png";
const Expense = (props) => {
  const [retrievedData, setRetrievedData] = useState([]);
  const [editExpenses, setEditExpenses] = useState(false);
  let expenses = [];

  const userKey = props.userKey;

  const expenseHandler = () => {
    retrievedData.map((i) => {
      if (i.content.includes("exp")) {
        console.log(JSON.parse(i.content));
        return expenses.push(i);
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

  expenseHandler();

  const onEditExpenseHanlder = () => {
    setEditExpenses(true);
  };

  const onStopEditHandler = () => {
    setEditExpenses(false);
  };

  const addExpense = (e) => {
    let newExpensesState = [e];

    fetch(`https://fewd-todolist-api.onrender.com/tasks?api_key=${userKey}`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: {
          content: newExpensesState.map((i) => JSON.stringify(i)).join("<=>"),
        },
      }),
    }).then(retrieveData);

    onStopEditHandler();
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

  const parsedExpenses = expenses.map((i) => {
    return JSON.parse(i.content);
  });

  useEffect(() => {
    if (expenses) {
      props.expensesList(parsedExpenses);
    }
  }, [retrievedData]);

  let expenseSum = parsedExpenses.reduce(function (prev, current) {
    return prev + +current.expenseAmount;
  }, 0);

  const logUserOut = () => {
    props.logout(false);
  };

  props.expenseTotal(expenseSum);

  return (
    <div className="expense">
      {!editExpenses && (
        <button onClick={onEditExpenseHanlder}>
          <span>ADD EXPENSES</span>
        </button>
      )}

      <div className="expenseList">
        {!editExpenses &&
          expenses &&
          expenses.map((expense) => (
            <ExpenseList
              key={expense.id}
              type={JSON.parse(expense.content).type}
              expenseAmount={JSON.parse(expense.content).expenseAmount}
              date={JSON.parse(expense.content).date}
              note={JSON.parse(expense.content).note}
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
      <button
        onClick={logUserOut}
        class="position-absolute bottom-0 start-50 translate-middle-x"
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Expense;
