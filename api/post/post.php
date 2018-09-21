<?php

require_once("../db/dbc.php");

$db=DatabaseConnection::getSingleTonInstance();

if($_SERVER["REQUEST_METHOD"] == "GET"){
if(isset($_GET['countryCode']))
$Ccode=$_GET['countryCode'];
$q="SELECT * FROM travel.comments where countryCode='$Ccode'";
 $res=$db->select($q);

 if(count($res)>0)
 
    echo json_encode($res);
 

}
else{
  if(isset($_POST["countryCode"])&&isset($_POST["comment"])){
     session_start();
     $countryCode=$_POST["countryCode"];
     $comment=$_POST["comment"];
     $userId=$_SESSION['user']->id;
    
     $q="INSERT INTO comments (`user_id`, `comment`, `countryCode`) VALUES (?,?, ?)";
     $stmt = $db->Prepare($q);
     $stmt->bind_param("iss",$userId,$comment,$countryCode);
     $stmt->execute();
     return $stmt->insert_id;

    }
}






?>