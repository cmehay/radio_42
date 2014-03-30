;(function()
{
	"use strict";
	var radio = {};
	var priv = {};

	priv.latency = 0;
	priv.ispaused = 1;
	priv.isoffline = 0;

	setInterval(function()
	{
		if (priv.ispaused)
			priv.latency++;
	}, 10000);

	priv.set_audio = function()
	{
		priv.audio = document.getElementsByTagName('audio')[0];
	}

	priv.start_anim = function()
	{
		$("#round").css("-webkit-animation-play-state", "running");
		$("#round").css("-moz-animation-play-state", "running");
		$("#round").css("animation-play-state", "running");
	}

	priv.stop_anim = function()
	{
		$("#round").css("-webkit-animation-play-state", "paused");
		$("#round").css("-moz-animation-play-state", "paused");
		$("#round").css("animation-play-state", "paused");
	}

	priv.play = function()
	{
		$("#play_button").addClass('hidden');
		$("#pause_button").removeClass('hidden');
		$("audio").animate({volume: 0.0}, 0);
		priv.audio.play();
		$("audio").animate({volume: 1.0}, 1000);
		priv.start_anim();
		priv.ispaused = 0;
	};

	priv.pause = function()
	{
		$("#round").removeClass('click');
		$("#play_button").removeClass('hidden');
		$("#pause_button").addClass('hidden');
		$("audio").animate({volume: 0.0}, 1000);
		setTimeout(function()
		{
			priv.audio.pause();
			priv.stop_anim();
			$("#round").addClass('click');
			priv.ispaused = 1;
		}, 1000);
	}

	priv.buffer = function()
	{
		priv.audio.play();
		setTimeout(function()
		{
			priv.audio.pause();

		}, 10);
		setTimeout(function()
		{
			$("#englobe").css({ 'background-color': 'rgba(0, 0, 0, 0.0)' });
			$("#wait").fadeOut(500);
			$("#track").fadeIn(500);
			$("#round").addClass('click');
			setTimeout(function()
			{
				$("#wait").addClass('hidden');
			}, 500);
		}, 5000);
	}

	priv.set_offline = function()
	{
		priv.pause();
		$("#vlc").fadeOut(500);
		$("#wait").fadeOut(500);
		$("#englobe").css({ 'background-color': 'rgba(0, 0, 0, 0.7)' });
		$("#offline").fadeIn(500);
		$("#round").addClass('click');
	}

	priv.copy_to_clipbloard = function() {
		window.prompt("Copy link and paste it in VLC", $("audio").attr("src"));
	}

	priv.check_song = function()
	{
		$.ajax({
			url:'gimme_song.php',
			type: 'GET',
			dataType: 'json'
		}).done(function(json)
		{
			if (!json.is_running)
			{
				priv.set_offline();
				return ;
			}
			setTimeout(function()
			{
				if ($("#title").text() != json.title && !priv.ispaused)
				{
					$("#title").fadeTo(1000, 0);
					setTimeout(function()
					{
						$("#title").html(json.title);
						$("#title").fadeTo(1000, 1);
					}, 2000);
				}

				if ($("#artist").text() != json.artist && !priv.ispaused)
				{
					$("#artist").fadeTo(1000, 0);
					setTimeout(function()
					{
						$("#artist").html(json.artist);
						$("#artist").fadeTo(1000, 1);
					}, 2000);
				}
			}, priv.latency * 10000);
		});
	}

	priv.set_am_pm = function(date)
	{
		var hours = date.getUTCHours();
		var minutes = date.getUTCMinutes();
		var ampm = (hours >= 12) ? 'pm' : 'am';
		hours = hours % 12;
		hours = (hours) ? hours : 12;
		minutes = (minutes < 10) ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return (strTime);
	}

	priv.get_program = function()
	{
		$.ajax({
			url:'gimme_program.php',
			type: 'GET',
			dataType: 'json'
		}).done(function(json)
		{
			var rand = Math.floor((Math.random() * 100));
			if (json.jobs_num > 0)
			{
				var obj = rand % json.jobs_num;
				if ($("#program").css("opacity") != 0)
				{
					if ($("#program_name").text() != json.jobs[obj].title)
						$("#program_name").fadeTo(1000, 0);
					if ($("#date").data("timestamp") != json.jobs[obj].timestamp)
						$("#date").fadeTo(1000, 0);
				}
				setTimeout(function()
				{
					$("#program_name").html(json.jobs[obj].title);
					$("#date").data("timestamp", json.jobs[obj].timestamp);
					$("#date").trigger('data-timestamp');
					if ($("#program").css("opacity") == 0)
						$("#program").fadeTo(1000, 1);
					else
					{
						$("#date").fadeTo(1000, 1);
						$("#program_name").fadeTo(1000, 1);
					}
				}, 2000);
			}
		});
	}

	priv.timestamp_to_date = function()
	{
		var timestamp = $("#date").data("timestamp");
		if (!timestamp)
			return ;
		var date = new Date(timestamp * 1000);
		var weekday =["Sunday","Monday", "Tuesday", "Wednesday", "Thursday",
			"Friday", "Saturday"];
		var month =["January","February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"];
		var date_str = weekday[date.getUTCDay()] + ' ' + date.getUTCDate() +
		' ' + month[date.getUTCMonth()] + ' at ' + priv.set_am_pm(date);
		$("#date").html(date_str);
	}

	priv.display_vlc = function()
	{
		priv.copy_to_clipbloard();
//		$("#englobe").css({ 'background-color': 'rgba(0, 0, 0, 0.7)' });
//		$("#vlc").fadeIn(500);
//		$("#round").removeClass('click');
	}

	priv.hide_vlc = function()
	{
		$("#englobe").css({ 'background-color': 'rgba(0, 0, 0, 0.0)' });
		$("#vlc").fadeOut(500);
		$("#round").addClass('click');
	}

	radio.onready = function()
	{
		//fix bug animation on chrome
		priv.start_anim();
		setTimeout(function(){
			priv.stop_anim();
		}, 10);
		priv.set_audio();

		priv.buffer();

		$("#play_button").click(function()
		{
			priv.play();
		});

		$("#date").on('data-timestamp', function()
		{
			priv.timestamp_to_date();
		});

		$("#pause_button").click(function()
		{
			priv.pause();
		});

		$("#footer").click(function()
		{
			priv.display_vlc();
		});

		$("#vlc").click(function()
		{
			priv.hide_vlc();
		});

		setInterval(function()
		{
			priv.check_song();
		}, 10000);

		setInterval(function()
		{
			priv.get_program();
		}, 14500);
	};

	window.radio = radio;
})();

$(document).ready(function(){
	radio.onready();
});
