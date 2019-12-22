<?php
    $array = array();
    $file = file_exists('list.csv');
    if($file){
        $lines = file('list.csv');
        foreach ($lines as $id => $task)
        {
            array_push($array, $task);
        }
        echo json_encode($array);
    }
?>