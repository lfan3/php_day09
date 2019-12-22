<?php
	echo $_POST['id']." ".$_POST['task'];
	$handle = fopen("list.csv", "a+");
	$tab = array($_POST['id'], $_POST['task']);
	fputcsv($handle, $tab, ";");
?>