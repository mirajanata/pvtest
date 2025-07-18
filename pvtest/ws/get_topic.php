<?php

include_once("lib_sql.php");
header('Content-Type: application/json; charset=utf-8');

$old_error_handler = set_error_handler("errorHandler");

$status="ok";
$user = null;
if (isset($_SESSION["user"])) {
	$user = isset($_SESSION["user"])?$_SESSION["user"]:null;

	$uri = isset($_POST["uri"])?$_POST["uri"]:null;
	$attribute = isset($_POST["attribute"])?$_POST["attribute"]:null;
	$oldValue = isset($_POST["oldValue"])?$_POST["oldValue"]:null;
	$language = isset($_POST["language"])?$_POST["language"]:null;
	$index = isset($_POST["index"])?$_POST["index"]:null;


	sqlConnect();

	
	toSQLString($user);
	toSQLString($uri);
	toSQLString($attribute);
	toSQLString($oldValue);
	toSQLString($language);
	toSQLInt($index);

	$q = "SELECT NEW_VALUE,CREATED_USER FROM UpdateTickets WHERE STATUS='Open' AND URI={$uri} AND PROPERTY={$attribute}";
	$q .= $language!="NULL" && $language!="" ? " AND LANGUAGE={$language}":" AND LANGUAGE IS NULL"; 
	$q .= $index!="NULL" ? " AND IDX={$index}":" AND IDX IS NULL"; 
	$q .= " ORDER BY ID DESC LIMIT 1";
	$result=Array("result" => sqlRow($q, MYSQLI_ASSOC));
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
