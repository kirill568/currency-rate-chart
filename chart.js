
function createElement(id, width, height) {
    const newCanvas = document.createElement("canvas");
    let container = document.querySelector(".container");
    newCanvas.classList.add("chart");
    newCanvas.id = id;
    newCanvas.width = width;
    newCanvas.height = height;
    container.appendChild(newCanvas);
}

function prepareData(data) {
    let dates = [];
    let rates = [];
    for (date in data) {
        dates.push(date);
        rates.push(data[date]);
    }
    return [dates, rates];
}

function buildChart(data, name) { 
    createElement(name, 603, 301);
    let preparedData = prepareData(data);
    var ctx = document.getElementById(name);
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: preparedData[0],
            datasets: [{
                label: name,
                data: preparedData[1],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}