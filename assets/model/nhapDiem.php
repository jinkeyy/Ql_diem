<?php
    include 'db_connection.php';
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $maSVLop = $_REQUEST["maSVLop"]; 
        $diemCC = $_REQUEST["diemCC"];
        $diemGK = $_REQUEST["diemGK"];
        $diemCK = $_REQUEST["diemCK"];
        if($diemCC==""){
            $diemCC="NULL";
        }
        if($diemGK==""){
            $diemGK="NULL";
        }
        if($diemCK==""){
            $diemCK="NULL";
        }
        $sql_query= "insert into t_diem(maSVLop,diemCC,diemGK,diemCK) values('".$maSVLop."',".$diemCC.",".$diemGK.",".$diemCK.")";
        $a = array();
        $sql_check = "SELECT * FROM t_diem WHERE maSVLop = ".$maSVLop;
        $check = mysqli_query($connect,$sql_check);
            if(mysqli_num_rows($check) > 0){
                array_push($a,array("notification" => "trung"));
                echo json_encode($a,JSON_UNESCAPED_UNICODE);
            }else{
                try {
                    mysqli_query($connect,$sql_query);
                    array_push($a,array("notification" => "true"));
                    echo json_encode($a,JSON_UNESCAPED_UNICODE);
                  }
                catch (Exception $e) {
                    array_push($a,array("notification" => "false"));
                    echo json_encode($a,JSON_UNESCAPED_UNICODE);
                }
            }
    }