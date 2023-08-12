import BudgetForm from "./BudgetForm";
import BudgetList from "./BudgetList";
import React, { useState, useEffect } from "react";

const Budget = (props) => {
  const [food, setFood] = useState([]);
  const [home, setHome] = useState([]);
  const [utility, setUtility] = useState([]);
  const [living, setLiving] = useState([]);
  const [pet, setPet] = useState([]);
  const [internet, setInternet] = useState([]);
  const [subscription, setSubscription] = useState([]);
  const [medical, setMedical] = useState([]);
  const [savings, setSavings] = useState([]);
  const [investing, setInvesting] = useState([]);
  const [charity, setCharity] = useState([]);
  const [fun, setFun] = useState([]);
  const [other, setOther] = useState([]);

  const expensesList = props.expensesList;

  const budgets = [
    food,
    home,
    utility,
    living,
    pet,
    internet,
    subscription,
    medical,
    savings,
    investing,
    charity,
    fun,
    other,
  ];

  const budgetsList = [];

  const addBudget = (e) => {
    if (e.type === "food & drink") {
      setFood(e);
    } else if (e.type === "home") {
      setHome(e);
    } else if (e.type === "utility") {
      setUtility(e);
    } else if (e.type === "living essentials") {
      setLiving(e);
    } else if (e.type === "pet cost") {
      setPet(e);
    } else if (e.type === "internet") {
      setInternet(e);
    } else if (e.type === "subscription") {
      setSubscription(e);
    } else if (e.type === "medical/dental") {
      setMedical(e);
    } else if (e.type === "savings") {
      setSavings(e);
    } else if (e.type === "investing") {
      setInvesting(e);
    } else if (e.type === "charity") {
      setCharity(e);
    } else if (e.type === "fun") {
      setFun(e);
    } else if (e.type === "other") {
      setOther(e);
    }
  };

  budgets.map((budget) => {
    if (budget.length !== 0) {
      budgetsList.push(budget);
    }
  });

  for (let i = 0; i < expensesList.length; i++) {
    if (food.type === expensesList[i].type) {
      useEffect(() => {
        setFood((foodValue) => ({
          ...foodValue,
          budgetAmount: food.budgetAmount - expensesList[i].expenseAmount,
        }));
      }, []);
    } /*else if (home.type === list.type) {
      setHome.budgetAmount(home.budgetAmount - list.expenseAmount);
    } else if (utility.type === list.type) {
      setUtility.budgetAmount(utility.budgetAmount - list.expenseAmount);
    } else if (living.type === list.type) {
      setLiving.budgetAmount(living.budgetAmount - list.expenseAmount);
    } else if (pet.type === list.type) {
      setPet.budgetAmount(pet.budgetAmount - list.expenseAmount);
    } else if (internet.type === list.type) {
      setInternet.budgetAmount(internet.budgetAmount - list.expenseAmount);
    } else if (subscription.type === list.type) {
      setSubscription.budgetAmount(
        subscription.budgetAmount - list.expenseAmount
      );
    } else if (medical.type === list.type) {
      setMedical.budgetAmount(medical.budgetAmount - list.expenseAmount);
    } else if (savings.type === list.type) {
      setSavings.budgetAmount(savings.budgetAmount - list.expenseAmount);
    } else if (investing.type === list.type) {
      setInvesting.budgetAmount(investing.budgetAmount - list.expenseAmount);
    } else if (charity.type === list.type) {
      setCharity.budgetAmount(charity.budgetAmount - list.expenseAmount);
    } else if (fun.type === list.type) {
      setFun.budgetAmount(fun.budgetAmount - list.expenseAmount);
    } else if (other.type === list.type) {
      setOther.budgetAmount(other.budgetAmount - list.expenseAmount);
    }*/
  }

  /*econst [budgets, setBudgets] = useState([0]);
  const expensesList = props.expensesList;
  const addBudget = (e) => {
    setBudgets((existingBudgets) => {
      console.log(existingBudgets);
      for (let i = 0; i < existingBudgets.length; i++)
        if (e.type === existingBudgets[i].type) {
          return [...existingBudgets];
        } else {
          return [e, ...existingBudgets];
        }
    });
  };

  for (let i = 0; i < expensesList.length; i++) {
    for (let j = 0; j < budgets.length; j++) {
      if (budgets[j].type === expensesList[i].type) {
        setBudgets[j].budgetAmount =
          budget[j].budgetAmount - expensesList[i].expenseAmount;
      } else if (home.type === list.type) {
        setHome.budgetAmount(home.budgetAmount - list.expenseAmount);
      } else if (utility.type === list.type) {
        setUtility.budgetAmount(utility.budgetAmount - list.expenseAmount);
      } else if (living.type === list.type) {
        setLiving.budgetAmount(living.budgetAmount - list.expenseAmount);
      } else if (pet.type === list.type) {
        setPet.budgetAmount(pet.budgetAmount - list.expenseAmount);
      } else if (internet.type === list.type) {
        setInternet.budgetAmount(internet.budgetAmount - list.expenseAmount);
      } else if (subscription.type === list.type) {
        setSubscription.budgetAmount(
          subscription.budgetAmount - list.expenseAmount
        );
      } else if (medical.type === list.type) {
        setMedical.budgetAmount(medical.budgetAmount - list.expenseAmount);
      } else if (savings.type === list.type) {
        setSavings.budgetAmount(savings.budgetAmount - list.expenseAmount);
      } else if (investing.type === list.type) {
        setInvesting.budgetAmount(investing.budgetAmount - list.expenseAmount);
      } else if (charity.type === list.type) {
        setCharity.budgetAmount(charity.budgetAmount - list.expenseAmount);
      } else if (fun.type === list.type) {
        setFun.budgetAmount(fun.budgetAmount - list.expenseAmount);
      } else if (other.type === list.type) {
        setOther.budgetAmount(other.budgetAmount - list.expenseAmount);
      }
    }
  }*/

  return (
    <div>
      <BudgetForm onBudgetInfoInput={addBudget} expensesList={expensesList} />
      {budgetsList &&
        budgetsList.map((budget) => (
          <BudgetList
            key={budget.id}
            type={budget.type}
            currency={props.currency}
            amount={budget.budgetAmount}
          />
        ))}
    </div>
  );
};

export default Budget;
