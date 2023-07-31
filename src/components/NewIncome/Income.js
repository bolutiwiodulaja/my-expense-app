import React, { useState } from "react";
import IncomeForm from "./IncomeForm";
import IncomeList from "./IncomeList";
import "bootstrap/dist/css/bootstrap.css";
import "./Income.css";
import del from "../Img/del-Freepik.png";
import edit from "../Img/IncomeImg/edit.png";

const Income = (props) => {
  const [incomes, setIncomes] = useState([]);
  const [editIncome, setEditIncome] = useState(false);
  const [incomeList, setIncomeList] = useState(false);
  const [entryIncluded, setEntryIncluded] = useState(false);

  const addIncome = (e) => {
    setIncomes((existingIncomes) => {
      return [e, ...existingIncomes];
    });
    if (incomes.length > 0) {
      setEntryIncluded(true);
    }
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
    const updatedList = incomes.filter((e) => e.id !== id);
    setIncomes(updatedList);
  };

  let sum = incomes.reduce(function (prev, current) {
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
          <img
            className="icons"
            onClick={incomeListHandler}
            src={edit}
            alt="edit"
          />
        )}
      </div>
      {incomeList && !entryIncluded && <p>You have not included any income</p>}
      <div className="incomeList">
        {incomeList &&
          entryIncluded &&
          incomes.map((income) => (
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

      {incomeList && (
        <div className="minimizeButton">
          {
            <button onClick={stopIncomeListHandler} type="button">
              <span>^</span>
            </button>
          }
        </div>
      )}
    </div>
  );
};

export default Income;
