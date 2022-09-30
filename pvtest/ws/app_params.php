<?php

//header('P3P:CP="IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT"');
session_start();

//content
$host=$_SERVER["HTTP_HOST"];
$mysql_server = "localhost";
$appTitle="Topic Manager";

if($host=="localhost"){
    $mysql_user = "root";
    $mysql_pwd = "root";
    $mysql_db = "pvtest";
}
else {
    $mysql_user = "extern_user";
    $mysql_pwd = "extern_pwd";
    $mysql_db = "extern_db";
}

function param($name) {
    return isset($_REQUEST[$name]) ? $_REQUEST[$name] : null;
}
function sparam($name) {
    $r= isset($_REQUEST[$name]) ? $_REQUEST[$name] : null;
    if ($r==null) $r=$_SESSION[$name];
    else $_SESSION[$name]=$r;
    return $r;
}
function sql_param($name) {
    $a= isset($_REQUEST[$name]) ? $_REQUEST[$name] : null;
    if ($a!=null) {
        $a=str_replace("'", "''", $a);
    }
    return $a;
}
function startsWith($haystack, $needle)
{
    return !strncmp($haystack, $needle, strlen($needle));
}

function endsWith($haystack, $needle)
{
    $length = strlen($needle);
    if ($length == 0) {
        return true;
    }

    return (substr($haystack, -$length) === $needle);
}
?>