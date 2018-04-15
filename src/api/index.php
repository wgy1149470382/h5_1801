<?php

    require("connect.php");

    //获取
    // $sql = "select * from goodslist";

    $sql1 = "select * from good where category='wine1'";
    $sql2 = "select * from good where category='wine2'";
    $sql3 = "select * from good where category='yangjiu'";
    $sql4 = "select * from good where category='baijiu1'";
    $sql5 = "select * from good where category='baijiu2'";
    $sql6 = "select * from good where category='laojiu1'";
    $sql7 = "select * from good where category='laojiu2'";
    $sql8 = "select * from good where category='jiuju'";
    $sql9 = "select * from good1";
    $sql10 = "select * from good where category='jj'";

    $wine1 = $conn->query($sql1);
    $wine2 = $conn->query($sql2);
    $yangjiu = $conn->query($sql3);
    $baijiu1 = $conn->query($sql4);
    $baijiu2 = $conn->query($sql5);
    $laojiu1 = $conn->query($sql6);
    $laojiu2 = $conn->query($sql7);
    $jiuju = $conn->query($sql8);
    $like = $conn->query($sql9);
    $jj = $conn->query($sql10);

    $sWine1 = $wine1->fetch_all(MYSQLI_ASSOC);
    $sWine2 = $wine2->fetch_all(MYSQLI_ASSOC);
    $sYangjiu = $yangjiu->fetch_all(MYSQLI_ASSOC);
    $sBaijiu1 = $baijiu1->fetch_all(MYSQLI_ASSOC);
    $sBaijiu2 = $baijiu2->fetch_all(MYSQLI_ASSOC);
    $sLaojiu1 = $laojiu1->fetch_all(MYSQLI_ASSOC);
    $sLaojiu2 = $laojiu2->fetch_all(MYSQLI_ASSOC);
    $sJiuju = $jiuju->fetch_all(MYSQLI_ASSOC);
    $sLike = $like->fetch_all(MYSQLI_ASSOC);
    $sJJ = $jj->fetch_all(MYSQLI_ASSOC);

    $res = array(
        'wine1'=>$sWine1,
        'wine2'=>$sWine2,
        'yangjiu'=>$sYangjiu,
        'baijiu1'=>$sBaijiu1,
        'baijiu2'=>$sBaijiu2,
        'laojiu1'=>$sLaojiu1,
        'laojiu2'=>$sLaojiu2,
        'jiuju'=>$sJiuju,
        'like'=>$sLike,
        'jj'=>$sJJ
    );


    
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    
?>