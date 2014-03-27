<?php

$list_jobs = shell_exec('sudo /opt/sbin/list_radio_jobs');

str_replace(' ', "\t", $list_jobs);

$list_jobs = explode("\n", $list_jobs);

foreach ($list_jobs as $idx => $jobs)
{
	$list_jobs[$idx] = explode(' ', $jobs);
}

foreach ($list_jobs as $key => $value)
{
	foreach ($value as $key2 => $value2) {
		echo "$value2\n";
	}
	echo "\n";
}

?>
