<?php

$mpc = shell_exec('mpc -f "%title%\n%artist%\n%album%"');

if (!strstr($mpc, '[playing]'))
{
	echo(json_encode(array('is_runnig' => FALSE)));
	exit ;
}

$array = explode("\n", $mpc);

$json_array = array(
	'is_running' => TRUE,
	'title' => $array[0],
	'artist' => $array[1],
	'album' => $array[2]);

echo(json_encode($json_array));
?>
