import React, { useState } from "react";

const BudgetList = (props) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between">
            <p>
              {props.type}: {props.currency}
              {props.amount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetList;
