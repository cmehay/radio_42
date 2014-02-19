(function()
{
	"use strict";
	var radio = {};
	var priv = {};


	priv.play = function()
	{
		var audio = document.getElementsByTagName('audio')[0];
		$("#play_button").addClass('hidden');
		$("#pause_button").removeClass('hidden');
		$("audio").attr("volume", 0);
		audio.play();
		$("audio").animate({volume: 1.0}, 1000);
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
		}, 1000);
	}
	radio.onready = function(){
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
