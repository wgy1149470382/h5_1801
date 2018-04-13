<?php
    
    require('connect.php');

    //注册
    $username = isset($_GET['username']) ? $_GET['username'] :null;
    $password = isset($_GET['password']) ? $_GET['password'] :null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;

    $sql = "select username from user where username='$username'";

    $res = $conn->query($sql);

    if($res->num_rows>0){
        echo 'no';
    }else{
        if($type == 'reg'){
            // 加密密码
            $password = md5($password);

            // 注册（插入数据）
            $sql = "insert into user(username,password) value('$username','$password')";

            // 执行sql语句
            $res = $conn->query($sql);
            if($res){
                echo 'yes';
            }else{
                echo 'no';
            }
        }
        // 验证用户名可注册
        echo "yes";
    }

?>