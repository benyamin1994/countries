<?php
header("Content-Type:application/json");
require_once("../db/dbc.php");

$db=DatabaseConnection::getSingleTonInstance();

if($_SERVER["REQUEST_METHOD"] == "GET"){
   session_start();
   if(isset($_SESSION["user"])){
    echo json_encode($_SESSION["user"]);
   }
   else{
    
    echo "UnAuthorized";
   }
  
}
else{
if(isset($_POST["userName"]) && isset($_POST["password"])){
    $userName=$_POST["userName"];
    $password=$_POST["password"];
$q="SELECT * FROM users WHERE userName='$userName' AND password='$password' ";

    $res=$db->select($q);


    if(count($res)>0){
        session_start();
        $_SESSION['user']=$res[0];
        echo json_encode($res[0]);
    }
    else
    {
         http_response_code(401);
    echo "UnAuthorized";
    }







}




}




?>