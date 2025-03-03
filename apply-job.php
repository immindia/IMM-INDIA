<?php
// Add CORS headers to allow cross-origin requests
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'dbcon.php';
@extract($_POST);

$time=  time();
if($_FILES['img']['name']!='') 
    {
        $ext = substr($_FILES['img']['name'], strrpos($_FILES['img']['name'], '.') + 1);
        $img_path="uploads/cv".'/'.time().'.'.$ext;
        move_uploaded_file($_FILES['img']['tmp_name'],$img_path);
    }
$sql="insert into  job_application(job_id,name,phone,email,message,cv_path,time) values (?,?,?,?,?,?,?)";
$stmt = mysqli_prepare($dblink,$sql);
mysqli_stmt_bind_param($stmt,"sssssss",$job_id,$name,$phone,$email,$message,$img_path,$time);
mysqli_stmt_execute($stmt) or die("Mysqli Error".mysqli_stmt_error($stmt));
header("Location:career-detail.php?flag=success");
?> 