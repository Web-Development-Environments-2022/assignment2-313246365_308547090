var context;
var shape = new Object();
var board;
var score;
var lives;
var pac_color;
var pac_side = 1; // side of pacman's face
var start_time;
var time_elapsed;
var interval;
var users_list = [{username:"k",password:"k"}];
let curr_user = {};
var monsters_number
var balls_number
var up_key
var down_key
var right_key
var left_key
var moving_objects_array
var balls_array
var clock
var cake
var rows = 20;
var cols = 20;
var height;
var width;
var clock_remain = true;
var clock_obj;
var clock_flag = false;

let gameMusic = new Audio('./audio/DNCE - Cake By The Ocean.mp3');
let winMusic = new Audio('./audio/Win.mp3');

//Real value for variables after pick or random
let right_key_pick;
let left_key_pick;
let up_key_pick;
let down_key_pick;
let balls_num_pick;
let time_num_pick;
let monsters_num_pick;
let ball5_color_pick;
let ball15_color_pick;
let ball25_color_pick; 


// 4- obstacle, 2- ball , 1- food , 3-
$(document).ready(function() {
	context = canvas.getContext("2d");
	height = (canvas.height)/rows;
	console.log("height is");
	console.log(height);
   	width = (canvas.width)/cols;
   	console.log("width is");
  	console.log(width);

	show_welcome_page();
	//Start();
});

$(function(){
    var dtToday = new Date();
	var minDate = dtToday.toISOString().substring(0,10);
	$('#birthdate_r').prop('max', minDate);
});


//========================== INITIALIZATION  ===========================

//monsters_number = document.getElementById("monsters_num").value

//time_elapsed = document.getElementById("time_num").value
//========================== functions to header  ===========================
function CheckUser(){ //login
	let username1= document.getElementById("username").value
	let password1 = document.getElementById("password").value
	curr_user = {username: username1,password:password1}
	let flag = 0 
	for (var i = 0; i < users_list.length; i++) {
        
            if ( users_list[i].username===username1 && users_list[i].password===password1){
				flag = 1
			}
        
    }

	if (flag === 1){
		//if valid -  start game - setting page
		// alert( "validation succeeded" );
		//location.href="run.html";
		show_settings_page();
		ChangeWelcomeUser(username1);
	}
	else{
		alert( "validation failed" );
		show_login_page();
	}
	
	flag = 0

}

function ChangeWelcomeUser(username){ //Change guest to username
	document.getElementById('welcomeUser').innerText = "welcome back, " + username + "!";
}

function RegisterUser(){
	let username1=  $('#username_r').val()
	let password1 = $('#password_r').val()
	let fullname1 = $('#fullname_r').val()
	let email1 =  $('#email_r').val()
	let new_user={username: username1,password:password1}
	
	if (password1.length<6){
		alert( "validation failed: password must be longer than 5 characters" );
		return 
	}
	//if password is not containing letters and numbers
	if (!(password1.match(/([a-zA-Z])/))|| (!password1.match(/([0-9])/)))
	{
		alert( "validation failed: password must contain English letters and numbers only" );
		return 
	}

	//if full name contain numbers
	if (fullname1.match(/([0-9])/))
	{
		alert( "validation failed: full name  must contain letters only" );
		return 
	}
	

	users_list.push(new_user)
	console.log(users_list)
	show_login_page()

	return

}



function Check_Settings(){
	let monsters_num1=  $('#monsters_num').val()
	let balls_num1 = $('#balls_num').val()
	let time_num1 = $('#time_num').val()

	if (balls_num1 <50|| balls_num1>90)
	{
		alert( "validation failed: balls number is out of range" );
		return 
	}

	if (time_num1<60 || time_num1 > 300)
	{
		alert( "validation failed: game time is too short" );
		return 
	}

	if (monsters_num1 <1 || monsters_num1 > 4){
		alert( "validation failed: Number of monsters most be integer between 1-4" );
		return 
	}
	
	balls_number = balls_num1
	start_time = time_num1
	monsters_number =monsters_num1
	console.log("settings are good")

	show_game_page()
	Start()
	return


}


//=========== SHOW FUNCTIONS ====================


function show_welcome_page() {
	Stop();
	document.getElementById('welcome_page').style.display = "flex";
	document.getElementById('register_page').style.display = "none";
	document.getElementById('login_page').style.display = "none";
	document.getElementById('settings_page').style.display = "none";
	document.getElementById('game_page').style.display = "none";
	//document.getElementById('about_page').style.display = "none";

}

function show_login_page() {
	Stop();
	document.getElementById('welcome_page').style.display = "none";
	document.getElementById('register_page').style.display = "none";
	document.getElementById('login_page').style.display = "flex";
	document.getElementById('settings_page').style.display = "none";
	document.getElementById('game_page').style.display = "none";
	//document.getElementById('about_page').style.display = "none";
}

function show_register_page() {
	Stop();
	document.getElementById('welcome_page').style.display = "none";
	document.getElementById('register_page').style.display = "flex";
	document.getElementById('login_page').style.display = "none";
	document.getElementById('settings_page').style.display = "none";
	document.getElementById('game_page').style.display = "none";
	//document.getElementById('about_page').style.display = "none";
}
function show_settings_page() {
	if (Object.keys(curr_user).length !== 0){
		Stop();
		document.getElementById('welcome_page').style.display = "none";
		document.getElementById('register_page').style.display = "none";
		document.getElementById('login_page').style.display = "none";
		document.getElementById('settings_page').style.display = "flex";
		document.getElementById('game_page').style.display = "none";
		//document.getElementById('about_page').style.display = "none";
	}
	
}

function show_game_page() {
	Stop();
	document.getElementById('welcome_page').style.display = "none";
	document.getElementById('register_page').style.display = "none";
	document.getElementById('login_page').style.display = "none";
	document.getElementById('settings_page').style.display = "none";
	document.getElementById('game_page').style.display = "flex";
	//document.getElementById('about_page').style.display = "none";
}

function show_about_page() {
	Stop();
	document.getElementById('welcome_page').style.display = "none";
	document.getElementById('register_page').style.display = "none";
	document.getElementById('login_page').style.display = "none";
	document.getElementById('settings_page').style.display = "none";
	document.getElementById('game_page').style.display = "none";
	document.getElementById('about_page').style.display = "flex";
}

// ===================================== Objects creation ===========================

//two kinds of monsters with diffrent score type
// [0] cake +50 points
// [1] monster -10 points
// [2] monster -20 points
// [3] monster -10 points
// [4] monster -20 points




function create_moving_objects_array(monsters_number){
	moving_objects_array = new Array();
 	
	// create cake:
	 moving_objects_array[0] = new Object();
	 moving_objects_array[0].points = 50;
	 moving_objects_array[0].kind = "cake";
	 moving_objects_array[0].image = new Image();
	 moving_objects_array[0].i = 10;
	 moving_objects_array[0].j= 15;
	 console.log("finish create cake");


	for (let i = 1; i< 1+monsters_number; i++) {

		if(i===1 ||i===3){
		moving_objects_array[i] = new Object();
		moving_objects_array[i].points = -10;
		moving_objects_array[i].kind = "monster10";
		moving_objects_array[i].image = new Image();
		}
		if(i===2 ||i===4){
			moving_objects_array[i] = new Object();
			moving_objects_array[i].points = -20;
			moving_objects_array[i].kind = "monster20";
			moving_objects_array[i].image = new Image();
		}

		//update i,
 	}
}


// number 1 = food 
function placeBalls(board){
	let x = Math.floor(0.6*balls_number);
	let y = Math.floor(0.3*balls_number);
	let z = Math.floor(0.1*balls_number);
	console.log("after x y z")
	console.log(x)
	
	// 60% balls of 5 points
	for (let i = 0; i < x; i++) {
		console.log("befor find random")
		var emptyCell = findRandomEmptyCell(board);
		console.log("after find random")
		board[emptyCell[0]][emptyCell[1]] = 5;

	}
	console.log("first loop ended")

	// 30% balls of 15 points
	for (let i = x+1 ; i < x+1+y; i++) {

		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 15;

	}

	// 10% balls of 25 points
	for (let i = x+2+y; i < x+2+y+z ; i++) {

		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 25;

	}
	
	console.log("finish place balls")
	return;

}

// //moving
// function createCake{

// }





//===================================== Start Game ===============================
function Start() {
	DisplaySettings();
	board = new Array();
	score = 0;
	lives = 5;
	gameMusic.loop = true;
	pac_color = "yellow";
	var cnt = 100; //??
	var food_remain = balls_number;
	var pacman_remain = 1;
	start_time = new Date();


	//init monsters&cake
	for (var i = 0; i < rows; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < cols; j++) {

			// put walls- MOR
			if ((i == 1 && j == 1) ||
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} 

			else {

				//putting balls on board 
				
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				}
				//   if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
				// 	shape.i = i;
				// 	shape.j = j;
				// 	pacman_remain--;
				// 	board[i][j] = 2;
				//}
			

				else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}

	//food addition
	// while (food_remain > 0) {
	// 	var emptyCell = findRandomEmptyCell(board);
	// 	board[emptyCell[0]][emptyCell[1]] = 1;
	// 	food_remain--;
	// }

	console.log("before place balls in start")
	placeBalls(board);
	console.log("after place balls in start")
	console.log(board)

	//TODO: MONSTERS ON BOARD 

	//placing pacman
	var emptyCell = findRandomEmptyCell(board);
	console.log("after find random")
	board[emptyCell[0]][emptyCell[1]] = 2;
	shape.i=emptyCell[0];
	shape.j = emptyCell[1];

	
	//init object clock and placing it clock = 7
	clock_obj =new Object();
	clock_obj.time_addition = 4000;
	emptyCell = findRandomEmptyCell(board);
	clock_obj.i=emptyCell[0];
	clock_obj.j = emptyCell[1];
	console.log("after placing clock");
	

	keysDown = {};

	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
	// gameMusic.play();
}

function Stop(){ //Stop game 
	window.clearInterval(interval);
	clock_flag = false;
	gameMusic.pause();
	gameMusic.currentTime = 0;
}

function findRandomEmptyCell(board) {
	console.log("before random")
	var i = Math.floor(Math.random() * (rows-1) + 1);
	var j = Math.floor(Math.random() * (cols-1) + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * (rows-1) + 1);
		j = Math.floor(Math.random() * (cols-1) + 1);
	}
	console.log("after random")
	return [i, j];
}
//=================== KEYS DEFINITION ==================

function SetKeyCode(event1,key_type){

	if(key_type === "RIGHT"){
		right_key = event1.keyCode;
		document.getElementById('right_key').value = event1.key;
	}

	if(key_type === "LEFT"){
		left_key = event1.keyCode;
		document.getElementById('left_key').value  = event1.key;
	}
	if(key_type === "UP"){
		up_key = event1.keyCode;
		document.getElementById('up_key').value  = event1.key;
	}
	if(key_type === "DOWN"){
		down_key = event1.keyCode;
		document.getElementById('down_key').value  = event1.key;
	}
}

function GetKeyPressed() {
	if (keysDown[right_key]) {
		return 1;
	}
	if (keysDown[down_key]) {
		return 2;
	}
	if (keysDown[left_key]) {
		return 3;
	}
	if (keysDown[up_key]) {
		return 4;
	}
}


function Random(){

	let min = 50;
	let max= 90;
	
	//random keys
	right_key = 39 ;
	document.getElementById('right_key').value = "Arrow Right";


	left_key = 37;
	document.getElementById('left_key').value  = "Arrow Left";
	

	up_key = 38;
	document.getElementById('up_key').value  = "Arrow Up";
	

	down_key = 40;
	document.getElementById('down_key').value  = "Arrow Down";

	//random  balls
	document.getElementById('balls_num').value  = Math.floor(min + Math.random()*(max-min));
	//random time
	min=60
	max = 300
	document.getElementById('time_num').value  = Math.floor(min + Math.random()*(max-min));

	//random monsters
	min= 1
	max = 4
	document.getElementById('monsters_num').value  = Math.floor(min + Math.random()*(max-min));
	
	//RANDOM COLORS
	document.getElementById('ball5_color').value  = getRandomColor();
	document.getElementById('ball15_color').value  = getRandomColor();
	document.getElementById('ball25_color').value  = getRandomColor();

}


function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }


//drawing the canvas, the player and the obstacle
function Draw() {
	canvas.width = canvas.width; //clean board
	// canvas.width = window.innerWidth
	// canvas.height = window.innerHeight
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblLives.value = lives;
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			
			var center = new Object();
			center.x = i * width + width/2;
			center.y = j * height + height/2;

			//packman?
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, width/2, (0.1+0.5*(pac_side-1)) * Math.PI, (1.8 + 0.5 * (pac_side-1)) * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();

				//eye
				if (pac_side !== 4){
					context.arc(center.x + (width/12), center.y - (width/4),(width/12), 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else{
					context.arc(center.x + (width/4), center.y - (width/12),(width/12), 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				

				//balls
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, (width/4), 0, 2 * Math.PI); // circle
				context.fillStyle = document.getElementById("ball5_color").value;
				context.fill();
			
			} else if (board[i][j] == 15) {

				context.beginPath();
				context.arc(center.x, center.y, (width/4), 0, 2 * Math.PI); // circle
				context.fillStyle = document.getElementById("ball15_color").value; 
				context.fill();
			
			} else if (board[i][j] == 25) {
				context.beginPath();
				context.arc(center.x, center.y, (width/4), 0, 2 * Math.PI); // circle
				context.fillStyle = document.getElementById("ball25_color").value; 
				context.fill();

			//wall
			} else if (board[i][j] == 4) {

				var img_candy=new Image();
		
				img_candy.src="images/candy.jpg";
				
				context.drawImage(img_candy,center.x - (width/2), center.y - (width/2), width, width);

			
			
			} 
			//draw clock
			else if (i === clock_obj.i && j===clock_obj.j) {
				var img_clock=new Image();
				img_clock.src="images/clock.png";
				context.drawImage(img_clock,center.x - (width/2), center.y - (width/2), width, width);
			}
			//draw cake
			//draw goests
			


		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0; // shape = pacman
	let x = GetKeyPressed();
	if (x !== undefined) //define pacman's side by input key
		pac_side = x;
	
	if (x == 1) { // right
		if (shape.i < rows-1 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (x == 2) { // down
		if (shape.j < rows-1 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) { // left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) { // up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	// if (board[shape.i][shape.j] == 1) {
	// 	score++;
	// }
	//collision with ball
	if (board[shape.i][shape.j] == 5) {
		board[shape.i][shape.j] =0;
		score = score+5;
	}
	if (board[shape.i][shape.j] == 15) {
		board[shape.i][shape.j] =0;
		score = score+15;
	}
	if (board[shape.i][shape.j] == 25) {
		board[shape.i][shape.j] =0;
		score = score+25;
	}
	board[shape.i][shape.j] = 2;

	//time is over
	var currentTime = new Date();
	time_elapsed = Math.round(time_num_pick-(currentTime - start_time) / 1000);
	if (clock_flag === true){
		time_elapsed += 60;
	}
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (time_elapsed <= 0 && score < 100){
		Stop();
		alert("You are better than " + score + " points!")
	}
	if (time_elapsed <= 0 && score >= 100) {
		Stop();
		alert("Winner!!!")

	}
	//clock colission -=MOR=
	if (shape.i===clock_obj.i && shape.j===clock_obj.j) {
		time_elapsed += 60;
		lblTime.value = time_elapsed;
		board[clock_obj.i][clock_obj.j] = 0;
		clock_obj.i= -1;
		clock_obj.j= -1;
		clock_flag = true;

	//collision with cake

	// collision with monster


	} else {
		Draw();
	}
}

function DisplaySettings(){
	right_key_pick = document.getElementById('right_key').value;
	left_key_pick = document.getElementById('left_key').value;
	up_key_pick = document.getElementById('up_key').value;
	down_key_pick = document.getElementById('down_key').value;
	balls_num_pick = document.getElementById('balls_num').value;
	time_num_pick = document.getElementById('time_num').value;
	monsters_num_pick = document.getElementById('monsters_num').value;

	ball5_color_pick = document.getElementById('ball5_color').value;
	ball15_color_pick = document.getElementById('ball15_color').value;
	ball25_color_pick = document.getElementById('ball25_color').value;

	$("#KeyRightDisplay").text(right_key_pick);
	$("#KeyLeftDisplay").text(left_key_pick);
	$("#KeyUpDisplay").text(up_key_pick);
	$("#KeyDownDisplay").text(down_key_pick);

	$("#ballsNum").text(balls_num_pick);
	$("#gametime").text(time_num_pick);
	$("#monstersNum").text(monsters_num_pick);

	document.getElementById('color5').style.color = ball5_color_pick;
	document.getElementById('color15').style.color = ball15_color_pick;
	document.getElementById('color25').style.color = ball25_color_pick;
}
