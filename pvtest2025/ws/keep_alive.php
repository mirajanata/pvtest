<?php

//header('P3P:CP="IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT"');
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