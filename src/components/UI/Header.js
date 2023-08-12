import Income from "../NewIncome/Income";
import Title from "./Title";
import Budget from "../Budget/Budget";
import "bootstrap/dist/css/bootstrap.css";
import "./Header.css";

const Header = (props) => {
  const expense = props.totalExpenseCost;

  const expensesList = props.expensesList;

  console.log(expense);
  return (
    <div className="container-fluid totalIncomeContainer">
      <div className="row">
        <div className="mainHeader d-flex">
          <div className="col-6">
            <Title className="title" userName={props.userName} />
            <Income expenseTotal={expense} currency={props.currency} />
          </div>
          <div className="col-6">
            <Budget expensesList={expensesList} currency={props.currency} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
