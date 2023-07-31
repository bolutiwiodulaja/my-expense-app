import "./ExpenseList.css";
import "bootstrap/dist/css/bootstrap.css";
import food from "../Img/ExpenseImg/food&drink-Smashicons.png";
import home from "../Img/ExpenseImg/home-Freepik.png";
import utilities from "../Img/ExpenseImg/utilities-Freepik.png";
import livingessentials from "../Img/ExpenseImg/livingessentials-Design Circle.png";
import loan from "../Img/ExpenseImg/loan-Freepik.png";
import pet from "../Img/ExpenseImg/pet-Freepik.png";
import subscription from "../Img/ExpenseImg/subscription-Flat Icons.png";
import medical from "../Img/ExpenseImg/medical-dental-Freepik.png";
import savings from "../Img/ExpenseImg/savings-Freepik.png";
import investing from "../Img/ExpenseImg/investing-surang.png";
import charity from "../Img/ExpenseImg/charity-DinosoftLabs.png";
import fun from "../Img/ExpenseImg/fun-Freepik.png";
import travel from "../Img/ExpenseImg/travel-Icongeek26.png";
import other from "../Img/ExpenseImg/other-Aldo Cervantes.png";

const ExpenseList = (props) => {
  let expenseImg;
  let type = props.type;

  if (type === "food & drink") {
    expenseImg = (
      <img className="expenseImg" src={food} alt="food icon by Smashicons" />
    );
  } else if (type === "home") {
    expenseImg = (
      <img className="expenseImg" src={home} alt="house icon by Freepik" />
    );
  } else if (type === "utility") {
    expenseImg = (
      <img className="expenseImg" src={utilities} alt="bulb icon by Freepik" />
    );
  } else if (type === "living essentials") {
    expenseImg = (
      <img
        className="expenseImg"
        src={livingessentials}
        alt="toiletpaper icon by Design Circle"
      />
    );
  } else if (type === "loan payment") {
    expenseImg = (
      <img className="expenseImg" src={loan} alt="loan icon by Freepik" />
    );
  } else if (type === "pet cost") {
    expenseImg = (
      <img className="expenseImg" src={pet} alt="pet icon by Freepik" />
    );
  } else if (type === "subscription") {
    expenseImg = (
      <img
        className="expenseImg"
        src={subscription}
        alt="subscription icon by Flat Icons"
      />
    );
  } else if (type === "medical/dental") {
    expenseImg = (
      <img className="expenseImg" src={medical} alt="medical icon by Freepik" />
    );
  } else if (type === "savings") {
    expenseImg = (
      <img
        className="expenseImg"
        src={savings}
        alt="piggy bank icon by Freepik"
      />
    );
  } else if (type === "investing") {
    expenseImg = (
      <img
        className="expenseImg"
        src={investing}
        alt="investing icon by surang"
      />
    );
  } else if (type === "charity") {
    expenseImg = (
      <img
        className="expenseImg"
        src={charity}
        alt="charity icon by DinosoftLabs"
      />
    );
  } else if (type === "charity") {
    expenseImg = (
      <img className="travel" src={travel} alt="travel icon by Icongeek26" />
    );
  } else if (type === "fun") {
    expenseImg = (
      <img
        className="expenseImg"
        src={fun}
        alt="people dancing bank icon by Freepik"
      />
    );
  } else if (type === "other") {
    expenseImg = (
      <img
        className="expenseImg"
        src={other}
        alt="more icon by Aldo Cervantes"
      />
    );
  }

  return (
    <div className="container">
      <div className="row">
        <p className="d-flex justify-content-between offset-1 col-10">
          <div expense>
            {expenseImg} {props.type}
          </div>

          <div className="expenseCosts">
            {props.currency}
            {props.expenseAmount
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {props.bttn}
          </div>
        </p>
      </div>
      <div className="row">
        <p className="d-flex offset-1 col-10 date-note">
          {props.date}: {props.note}
        </p>
      </div>
    </div>
  );
};

export default ExpenseList;
