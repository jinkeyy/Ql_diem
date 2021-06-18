<?php
    include 'db_connection.php';
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $maLop = $_REQUEST["maLop"];
        $maMh = $_REQUEST["maMh"];
        $maHk = $_REQUEST["maHk"];
        $tenGv = $_REQUEST["tenGv"];
        $sql_query= "insert into t_lop values('".$maLop."','".$maMh."','".$tenGv."',".$maHk.")";
        $a = array();
        $sql_check = "SELECT * FROM t_lop WHERE idLop = '".$maLop."'";
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