let theta = 0;

// Time goes up to 100
let time = 0;

let sunNoon = [255, 243, 5];
let sunMorning = [255, 106, 0];

let morning = [237, 161, 140];
let noon = [140, 227, 237];
let evening = [193, 154, 237];

// State to switch between, landing, day A, and day B
// 0 - landing
// 1 - Day A
// 2 - Day B
let state = 0;

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
	canvas.style('z-index', '-1');
}

function draw() {
	if(state == 0){
		time = map(mouseX, 0, width, 0, 100);
		console.log(time);
		drawSky();
		drawSun();
	}
	else if(state == 1){
		time += 0.2;
		drawSky();
		drawSun();
	}
}

function drawSun(){
	theta = map(time, 0, 100, 4.25, 5.166);

	push();

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
	noStroke();

	translate(width/2,1.2*height);
	let x = cos(theta) * width * 1.2;
	let y = sin(theta) * height;
	ellipse(x,y,width/20,width/20);
	console.log(theta);
	pop();
}

function drawSky(){
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
}