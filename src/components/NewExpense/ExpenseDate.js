import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ExpenseFormElements.css";
import "bootstrap/dist/css/bootstrap.css";
import "./ExpenseDate.css";
import React, { useState } from "react";

const ExpenseDate = (props) => {
  const [date, setDate] = useState(new Date());
  props.dateValue(date);
  const datePickerHandler = (date) => {
    setDate(date);
  };
  return (
    <div className="col-8 offset-2">
      <div className="customDatePickerWidth">
        <DatePicker
          selected={date}
          onChange={datePickerHandler}
          className="selectField inputField w-100"
          dateFormat="dd-MMM-yyyy"
          showYearDropdown
          scrollableMonthYearDropdown
        />
      </div>
    </div>
  );
};

export default ExpenseDate;
