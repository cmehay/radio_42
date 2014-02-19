(function()
{
	"use strict";
	var radio = {};
	var priv = {};


	priv.play = function(audio)
	{
		$("#play_button").addClass('hidden');
		$("#pause_button").removeClass('hidden');
		$("audio").animate({volume: 0.0}, 0);
		audio.play();
		$("audio").animate({volume: 1.0}, 1000);
	};

	priv.pause = function(audio)
	{
		$("#play_button").removeClass('hidden');
		$("#pause_button").addClass('hidden');

		$("audio").animate({volume: 0.0}, 1000);
		setTimeout(function()
		{
			audio.pause();
		}, 1000);
	}
	radio.buffer = function(audio)
	{
		audio.play();
		setTimeout(audio.pause(), 10);
	}
	radio.onready = function(audio)
	{
		$("#play_button").click(function(audio)
		{
			priv.play(audio);
		});

		$("#pause_button").click(function(audio)
		{
			priv.pause(audio);
		});
	};

	window.radio = radio;
})();

$(document).ready(function(){
	var audio = document.getElementsByTagName('audio')[0];
	radio.buffer(audio);
	radio.onready(audio);
});
