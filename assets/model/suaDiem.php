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
        $sql_query= "update t_diem set diemCC =".$diemCC.",diemGK=".$diemGK.",diemCK=".$diemCK." where maSVLop=".$maSVLop;
        $a = array();
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