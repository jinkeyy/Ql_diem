<?php
    include 'db_connection.php';
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $idSVLop = $_REQUEST["idSVLop"];
        $sql_query= "DELETE FROM t_danhsachsinhvienlop WHERE idSVLop = ".$idSVLop;
        $sql_check = "SELECT * FROM t_diem  WHERE maSVLop = ".$idSVLop;
        $check = mysqli_query($connect,$sql_check);
        $a = array();
        if(mysqli_num_rows($check) > 0){
            array_push($a,array("notification" => "false"));
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