import "bootstrap/dist/css/bootstrap.css";

const IncomeList = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-start">
          <p>
            {props.description}: {props.currency}
            {props.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            {props.bttn}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncomeList;
