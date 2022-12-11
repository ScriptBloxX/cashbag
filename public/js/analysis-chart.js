
// data set
var ns_per_day = [];
var ps_per_day = [];
var ns_per_week = [];
var ps_per_week = [];
var ns_per_month = [];
var ps_per_month = [];
var ns_per_year = [];
var ps_per_year = [];

// ID config
const day = 'analysis_today';
const week = 'analysis_week';
const month = 'analysis_month';
const year = 'analysis_year';

var newDate = new Date();
var today_Date = getDate.getDate() + '/' + parseInt(getDate.getMonth() + 1) + '/' + getDate.getFullYear();

function analysisChart(statements) {
  // day
  var Spending = 0;
  statements.forEach(statement => {
    if (statement.date === today_Date && statement.amount < 0) {
      var spend = statement.amount * -1
      ns_per_day.push(statement.desc);
      ps_per_day.push(spend);
      Spending = Spending + spend;
    }
  });
  document.querySelector('#paid_today').innerHTML = `Spending Today : ${Spending}`;
  // pie chart
  new Chart(`${day}`, {
    type: "pie",
    data: {
      labels: ns_per_day,
      datasets: [{
        label: 'Spending Today',
        data: ps_per_day,
        backgroundColor: [
          '#C3FF99',
          '#E0D98C',
          '#F7A76C',
          '#EC7272'
        ],
        hoverOffset: 10
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false,
        }
      },
      maintainAspectRatio: false,
    }
  });
  document.querySelector(`#${day}`).style.width = "300px";
  document.querySelector(`#${day}`).style.height = "300px";

  // week
  var Spending = 0;
  statements.forEach(statement => {
    const getMonth_Slice = statement.date.substr(statement.date.indexOf('/')+1);
    const getMounth_Result = getMonth_Slice.substring(0,getMonth_Slice.indexOf('/'));
    const sd = statement.date.substring(0,statement.date.indexOf('/'));
    const date_today = newDate.getDate();
    var day = newDate.getDay(),diff = newDate.getDate() - day + (day == 0 ? -6:1);
    
    if(parseInt(getMounth_Result) === parseInt(getDate.getMonth() + 1) && sd >= diff && sd <= date_today && statement.amount < 0){
      console.log(statement);
      var spend = statement.amount * -1
      ns_per_week.push(statement.desc);
      ps_per_week.push(spend);
      Spending = Spending + spend;
    }
  });


  document.querySelector('#paid_week').innerHTML = `Spending Week : ${Spending}`;
  // pie chart
  new Chart(`${week}`, {
    type: "pie",
    data: {
      labels: ns_per_week,
      datasets: [{
        label: 'Spending Week',
        data: ps_per_week,
        backgroundColor: [
          '#F65A83',
          '#FF87B2',
          '#FFE898',
          '#FFF8BC'
        ],
        hoverOffset: 10
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false,
        }
      },
      maintainAspectRatio: false,
    }
  });
  document.querySelector(`#${week}`).style.width = "300px";
  document.querySelector(`#${week}`).style.height = "300px";

  // month
  var Spending = 0;
  statements.forEach(statement => {
    const getMonth_Slice = statement.date.substr(statement.date.indexOf('/')+1);
    const getMounth_Result = getMonth_Slice.substring(0,getMonth_Slice.indexOf('/'));

    if (parseInt(getMounth_Result) === parseInt(getDate.getMonth() + 1) && statement.amount < 0) {
      var spend = statement.amount * -1
      ns_per_month.push(statement.desc);
      ps_per_month.push(spend);
      Spending = Spending + spend;
    }
  });
  document.querySelector('#paid_month').innerHTML = `Spending Month : ${Spending}`;
  // pie chart
  new Chart(`${month}`, {
    type: "pie",
    data: {
      labels: ns_per_month,
      datasets: [{
        label: 'Spending Month',
        data: ps_per_month,
        backgroundColor: [
          '#F7ECDE',
          '#E9DAC1',
          '#9ED2C6',
          '#54BAB9'
        ],
        hoverOffset: 10
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false,
        }
      },
      maintainAspectRatio: false,
    }
  });
  document.querySelector(`#${month}`).style.width = "300px";
  document.querySelector(`#${month}`).style.height = "300px";

  // year
  var Spending = 0;
  statements.forEach(statement => {
    const year_reverse = statement.date.split('').reverse().join('');
    const getYear = year_reverse.substring(0, year_reverse.indexOf('/')).split('').reverse().join('');

    if (parseInt(getYear) === parseInt(getDate.getFullYear()) && statement.amount < 0) {
      var spend = statement.amount * -1
      ns_per_year.push(statement.desc);
      ps_per_year.push(spend);
      Spending = Spending + spend;
    }
  });

  document.querySelector('#paid_year').innerHTML = `Spending Year : ${Spending}`;
  // pie chart
  new Chart(`${year}`, {
    type: "pie",
    data: {
      labels: ns_per_year,
      datasets: [{
        label: 'Spending Year',
        data: ps_per_year,
        backgroundColor: [
          '#F7ECDE',
          '#E9DAC1',
          '#9ED2C6',
          '#54BAB9'
        ],
        hoverOffset: 10
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false,
        }
      },
      maintainAspectRatio: false,
    }
  });
  document.querySelector(`#${year}`).style.width = "300px";
  document.querySelector(`#${year}`).style.height = "300px";
}
