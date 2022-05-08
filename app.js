var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var users_list = [{username:"k",password:"k"}];
var monsters_number
var balls_number




// 4- obstacle, 2- ball , 1- food , 3-
$(document).ready(function() {
	context = canvas.getContext("2d");
	show_welcome_page();
	//Start();
});


function CheckUser(){
	let username1= document.getElementById("username").value
	let password1 = document.getElementById("password").value
	let curr_user = {username: username1,password:password1}
	let flag =0 
	for (var i = 0; i < users_list.length; i++) {
        
            if ( users_list[i].username===username1 && users_list[i].password===password1){
				flag =1
			}
        
    }

	if (flag===1){
		//if valid -  start game - setting page
		alert( "validation succeeded" );
		//location.href="run.html";
	}
	else{
		alert( "validation failed" );
	}
	
	flag =0
	show_game_page()

}


function RegisterUser(){
	let username1=  $('#username_r').val()
	let password1 = $('#password_r').val()
	let fullname1 = $('#fullname_r').val()
	let email1 =  $('#email_r').val()
	let new_user={username: username1,password:password1}
	
	if (password1.length<6){
		alert( "validation faild: password must be longer than 5 characters" );
		return 
	}
	//if password is not containing letters and numbers
	if (!(password1.match(/([a-zA-Z])/))|| (!password1.match(/([0-9])/)))
	{
		alert( "validation faild: password must contain letters and numbers" );
		return 
	}

	//if full name contain numbers
	if (!fullname1.match(/([0-9])/))
	{
		alert( "validation faild: full name  must contain letters only" );
		return 
	}
	

	users_list.push(new_user)
	console.log(users_list)

	return

}



function Check_Settings(){
	let monsters_num1=  $('#monsters_num').val()
	let balls_num1 = $('#balls_num').val()
	let time_num1 = $('#time_num').val()

	//if password is not containing letters and numbers
	if (balls_num1 <50|| balls_num1>90)
	{
		alert( "validation faild: balls number is out of range" );
		return 
	}

	//if full name contain numbers
	if (time_num1<60)
	{
		alert( "validation faild: game time is too short" );
		return 
	}

	if (monsters_num1 <1 || monsters_num1 > 4){
		alert( "validation faild: Number of monsters most be integer between 1-4" );
		return 
	}
	
	balls_number = balls_num1
	start_time = time_num1
	monsters_number =monsters_num1
	console.log("settings are good")
	return


}


//SHOW FUNCTIONS


function show_welcome_page() {
	document.getElementById('welcome_page').style.display = "flex";
	document.getElementById('register_page').style.display = "none";
	document.getElementById('login_page').style.display = "none";
	document.getElementById('settings_page').style.display = "none";
	document.getElementById('game_page').style.display = "none";
	//document.getElementById('about_page').style.display = "none";

}

function show_login_page() {
	document.getElementById('welcome_page').style.display = "none";
	document.getElementById('register_page').style.display = "none";
	document.getElementById('login_page').style.display = "flex";
	document.getElementById('settings_page').style.display = "none";
	document.getElementById('game_page').style.display = "none";
	//document.getElementById('about_page').style.display = "none";
}

function show_register_page() {
	document.getElementById('welcome_page').style.display = "none";
	document.getElementById('register_page').style.display = "flex";
	document.getElementById('login_page').style.display = "none";
	document.getElementById('settings_page').style.display = "none";
	document.getElementById('game_page').style.display = "none";
	//document.getElementById('about_page').style.display = "none";
}
function show_settings_page() {
	document.getElementById('welcome_page').style.display = "none";
	document.getElementById('register_page').style.display = "none";
	document.getElementById('login_page').style.display = "none";
	document.getElementById('settings_page').style.display = "flex";
	document.getElementById('game_page').style.display = "none";
	//document.getElementById('about_page').style.display = "none";
}

function show_game_page() {
	document.getElementById('welcome_page').style.display = "none";
	document.getElementById('register_page').style.display = "none";
	document.getElementById('login_page').style.display = "none";
	document.getElementById('settings_page').style.display = "none";
	document.getElementById('game_page').style.display = "flex";
	//document.getElementById('about_page').style.display = "none";
}

function show_about_page() {
	document.getElementById('welcome_page').style.display = "none";
	document.getElementById('register_page').style.display = "none";
	document.getElementById('login_page').style.display = "none";
	document.getElementById('settings_page').style.display = "none";
	document.getElementById('game_page').style.display = "none";
	document.getElementById('about_page').style.display = "flex";
}

function Start() {
	board = new Array();
	score = 0;
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

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}


//drawing the canvas, the player and the obstacle
function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
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
