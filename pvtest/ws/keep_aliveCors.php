<?php
include_once("lib_sql.php");
header('Content-Type: application/json; charset=utf-8');
cors_headers();

if (!isset($_SERVER['PHP_AUTH_USER'])) {
	$result=Array("status" => "Not logged in.");
} else {
	$user = $_SERVER['PHP_AUTH_USER'];
	$result=Array("status" => "ok", "user" => $user);
}
echo json_encode($result);

?>