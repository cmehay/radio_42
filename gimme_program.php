<?php

define(RADIO_USER, 'radio');
define(LIST_RADIO_JOBS, 'sudo /opt/sbin/list_radio_jobs');
define(GET_RADIO_JOBS, 'sudo /opt/sbin/get_radio_jobs');
define(GET_EMISSION_INFO, 'sudo /opt/sbin/get_emission_info');
define(PLAY_EMISSION, 'play_emission ');

$list_jobs = shell_exec(LIST_RADIO_JOBS);

$list_jobs = str_replace("\t", " ", $list_jobs);

$list_jobs = explode("\n", $list_jobs);

foreach ($list_jobs as $idx => $jobs)
{
	$list_jobs[$idx] = array_filter(explode(' ', $jobs), 'strlen');
}

$i = 0;
foreach ($list_jobs as $value)
{
	if ($value[7] == RADIO_USER)
	{
		echo sprintf("%02s", $value[3]) . '/' . $value[2] . '/' . $value[5] .
				':' . $value[4] . ' -0000';
		$job_idx[$i++]['timestamp'] =
			strtotime(sprintf("%02s", $value[3]) . '/' . $value[2] . '/' . $value[5] .
				':' . $value[4] . ' -0000');
	}
}

if (!isset($job_idx))
{
	$json_return['jobs_num'] = 0;
	echo(json_encode($json_return));
	exit ;
}

foreach ($job_idx as $key => $unused)
{
	$job_idx[$key]['cmd'] = shell_exec(GET_RADIO_JOBS .
		' ' . $job_idx[$key]['idx']);
	$job_idx[$key]['cmd'] = explode("\n", $job_idx[$key]['cmd']);
	foreach ($job_idx[$key]['cmd'] as $content)
	{
		if (strpos($content, PLAY_EMISSION) !== FALSE)
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
			if (strpos($info, 'TPE1') !== FALSE)
				$job_idx[$key]['artist'] = substr(strstr($info, ':'), 2);
			elseif (strpos($info, 'TIT2') !== FALSE)
				$job_idx[$key]['title'] = substr(strstr($info, ':'), 2);
		}
		$job_idx[$key]['timestamp'] = $job_idx[$key]['timestamp'];
	}
}

$i = 0;
foreach ($job_idx as $key => $unused)
{
	if (isset($job_idx[$key]['artist']) && isset($job_idx[$key]['title']))
	{
		$json_return['jobs'][$i]['timestamp'] = $job_idx[$key]['timestamp'];
		$json_return['jobs'][$i]['artist'] = $job_idx[$key]['artist'];
		$json_return['jobs'][$i]['title'] = $job_idx[$key]['title'];
		$json_return['jobs_num'] = ++$i;
	}
}

echo(json_encode($json_return));

?>
