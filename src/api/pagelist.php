<?php

    require('connect.php');

    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 10;

    //分页
    $sql = "select * from good where category='jj'";

    $res = $conn->query($sql);

    $row  = $res->fetch_all(MYSQLI_ASSOC);
    // $row = $result->fetch_assoc();

    $res = array(
        //array_slice — 从数组中取出一段
        'data'=>array_slice($row, ($page-1)*$qty,$qty),
        //获取数字总长度
        'total'=>count($row),
        'qty'=>$qty,
        //*1转成数字类型
        'pageNo'=>$page*1
    );

    echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>