import React from 'react';
import './App.css';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import MonthPicker from './MonthPicker';
import {sendPostRequest} from './AJAX.jsx'

function App() {
  const [visible, setVisible] = React.useState(false);
  const [date, setDate] = React.useState({month: 4, year: 2022 });

  function yearChange(newYear) {
      let m = date.month;
      setDate({year: newYear, month: m });
    }

  function monthChange(newMonth){
      let y = date.year;
      setDate({month: newMonth, year: y});
    }

  
  return (
    <main>
      <div className= "Header">Water Storage in California Reservoirs</div>

        <div className= "Data" id="data1">
        <div className="flex-container">
        <div className="container" id="mainText">
          <p className ="text">
              California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. </p>
          <p className ="text">
        California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
            </p>
          <button onClick={() => setVisible(!visible)}>{visible ? 'Show Less' : 'Show More'}
      </button>
          
        </div>
      <div className="container" id="illustration">
        <img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg
        "/>     
        <caption>Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.</caption>
        </div>
      </div>
    </div>
      
<div className= "Data" id="data2">
      <div style={{display: visible ? 'block' : 'none'}}> 
        <div className="flex-container2">
         <div className= "chart flex-child">
           <div className="ChartHolder">
            <ChartDataFun date={date} setDate={setDate} />
          </div>
        </div>
    <div className="flex-child"> 
      <p className ="text"id= "t2">Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
        </p>
        <div className= "ChangeMonth" id= "t2">
          <h3>Change Month:</h3>
       </div>
        <div className= "MonthPicker" id= "t2">
             <h4><MonthPicker  
              date = {date}
              yearFun = {yearChange}
              monthFun = {monthChange}
              />
             </h4>
         </div>
      </div>
    </div>
        </div>
   </div><br></br>
    
    </main>
  )
}

function LakeChart(props) {
  const nicknames = new Map();
  nicknames.set(0, 'Shasta');
  nicknames.set(1, 'Oroville');
  nicknames.set(2, 'Trinity Lake');
  nicknames.set(3, 'New Melones');
  nicknames.set(4, 'San Luis');
  nicknames.set(5, 'Don Pedro');
  nicknames.set(6, 'Berryessa');
  
  if (props) {
    let n = props.data.length;
    console.log(props.data);

    let storageObj = {label: "Current Storage Level", data: [], backgroundColor: ["#429198"]}
    let capacityObj = {label: "Total Capacity ", data: [], backgroundColor: ["rgb(120,199,227)"]}
    let labels = [];
    for (let i = 0; i< n; i++) {
      storageObj.data.push((props.data[i].storage)/100000);
      capacityObj.data.push((props.data[i].capacity)/100000);
      labels.push(nicknames.get(i));
    }


  let userData = {};
  userData.labels = labels;
  userData.datasets = [storageObj,capacityObj];
  

console.log(userData);
let options = {
  plugins: {
    title: {
      display: false,
      text: '',
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  categoryPercentage: 0.6,
  barPercenatge: 1,
  scales: {
    x: {
      stacked: true
    },
    y: {
      grid: {
        display: false
      }
    }
  }
};

      return (
        <div id="chart-container">
          <Bar options={options} data={userData} />
        </div>
      )
  }
}


function ChartDataFun({date}) {
  const [chartData, setChartData] = React.useState(null);
  
   async function fetchData() {
      console.log("Doing AJAX request")
      let json = await sendPostRequest("/query/getList", {
        month:date.month,
        year:date.year
      });
     setChartData(json)
     
  }
  
  React.useEffect(function () {
  console.log(date);
    
    fetchData();
  }, [date]);

  
    return (
      <main>
        {chartData && <LakeChart data = {chartData}> </LakeChart>}
      </main>
    )

}

export default App;

