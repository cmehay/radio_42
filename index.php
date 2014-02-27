<!doctype html>
<html lang="fr">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Radio quarante-deux</title>
		<link rel="stylesheet" href="style/style.css">
		<link rel="icon" type="image/png" href="style/img/ico.png" />
		<script src="js/jquery-2.1.0.min.js"></script>
		<script src="js/radio.js"></script>
	</head>
	<body>
		<h4>$> ./radio_42</h4>
		<div id="track">
			<h5>Now playing:</h5>
			<div id="title"></div>
			<div id="artist"></div>
		</div>
		<audio preload volume="0.0" src="http://42.ham-radio-op.net:8080"></audio>
		<div id="englobe">
			<div id="player_button">
				<div id="play_button"></div>
				<div id="pause_button" class="hidden"></div>
				<div id="round"></div>
			</div>
		</div>
		<div id="wait" class="center"><p>Please wait...</p></div>
		<div id="offline" class="center hidden"><p>Offline :/</p></div>
		<div id="vlc" class="center large hidden">
			<p>http://42.ham-radio-op.net:8080</p>
		</div>
		<div id="footer">Listen in VLC</div>
	</body>
</html>
