import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import React, { useState } from "react";
import "./Expense.css";
import del from "../Img/del-Freepik.png";
const Expense = (props) => {
  const [editExpenses, setEditExpenses] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const onEditExpenseHanlder = () => {
    setEditExpenses(true);
  };

  const onStopEditHandler = () => {
    setEditExpenses(false);
  };

  const addExpense = (e) => {
    setExpenses((existingExpenses) => {
      return [e, ...existingExpenses];
    });
    onStopEditHandler();
  };

  const deleteButtonHandler = (id) => {
    const updatedList = expenses.filter((e) => e.id !== id);
    setExpenses(updatedList);
  };

  let sum = expenses.reduce(function (prev, current) {
    return prev + +current.expenseAmount;
  }, 0);

  props.expensesList(expenses);
  props.expenseTotal(sum);

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
