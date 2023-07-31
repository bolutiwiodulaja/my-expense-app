import Income from "../NewIncome/Income";
import Title from "./Title";
import "bootstrap/dist/css/bootstrap.css";
import "./Header.css";

const Header = (props) => {
  const expense = props.totalExpenseCost;

  console.log(expense);
  return (
    <div className="container-fluid totalIncomeContainer">
      <div className="row">
        <div className="mainHeader">
          <div className="col-6">
            <Title className="title" userName={props.userName} />
            <Income expenseTotal={expense} currency={props.currency} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
