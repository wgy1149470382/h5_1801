<?php

    require('connect.php');

    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : null;

    $sql = "select * from car where id='$id'";

    $data = $conn->query($sql);


    // if($res->num_rows==0){
        
        $res = $data->fetch_assoc();

        $sql4 = "update car set qty='$qty' where id='$id'";

        $reslut = $conn->query($sql4);
    // }

?>