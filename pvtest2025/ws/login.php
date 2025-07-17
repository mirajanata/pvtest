<?php
header('Content-Type: application/json; charset=utf-8');
// Start the session
session_start();
$user = isset($_POST["user"])?$_POST["user"]:null;
$pwd = isset($_POST["password"])?$_POST["password"]:null;
if (($user=="alfa" && $pwd=="beta")) {
	$_SESSION["user"] = $user = "alfa";
	$result=Array(
    "user" => $user,
    "status" => "ok"
	);	
} else {
	http_response_code(400);
	$result=Array(
    "status" => "Invalid login, user [".$user."]."
	);
}

echo json_encode($result);
?>
