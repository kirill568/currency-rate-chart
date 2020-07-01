let currency = ["USD", "EUR", "CNY", "JPY"];
let month = 5;

function executeRequest(currency, month) {
	for (let i = 0; i < currency.length; i++) {
		$.ajax({
		  method: "POST",
		  url: "http://currency-rate-chart.ru/getRateCurrency.php",
		  data: { name: currency[i], month: month }
		})
		  .done(function( msg ) {
		    let data = JSON.parse(msg);
		    buildChart(data, currency[i]);
		  });
	}
}

executeRequest(currency, month)