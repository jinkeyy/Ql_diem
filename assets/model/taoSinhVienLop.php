<?php
    include 'db_connection.php';
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $maLop = $_REQUEST["maLop"];
        $maSinhVien = $_REQUEST["maSinhVien"];
        $maMonHoc = $_REQUEST["maMonHoc"];
        $sql_query= "insert into t_danhsachsinhvienlop(maLop,maSinhVien) values(".$maLop.",".$maSinhVien.")";
        $a = array();
        $sql_check = "SELECT * FROM t_danhsachsinhvienlop INNER JOIN t_lop ON t_lop.idLop = t_danhsachsinhvienlop.maLop WHERE maLop = ".$maLop." AND maSinhVien = ".$maSinhVien." OR maSinhVien =".$maSinhVien." AND maMonHoc ='".$maMonHoc."'";
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