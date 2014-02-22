<?php

$mpc = shell_exec('mpc -f "%title%\n%artist%\n%album%"');

echo $mpc

if (!strstr($mpc, '[playing]'))
{
	$json = json_encode(array('is_runnig' => FALSE));
	echo ($json);
	exit ;
}

$array = explode($mpc, "\n");

$json_array = array(
	'is_running' => TRUE,
	'title' => $array[0],
	'artist' => $array[1],
	'album' => $array[2]);

echo (json_encode($json_array));

?>
