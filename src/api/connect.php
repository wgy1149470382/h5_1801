<?php
    // 连接数据库
    $servername = "localhost";
    $username = "root";
    $passworn = "";
    $dbame = "goods";

    //创建连接
    $conn = new mysqli($servername,$username,$passworn,$dbame);

    //查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');

?>