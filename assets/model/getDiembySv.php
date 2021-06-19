<?php
    include 'db_connection.php';
    if($_SERVER["REQUEST_METHOD"] == "GET"){
        $maSinhVien = $_REQUEST["maSinhVien"];
        
        if($_REQUEST["maHocKy"]=="all"){
            $maHocKy="";
        }else{
            $maHocKy = "AND maHocKy =".$_REQUEST["maHocKy"];
        }
        $sql_query = "SELECT * FROM t_danhsachsinhvienlop INNER JOIN t_diem On t_danhsachsinhvienlop.idSVLop = t_diem.maSVLop INNER JOIN t_sinhvien On t_danhsachsinhvienlop.maSinhVien = t_sinhvien.idSinhVien INNER JOIN t_lop On t_lop.idLop = t_danhsachsinhvienlop.maLop Where maSinhVien=".$maSinhVien." ".$maHocKy;
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