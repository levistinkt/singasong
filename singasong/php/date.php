<?php

if(isset($_POST["functionname"])){
    switch ($_POST["functionname"]) {
		case 'setGameDate':
			$param = $_POST["param"];
			setGameDate($param);
		break;
		case 'getGameDate':
			getGameDate();
		break;
    }
}

function setGameDate($param){
	file_put_contents('../content/date.txt', $param);
	setcookie("dateOK", "1", time()+3600, "/", "singasong.fun"); 
	exit;
}

function getGameDate(){
	$output = file_get_contents('../content/date.txt');
	echo $output;
}