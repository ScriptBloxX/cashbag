// data set
var xValues = [];
var yValues = [];

const getDate = new Date();
var date = getDate.getDate();

function xyCal(statements) {
  statements.forEach(statement => {
    if (xValues.length < 7) {
      xValues.push(statement.date + ` (${statement.desc})`);
      yValues.push(statement.current);
    }
  });
  xValues.reverse();
  yValues.reverse();

  // line chart 
  const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
  const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

  new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "#19191d",
        borderColor: "#30CF75",
        data: yValues,
        segment: {
          borderColor: ctx => skipped(ctx, '#30CF75') || down(ctx, '#CF3055'),
          borderDash: ctx => skipped(ctx, [6, 6]),
        },
        spanGaps: true
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      maintainAspectRatio: false
    }
  });

  document.querySelector('#myChart').style.width = "800px";
  document.querySelector('#myChart').style.height = "400px";
}
