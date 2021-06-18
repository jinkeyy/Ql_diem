<?php
    include 'db_connection.php';
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $key = "1";
        if(isset($_REQUEST["key"])){
            $key= "idSinhVien = ".$_REQUEST["key"];
            if($_REQUEST["key"]=="1"){
                $key="1";
            }
        }
        $sql_query = "SELECT * FROM t_sinhvien WHERE ".$key;
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