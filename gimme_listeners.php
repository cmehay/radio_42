<?php

function s($num)
{
	if ($num > 1)
		return 's';
}

define('LISTENERS_CMD', 'netstat -an | grep :8080 | grep ESTABLISHED | wc -l');

$listeners['num'] = shell_exec(LISTENERS_CMD);
$listeners['str'] = 'listener' . s($listeners['num']);

echo(json_encode($listeners));

?>
