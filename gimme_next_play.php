<?php

define(RADIO_USER, "radio");

$list_jobs = shell_exec('sudo /opt/sbin/list_radio_jobs');

$list_jobs = str_replace("\t", " ", $list_jobs);

$list_jobs = explode("\n", $list_jobs);

foreach ($list_jobs as $idx => $jobs)
{
	$list_jobs[$idx] = explode(' ', $jobs);
}

foreach ($list_jobs as $key => $value)
{
	if ($value[7] == RADIO_USER)
		echo $value[0];
}

?>
