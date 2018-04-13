<?php

    require('connect.php');

    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $name = isset($_GET['name']) ? $_GET['name'] : null;
    $price = isset($_GET['price']) ? $_GET['price'] : null;
    $imgs = isset($_GET['imgs']) ? $_GET['imgs'] : null;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 1;
    $category = isset($_GET['category']) ? $_GET['category'] : null;
    



    $sql = "select * from car where id='$id'";

    $res = $conn->query($sql);
    

    if($res->num_rows==0){
        $sql2 = "insert into car (id,name,price,imgs,qty,category) values($id,'$name','$price','$imgs','$qty','$category')";
        $car = $conn->query($sql2);


        if($car){
            echo 'yes';
        }else{
            echo 'no';
        }

    }else{
        $sql3 = "select * from car where id='$id'";
        $a = $conn->query($sql3);
        // $res = $a->fetch_all(MYSQLI_ASSOC);
        $res = $a->fetch_assoc();

        $a_qty = $res['qty'];

        $a_qty = $a_qty*1 + $qty*1;

        $sql4 = "update car set qty='$a_qty' where id='$id'";

        $b = $conn->query($sql4);

        

    }

    
    $conn->close();

?>