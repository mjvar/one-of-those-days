let playButton = document.getElementById("playButton");
let player = document.getElementById("player");
let landing = document.getElementById("landing");
let emojiBox = document.getElementById("emoji-box");
let filterBW = document.getElementById("overlay");
let captions = document.getElementById("captions");
let cc = document.getElementById("cc");

playButton.addEventListener('click', () => {
	landing.classList.add('fade');
	state = 1;
	setTimeout(() => {  startAudio(); }, 1000);
});

cc.addEventListener('click', () => {
	captions.classList.toggle('showCaps');
});

player.addEventListener('timeupdate', () => {
	audioTime = player.currentTime;
}) ;

function startAudio(){
	player.play();
	emojiBox.classList.add('show');
    landing.parentNode.removeChild(landing);
}