// Angle of sun
let theta = 0;

// Time goes up to 100
let time = 0;

// Variable for smooth time transition
let goalTime = 0;

// Timestamp of audio when playing
let audioTime = 0;

// Colors
let sunNoon = [255, 243, 5];
let sunMorning = [255, 106, 0];

let morning = [237, 161, 140];
let noon = [140, 227, 237];
let evening = [193, 154, 237];

// State to switch between landing, day A, and day B
// 0 - landing
// 1 - Day A
// 2 - Day B
let state = 0;

// variable for smooth transitions between days
let transitionDone = false;

function windowResized(){
	// Responsive canvas
	resizeCanvas(windowWidth, windowHeight);
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
	// stay behind everything
	canvas.style('z-index', '-1');
}

function draw() {
	if(state == 0){
		// Interactive stage
		time = map(mouseX, 0, width, 0, 100);
		drawSky();
		drawSun();
	}
	else{
		// Day A or B
		showSketch();
	}
}

function showSketch(){
	if(transitionDone){
		// Transition to goal time if needed
		if(time < goalTime){
			time += 0.1;
		}
		showEmoji();
		drawSky();
		drawSun();
	}
	else{
		// If not yet transitioned,
		// smoothly move sun to start
		if(time > 0){
			time -= 1;
		}
		else{
			transitionDone = true;
		}
		drawSky();
		drawSun();
	}
}

function drawSun(){
	// Map angle of sun based on time
	theta = map(time, 0, 100, 4.25, 5.166);

	push();

	// Adjust color based on time
	let currentSun = [];
	if(time < 50){
		for(let i = 0; i < 3; i++){
			currentSun[i] = map(time, 0, 50, sunMorning[i], sunNoon[i]);
		}
	}
	else{
		for(let i = 0; i < 3; i++){
			currentSun[i] = map(time, 50, 100, sunNoon[i], sunMorning[i]);
		}
	}
	fill(currentSun[0],currentSun[1],currentSun[2]);
	if(state == 2){
		fill(100);
	}

	noStroke();

	// Draw sun along arc path
	translate(width/2,1.2*height);
	let x = cos(theta) * width * 1.2;
	let y = sin(theta) * height;
	ellipse(x,y,width/17,width/17);

	pop();
}

function drawSky(){
	// Adjust sun color based on time
	let currentSky = [];
	if(time < 50){
		for(let i = 0; i < 3; i++){
			currentSky[i] = map(time, 0, 50, morning[i], noon[i]);
		}
	}
	else{
		for(let i = 0; i < 3; i++){
			currentSky[i] = map(time, 50, 100, noon[i], evening[i]);
		}
	}
	background(currentSky[0],currentSky[1],currentSky[2]);
	if(state == 2){
		background(map(time, 0, 100, 150, 100));
	}
}

function showEmoji(){
	// Show emojis as visual guides for audio
	if(audioTime < 11){
		emojiBox.innerHTML = "<h1>Day A</h1>";
		captions.innerHTML = "<h2>Hi</h2>";
	}
	else if(audioTime < 17){
		emojiBox.innerHTML = "<h1>⏰</h1>";
		goalTime = 10;
		captions.innerHTML = "<h2>asdf</h2>";
	}
	else if(audioTime < 30){
		emojiBox.innerHTML = "<h1>🛁</h1>";
		goalTime = 15;
		captions.innerHTML = "<h2>Hasdfasdgi</h2>";
	}
	else if(audioTime < 54){
		emojiBox.innerHTML = "<h1>🧑‍🏫</h1>";
		goalTime = 25;
	}
	else if(audioTime < 64){
		emojiBox.innerHTML = "<h1>🗒️</h1>";
		goalTime = 40;
	}
	else if(audioTime < 73){
		emojiBox.innerHTML = "<h1>⌨️</h1>";
		goalTime = 55;
	}
	else if(audioTime < 86){
		emojiBox.innerHTML = "<h1>📲</h1>";
		goalTime = 67;
	}
	else if(audioTime < 98){
		emojiBox.innerHTML = "<h1>🍽️</h1>";
		goalTime = 80;
	}
	else if(audioTime < 110){
		emojiBox.innerHTML = "<h1>📒</h1>";
		goalTime = 93;
	}
	else if(audioTime < 125){
		// Transition from day A to day B
		emojiBox.innerHTML = "";
		goalTime = 0;
		if(state == 1){
			console.log("AAA");
			state = 2;
			transitionDone = false;
			filterBW.classList.toggle('bnw');
		}
	}
	else if(audioTime < 132){
		emojiBox.innerHTML = "<h1>Day B</h1>";
		goalTime = 0;
	}
	else if(audioTime < 138){
		emojiBox.innerHTML = "<h1>⏰</h1>";
		goalTime = 10;
	}
	else if(audioTime < 145){
		emojiBox.innerHTML = "<h1>🛁</h1>";
		goalTime = 15;
	}
	else if(audioTime < 162){
		emojiBox.innerHTML = "<h1>🧑‍🏫</h1>";
		goalTime = 35;
	}
	else if(audioTime < 176){
		emojiBox.innerHTML = "<h1>⌨️</h1>";
		goalTime = 50;
	}
	else if(audioTime < 198){
		emojiBox.innerHTML = "<h1>📲</h1>";
		goalTime = 67;
	}
	else if(audioTime < 213){
		emojiBox.innerHTML = "<h1>🍽️</h1>";
		goalTime = 80;
	}
	else if(audioTime < 238){
		emojiBox.innerHTML = "<h1>📒</h1>";
		goalTime = 93;
	}
	else{
		// Give listener restart link
		emojiBox.innerHTML = "<h1><a href='example.com'>Restart</a></h1>"
		goalTime = 100;
	}
}