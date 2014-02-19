;(function()
{
	"use strict";
	var radio = {};
	var priv = {};


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
		var audio = document.getElementsByTagName('audio')[0];

		$("#play_button").addClass('hidden');
		$("#pause_button").removeClass('hidden');
		$("audio").animate({volume: 0.0}, 0);
		audio.play();
		$("audio").animate({volume: 1.0}, 1000);
		priv.start_anim();
	};

	priv.pause = function()
	{
		var audio = document.getElementsByTagName('audio')[0];

		$("#play_button").removeClass('hidden');
		$("#pause_button").addClass('hidden');

		$("audio").animate({volume: 0.0}, 1000);
		setTimeout(function()
		{
			audio.pause();
			priv.stop_anim();
		}, 1000);
	}

	radio.buffer = function()
	{
		var audio = document.getElementsByTagName('audio')[0];
		audio.play();
		setTimeout(audio.pause(), 10);
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
	radio.place_button();
	radio.buffer();
	radio.onready();
});
