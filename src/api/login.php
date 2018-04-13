<?php

    require('connect.php');

    //登录
    $username = isset($_GET['username']) ? $_GET['username'] : null;
    $password = isset($_GET['password']) ? $_GET['password'] : null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;

    $sql = "select username from user where username='$username'";

    $res = $conn->query($sql);

    //验证是否有这个手机
    if($res->num_rows>0){
        echo 'yes';

        //接着判断密码
        if($type == 'log'){
            $password = md5($password);

            $sql = "select password from user where password='$password'";

            $res = $conn->query($sql);

            if($res->num_rows>0){
                echo 'yes';
            }else{
                echo 'no';
            }
        }

    }else{
        echo 'no';
    }


?>