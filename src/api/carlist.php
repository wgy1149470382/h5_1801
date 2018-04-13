<?php
    //购物车生成
    require('connect.php');

    // $id = isset($_GET['id']) ? $_GET['id'] : null;

    $sql = "select * from car";

    $data = $conn->query($sql);

    $res = $data->fetch_all(MYSQLI_ASSOC);

    echo JSON_encode($res,JSON_UNESCAPED_UNICODE);

?>