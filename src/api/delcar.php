<?php

    require('connect.php');

    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;

        //删除
        $sql = "delete from car where id='$id'";

        $c = $conn->query($sql);

        if($c){
            echo 'yes';
        }else{
            echo 'no';
        }

        if($type == 'del'){
            $sql2 = "delete from car";

            $d = $conn->query($sql);

            if($d){
                echo 'del';
            }
        }

        $conn->close();

?>