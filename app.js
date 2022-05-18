var context;
var shape = new Object();
var board;
var score;
var lives;
var pac_color;
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
let gameMusic = new Audio('./audio/DNCE - Cake By The Ocean.mp3');

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
	show_welcome_page();
	//Start();
});

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

	if (flag===1){
		//if valid -  start game - setting page
		alert( "validation succeeded" );
		//location.href="run.html";
		show_settings_page();
		ChangeWelcomeUser(username1);
	}
	else{
		alert( "validation failed" );
		show_login_page();
	}
	
	flag =0

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
		alert( "validation failed: password must contain  English letters and numbers only" );
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

	//if password is not containing letters and numbers
	if (balls_num1 <50|| balls_num1>90)
	{
		alert( "validation failed: balls number is out of range" );
		return 
	}

	//if full name contain numbers
	if (time_num1<60)
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
	gameMusic.pause();
	gameMusic.currentTime = 0;
	document.getElementById('welcome_page').style.display = "flex";
	document.getElementById('register_page').style.display = "none";
	document.getElementById('login_page').style.display = "none";
	document.getElementById('settings_page').style.display = "none";
	document.getElementById('game_page').style.display = "none";
	//document.getElementById('about_page').style.display = "none";

}

function show_login_page() {
	gameMusic.pause();
	gameMusic.currentTime = 0;
	document.getElementById('welcome_page').style.display = "none";
	document.getElementById('register_page').style.display = "none";
	document.getElementById('login_page').style.display = "flex";
	document.getElementById('settings_page').style.display = "none";
	document.getElementById('game_page').style.display = "none";
	//document.getElementById('about_page').style.display = "none";
}

function show_register_page() {
	gameMusic.pause();
	gameMusic.currentTime = 0;
	document.getElementById('welcome_page').style.display = "none";
	document.getElementById('register_page').style.display = "flex";
	document.getElementById('login_page').style.display = "none";
	document.getElementById('settings_page').style.display = "none";
	document.getElementById('game_page').style.display = "none";
	//document.getElementById('about_page').style.display = "none";
}
function show_settings_page() {
	if (Object.keys(curr_user).length !== 0){
		gameMusic.pause();
		gameMusic.currentTime = 0;
		document.getElementById('welcome_page').style.display = "none";
		document.getElementById('register_page').style.display = "none";
		document.getElementById('login_page').style.display = "none";
		document.getElementById('settings_page').style.display = "flex";
		document.getElementById('game_page').style.display = "none";
		//document.getElementById('about_page').style.display = "none";
	}
	
}

function show_game_page() {
	gameMusic.pause();
	gameMusic.currentTime = 0;
	document.getElementById('welcome_page').style.display = "none";
	document.getElementById('register_page').style.display = "none";
	document.getElementById('login_page').style.display = "none";
	document.getElementById('settings_page').style.display = "none";
	document.getElementById('game_page').style.display = "flex";
	//document.getElementById('about_page').style.display = "none";
}

function show_about_page() {
	gameMusic.pause();
	gameMusic.currentTime = 0;
	document.getElementById('welcome_page').style.display = "none";
	document.getElementById('register_page').style.display = "none";
	document.getElementById('login_page').style.display = "none";
	document.getElementById('settings_page').style.display = "none";
	document.getElementById('game_page').style.display = "none";
	document.getElementById('about_page').style.display = "flex";
}

// ===================================== Objects creation ===========================

// function createMonster(){

// }

// function createClock(){

// }

// function createBall{

// }

// function createCake{

// }





//===================================== Start Game ===============================
function Start() {
	DisplaySettings();
	board = new Array();
	score = 0;
	lives = 3;
	gameMusic.loop = true;
	pac_color = "yellow";
	var cnt = 100; //??
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {

				//balls?
				
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}

	//food addition
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
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
	gameMusic.play();
}

function Stop(){ //Stop game 
	gameMusic.pause();
	gameMusic.currentTime = 0;
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
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
	if (keysDown[up_key]) {
		return 1;
	}
	if (keysDown[down_key]) {
		return 2;
	}
	if (keysDown[left_key]) {
		return 3;
	}
	if (keysDown[right_key]) {
		return 4;
	}
}


function Random(){

	let min = 50;
	let max= 90;
	
	//random keys
	right_key = 37 ;
	document.getElementById('right_key').value = "Arrow Right";


	left_key = 39;
	document.getElementById('left_key').value  = "Arrow Left";
	

	up_key = 38;
	document.getElementById('up_key').value  = "Arrow UP";
	

	down_key = 40;
	document.getElementById('down_key').value  = "Arrow Down";

	//random  balls
	document.getElementById('balls_num').value  = Math.floor(min + Math.random()*(max-min));
	//random time
	min=60
	max = 3000
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
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblLives.value = lives;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;

			//packman?
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();

				//eye
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();

				//ball??
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();

				//wall
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
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

	$("#keyRightDisplay").text(right_key_pick);
	$("#keyLeftDisplay").text(left_key_pick);
	$("#keyUpDisplay").text(up_key_pick);
	$("#keyDownDisplay").text(down_key_pick);

	$("#ballsNum").text(balls_num_pick);
	$("#gametime").text(time_num_pick);
	$("#monstersNum").text(monsters_num_pick);

	document.getElementById('color5').style.color = ball5_color_pick;
	document.getElementById('color15').style.color = ball15_color_pick;
	document.getElementById('color25').style.color = ball25_color_pick;
}
