<?php
    include 'db_connection.php';
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $maMh = $_REQUEST["maMh"];
        $tenMh = $_REQUEST["tenMh"];
        $tinChi = $_REQUEST["tinChi"];
        $sql_query= "insert into t_monhoc values('".$maMh."','".$tenMh."',".$tinChi.")";
        $a = array();
        $sql_check = "SELECT * FROM t_monhoc WHERE maMonHoc = '".$maMh."'";
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