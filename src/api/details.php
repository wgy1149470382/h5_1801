<?php

    require("connect.php");

    $id = isset($_GET['id']) ? $_GET['id'] : 1;

    $sql = "select * from good where id=$id";
    $data = $conn->query($sql);

    $res = $data->fetch_all(MYSQLI_ASSOC);

    
    echo json_encode($res,JSON_UNESCAPED_UNICODE)
?>