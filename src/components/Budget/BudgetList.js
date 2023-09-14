import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const BudgetList = (props) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-end">
            <p>
              {props.type}: {props.currency}
              {props.amount}
              {props.bttn}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetList;
