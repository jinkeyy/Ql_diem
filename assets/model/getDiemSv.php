<?php
    include 'db_connection.php';
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $sql_query = "SELECT * FROM `t_danhsachsinhvienlop` INNER JOIN t_sinhvien ON t_sinhvien.idSinhVien = t_danhsachsinhvienlop.maSinhVien INNER JOIN t_lop On t_lop.idLop= t_danhsachsinhvienlop.maLop INNER JOIN t_diem on t_diem.maSVLop=t_danhsachsinhvienlop.idSVLop";
        $result = mysqli_query($connect,$sql_query);
        $data = array();
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
            array_push($data,array("notification" => "Không có bản ghi nào" ));
            echo json_encode($data,JSON_UNESCAPED_UNICODE);
        }
    }

?>