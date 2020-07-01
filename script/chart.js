
/*
Функция создает в DOM элемент canvas
*/
function createElement(id, width, height) {
    const newCanvas = document.createElement("canvas");
    let container = document.querySelector(".container");
    newCanvas.classList.add("chart");
    newCanvas.id = id;
    newCanvas.width = width;
    newCanvas.height = height;
    container.appendChild(newCanvas);
}

/*
Функция подготавливает данные для построения диаграммы
*/
function prepareData(data) {
    let dates = [];
    let rates = [];
    for (date in data) {
        dates.push(date);
        rates.push(data[date]);
    }
    return [dates, rates];
}

/*
Функция строит диаграмму
*/
function buildChart(data, name) { 
    createElement(name, 603, 301);
    let preparedData = prepareData(data);
    var ctx = document.getElementById(name);
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: preparedData[0],
            datasets: [{
                label: name,
                data: preparedData[1],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)'
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