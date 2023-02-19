import React, {useState} from 'react';
import './App.css';


import MonthYearPicker from 'react-month-year-picker';

function MonthPicker(props) {
const Months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let date = props.date;

const [visible,updateVisible] = React.useState(false);

function showFun () {
  updateVisible(true);
}

function pickedYear (year) {
  updateVisible(false);
  props.yearFun(year);
}

function pickedMonth (month) {
  updateVisible(false);
  props.monthFun(month);
}

if (visible) {
return (
      <div id="monthDiv">
        <MonthYearPicker
          caption=""
          selectedMonth={date.month}
          selectedYear={date.year}
          minYear={2000}
          maxYear={2022}
          onChangeYear = {pickedYear}
          onChangeMonth = {pickedMonth}
        />
      </div> );
  } else {
    return (
      <button id = "MP" onClick={showFun}>
        {Months[date.month - 1]+" "+date.year} </button>
      
    )
  }
}

export default MonthPicker;