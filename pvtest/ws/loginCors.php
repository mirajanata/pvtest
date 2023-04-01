<?php
include_once("/var/www/web237/files/editor_privates.php");
include_once("lib_sql.php");
header('Content-Type: application/json; charset=utf-8');
cors_headers();

$user = isset($_POST["user"])?$_POST["user"]:null;
$pwd = isset($_POST["password"])?$_POST["password"]:null;
if (($user==$app_user && $pwd==$app_pwd)) {
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
