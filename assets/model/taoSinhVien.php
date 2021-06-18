<?php
    include 'db_connection.php';
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $maSv = $_REQUEST["maSv"];
        $tenSv = $_REQUEST["tenSv"];
        $khoaSv = $_REQUEST["khoaSv"];
        $ngaySinhSv = $_REQUEST["ngaySinhSv"];
        $diaChiSv = $_REQUEST["diaChiSv"];
        $matKhauSv = $_REQUEST["matKhauSv"];
        $sql_query= "insert into t_sinhvien values('".$maSv."','".$tenSv."','".$khoaSv."','".$ngaySinhSv."','".$diaChiSv."','".$matKhauSv."')";
        $a = array();
        $sql_check = "SELECT * FROM t_sinhvien WHERE idSinhVien = '".$maSv."'";
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
