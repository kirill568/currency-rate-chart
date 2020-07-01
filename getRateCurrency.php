<?

$currencyName = $_POST['name'];
$month = $_POST['month'];
$baseUrl = "https://www.cbr-xml-daily.ru/archive/2020/%02d/%02d/daily_json.js";

set_error_handler(function ($errno, $errstr, $errfile, $errline) {
	if ($errno = E_USER_WARNING) {
		
	}
	return true;
});

function save($name, $month, $currencyRateRange) {
	$conn = new PDO('mysql:host=localhost;dbname=currency_rate;charset=utf8', 'root', '');
    $insert = $conn->prepare('INSERT INTO currency (name, month, rate) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE name=?, month=?, rate=?');
	$insert->execute(array(
	    $name,
	    $month,
	    $currencyRateRange,
	    $name,
	    $month,
	    $currencyRateRange
	));
}

function getCurrencyByMonth($name, $month, $baseUrl) {
	$currencyMonth = array();
	for ($i = 1; $i <= 31; $i++) {
		$currencyDay = file_get_contents(sprintf($baseUrl, $month, $i));
		$array = json_decode($currencyDay, true);
		$value = $array["Valute"][$name]["Value"];
		$date = substr($array["Date"], 0, 10);
		if (!is_null($value)) {
			$currencyMonth[$date] = $value;
		}
	}
	save($name, $month, json_encode($currencyMonth));
	return $currencyMonth;
}

$data = getCurrencyByMonth($currencyName, $month, $baseUrl);

echo json_encode($data);
