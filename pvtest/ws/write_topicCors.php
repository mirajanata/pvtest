<?php

include_once("lib_sql.php");
header('Content-Type: application/json; charset=utf-8');
cors_headers();

$old_error_handler = set_error_handler("errorHandler");

if (isset($_SERVER['PHP_AUTH_USER'])) {
	$user = $_SERVER['PHP_AUTH_USER'];

	$status="ok";

	$uri = isset($_POST["uri"])?$_POST["uri"]:null;
	$attribute = isset($_POST["attribute"])?$_POST["attribute"]:null;
	$newValue = isset($_POST["newValue"])?$_POST["newValue"]:null;
	$oldValue = isset($_POST["oldValue"])?$_POST["oldValue"]:null;
	$language = isset($_POST["language"])?$_POST["language"]:null;
	$index = isset($_POST["index"])?$_POST["index"]:null;


	sqlConnect();

	$err = "";
	if (!(checkNotNull($uri, "uri", $err) && checkNotNull($attribute, "attribute", $err) && checkNotNull($newValue, "newValue", $err))) {
		$result=Array("status" => $err);
		http_response_code(400);
		echo json_encode($result);
		return;
	}

	toSQLString($user);
	toSQLString($uri);
	toSQLString($attribute);
	toSQLString($newValue);
	toSQLString($oldValue);
	toSQLString($language);
	toSQLInt($index);

	sqlExecute("
INSERT INTO UpdateTickets(CREATED_USER,URI,PROPERTY,IDX,OLD_VALUE,NEW_VALUE,LANGUAGE,STATUS) VALUES 
(" . $user . "," . $uri . "," . $attribute . ", " . $index . ", " . $oldValue . ", " . $newValue . ", " . $language . ", 'Open')
");
	$result=Array(
		"status" => "ok"
	);
}
else {
	http_response_code(400);
	$result=Array("status" => "Not logged in.");
}
echo json_encode($result);

function errorHandler($errno, $errstr, $errfile, $errline)
{
	http_response_code(400);
	$result=Array("status" => $errstr);
}

?>
