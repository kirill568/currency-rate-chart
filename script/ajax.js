let currency = ["USD", "EUR", "CNY", "JPY"];
let month = 5;

/*
Функция делает запрос на получение данных о валюте за определенный месяц
*/
function executeRequest(currency, month) {
	currency.map( function (currentCurrency) {
		$.ajax({
		  method: "POST",
		  url: "http://currency-rate-chart.ru/php/getRateCurrency.php",
		  data: { name: currentCurrency, month: month }
		})
		  .done(function( msg ) {
		    let data = JSON.parse(msg);
		    buildChart(data, currentCurrency);
		  })}
		);
}

executeRequest(currency, month)