;(function()
{
	"use strict";
	var radio = {};
	var priv = {};

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
	};

	priv.pause = function()
	{
		$("#play_button").removeClass('hidden');
		$("#pause_button").addClass('hidden');

		setTimeout(function()
		{
			priv.audio.pause();
			priv.stop_anim();
		}, 1000);
	}

	priv.buffer = function()
	{
		priv.audio.play();
		setTimeout(priv.audio.pause(), 10);
		setTimeout(function()
			{
				$("audio").animate({"background-color": "rgba(0, 0, 0, 0.0)"}, 600);
				$("#wait").fadeOut(500);
				$("#round").addClass('dont_click');
				setTimeout(function()
					{
						$("#wait").addClass('hidden');
					}, 500);
			}, 5000);
	}

	radio.place_button = function()
	{
		var hei = $("#englobe").height();
		var wid = $("#englobe").width();
		var but_hei = $("#player_button").height();
		var but_wid = $("#player_button").width();

		$("#player_button").css("top", (hei - but_hei) / 2);
		$("#player_button").css("left", (wid - but_wid) / 2);
	}

	radio.onready = function()
	{

		priv.set_audio();
		priv.buffer();
		$("#play_button").click(function()
		{
			priv.play();
		});

		$("#pause_button").click(function()
		{
			priv.pause();
		});
	};

	window.radio = radio;
})();

$(document).ready(function(){
	radio.onready();
});
