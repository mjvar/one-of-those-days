let playButton = document.getElementById("playButton");
let player = document.getElementById("player");

playButton.addEventListener('click', () => {
	player.play();
});

player.addEventListener('timeupdate', () => {
	console.log(player.currentTime);
}) ;