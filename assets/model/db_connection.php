<?php
    $username = "root"; // Khai báo username
    $password = "";      // Khai báo password
    $server   = "localhost";   // Khai báo server
    $dbname   = "Ql_diem";      // Khai báo database

    // Kết nối database tintuc
    $connect = mysqli_connect($server, $username, $password, $dbname);
    mysqli_set_charset($connect,"UTF8");
    //Nếu kết nối bị lỗi thì xuất báo lỗi và thoát.


    if (!$connect) {
        die("Không kết nối :" . mysqli_connect_error());
        exit();
    }
?>