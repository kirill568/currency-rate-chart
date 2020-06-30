<?

$currencyName = 'JPY';
$month = 5;
$baseUrl = "https://www.cbr-xml-daily.ru/archive/2020/%02d/%02d/daily_json.js";

set_error_handler(function ($errno, $errstr, $errfile, $errline) {
	if ($errno = E_USER_WARNING) {
		echo "<b>USER WARNING</b> [$errno] $errstr<br />\n";
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
		if (!is_null($value)) {
			$currencyMonth[$array["Date"]] = $value;
		}
	}
	save($name, $month, json_encode($currencyMonth));
	return $currencyMonth;
}

print_r(getCurrencyByMonth($currencyName, $month, $baseUrl));
