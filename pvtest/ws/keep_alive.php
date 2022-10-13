<?php
session_name("pvedit");
session_start();
header('Content-Type: application/json; charset=utf-8');


if (isset($_SESSION["user"])) {
	$user = $_SESSION["user"];
	$result=Array("status" => "ok", "user" => $user);
} else {
	$result=Array("status" => "Not logged in.");
}
echo json_encode($result);

?>