<?php
    include 'db_connection.php';
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $userSv = $_REQUEST["userSv"];
        $matKhauSv = $_REQUEST["matKhauSv"];
        $sql_check = "SELECT * FROM t_sinhvien WHERE idSinhVien='".$userSv."' And matKhau='".$matKhauSv."'"; 
        $check = mysqli_query($connect,$sql_check);
        $a = array();
        $data = array();
        if(mysqli_num_rows($check) > 0){
            $sql_query = "SELECT * FROM t_sinhvien Where idSinhVien = '".$userSv."'";
            $result = mysqli_query($connect,$sql_query);
            if(mysqli_num_rows($result) > 0){
                while($row = mysqli_fetch_assoc($result)){
                    $temp = array();
                    foreach($row as $key => $value){
                    $temp[$key] = $value;
                    }
                    array_push($data,$temp);
                }
                echo json_encode($data,JSON_UNESCAPED_UNICODE);
            }else{
                array_push($data,array("notification" => "false" ));
                echo json_encode($data,JSON_UNESCAPED_UNICODE);
            }
        }else{
            array_push($a,array("notification" => "false"));
            echo json_encode($a,JSON_UNESCAPED_UNICODE);
        }
    }