<?php

    require('connect.php');

    $sql = "select * from goodlist";

    $data = $conn->query($sql);

    $res = $data->fetch_all(MYSQLI_ASSOC);

    echo json_encode($res,JSON_UNESCAPED_UNICODE);

?>