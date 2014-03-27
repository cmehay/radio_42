<?php

define(RADIO_USER, 'radio');
define(LIST_RADIO_JOBS, 'sudo /opt/sbin/list_radio_jobs');
define(GET_RADIO_JOBS, 'sudo /opt/sbin/get_radio_jobs');
define(GET_EMISSION_INFO, 'sudo /opt/sbin/get_emission_info');
define(PLAY_EMISSION, 'play_emission');

$list_jobs = shell_exec(LIST_RADIO_JOBS);

$list_jobs = str_replace("\t", " ", $list_jobs);

$list_jobs = explode("\n", $list_jobs);

foreach ($list_jobs as $idx => $jobs)
{
	$list_jobs[$idx] = explode(' ', $jobs);
}

$i = 0;
foreach ($list_jobs as $value)
{
	if ($value[7] == RADIO_USER)
	{
		$job_idx[$i]['idx'] = $value[0];
		$job_idx[$i++]['date'] = $value[1] . ' ' . $value[2] . ' ' .
			$value[3] . ' ' . $value[4] . ' ' . $value[5];
	}
}

foreach ($job_idx as $key => $value)
{
	$job_idx[$key]['cmd'] = shell_exec(GET_RADIO_JOBS . ' ' . $value);
	$job_idx[$key]['cmd'] = explode("\n", $job_idx[$key]['cmd']);
	foreach ($job_idx[$key]['cmd'] as $content)
	{
		if (strpos($content, PLAY_EMISSION))
		{
			$job_idx[$key]['cmd'] = strrchr($content, ' ');
			break ;
		}
	}
	if ($job_idx[$key]['cmd'])
	{
		$job_idx[$key]['file_info'] =
			shell_exec(GET_EMISSION_INFO . ' ' . $job_idx[$key]['cmd']);
		$job_idx[$key]['file_info'] = explode("\n", $job_idx[$key]['file_info']);
		foreach ($job_idx[$key]['file_info'] as $info)
		{
			if (strpos($info, 'TPE1'))
				$job_idx[$key]['artist'] = strstr($info, ':');
			elseif (strpos($info, 'TIT2'))
				$job_idx[$key]['title'] = strstr($info, ':');
		}
	}
	
}

?>
