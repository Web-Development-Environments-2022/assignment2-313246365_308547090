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
var interval_cake;
var monter_interval1;
var monter_interval2;
var monster_interval3;
var monster_interval4;
var monsters_intervals;
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
	curr_user = {username: username1, password: password1}
	let flag = 0 
	for (var i = 0; i < users_list.length; i++) {
        
            if ( users_list[i].username===username1 && users_list[i].password===password1){
				flag = 1
			}
        
    }

	if (flag === 1){
		//if valid -  start game - setting page
		//location.href="run.html";
		show_settings_page();
		ChangeWelcomeUser(username1);
	}
	else{
		alert( "validation failed" );
		//show_login_page();
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
// [0] cake +50 points -> (10,15)
// [1] monster -10 points-> (1,10)
// [2] monster -20 points-> (10,19)
// [3] monster -10 points-> (19,10)
// [4] monster -20 points-> (10,1)




function create_moving_objects_array(monsters_number){
	moving_objects_array = new Array();
 	
	// create cake:
	 moving_objects_array[0] = new Object();
	 moving_objects_array[0].points = 50;
	 moving_objects_array[0].kind = "cake";
	 moving_objects_array[0].image = new Image();
	 moving_objects_array[0].i = 10;
	 moving_objects_array[0].j= 10;
	 moving_objects_array[0].i_origin = 10;
	 moving_objects_array[0].j_origin =10 ;
	 moving_objects_array[0].image = new Image();
	 //(moving_objects_array[0].image).src = "images/cake.png";
	 (moving_objects_array[0].image).src = "images/Cupcake.png";
	 moving_objects_array[0].isActive =true;
	 console.log("finish create cake");


	 let max_index = 1+monsters_number;
	for (let i = 1; i< 5 ; i++) {

		if(i===1 ||i===3){
		moving_objects_array[i] = new Object();
		moving_objects_array[i].points = -10;
		moving_objects_array[i].kind = "monster10";
		moving_objects_array[i].image = new Image();
		(moving_objects_array[i].image).src = "images/10monster.png";
		moving_objects_array[i].isActive =true;
		console.log("finish create 10monster");
		
		}
		if(i===2 ||i===4){
			moving_objects_array[i] = new Object();
			moving_objects_array[i].points = -20;
			moving_objects_array[i].kind = "monster20";
			moving_objects_array[i].image = new Image();
			(moving_objects_array[i].image).src = "images/20monster.png";
			moving_objects_array[i].isActive =true;
			
		}
		console.log("finish create 20monster");

		if(i<max_index){

			moving_objects_array[i].isActive =true;
		}

		if (i>max_index){
			moving_objects_array[i].isActive =false;
		}
		if (i === max_index){
			moving_objects_array[i].isActive =false;
		}


		
		
		
 	}

	 moving_objects_array[1].i= 1;
	 moving_objects_array[1].j= 1;
	 moving_objects_array[1].i_origin = 1;
	 moving_objects_array[1].j_origin =1 ;

	 moving_objects_array[2].i= 1;
	 moving_objects_array[2].j= 18;
	 moving_objects_array[2].i_origin =1 ;
	 moving_objects_array[2].j_origin =18 ;
	 
	 moving_objects_array[3].i= 18;
	 moving_objects_array[3].j= 1;
	 moving_objects_array[3].i_origin =18 ;
	 moving_objects_array[3].j_origin =1 ;
	 
	 moving_objects_array[4].i=18 ;
	 moving_objects_array[4].j= 18;
	 moving_objects_array[4].i_origin =18 ;
	 moving_objects_array[4].j_origin = 18;

	
	let limit = moving_objects_array.length -monsters_number-1 ;
	console.log("limit is:" + limit);

	for (let i = 0; i< limit ; i++) {
		moving_objects_array.pop();
		console.log("pop" +i);

	}

	console.log("final numbers in moving list"+moving_objects_array.length);
	 //update place for monsters:
	 // [0] cake +50 points -> (10,15)
	// [1] monster -10 points-> (1,10)
	// [2] monster -20 points-> (10,19)
	// [3] monster -10 points-> (19,10)
	// [4] monster -20 points-> (10,1)
	 




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
		//console.log("befor find random")
		var emptyCell = findRandomEmptyCell(board);
		console.log("after find random")
		board[emptyCell[0]][emptyCell[1]] = 5;

	}
	//console.log("first loop ended")

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
	monsters_number = $('#monsters_num').val();

	console.log("monsters number" +monsters_number);
	create_moving_objects_array(monsters_number);
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
				(i == 6 && j == 2) ) {
				board[i][j] = 4;
			} 

			
			// put walls- MOR
			if ((i == 0) || (j===0) || (i===rows-1)||j===cols-1 ) {
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
	
	//console.log("before place balls in start")
	placeBalls(board);
	//console.log("after place balls in start")
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
	interval_cake = setInterval(UpdateCakePosition, 400);

	monsters_intervals =new Array();
	
	console.log("monsters_number");
	console.log(monsters_number);
	
	//for (let index = 1; index < monsters_number+1; index++) {
		
	monsters_intervals = setInterval(UpdateMonsterPosition, 400);
	console.log("interval monster number" );

	//}

	// console.log("interval monster 1" );
	// monster_interval1 =setInterval(UpdateMonster1Position, 400);
	// console.log("after interval monster 1" );
	//monster_interval2 =setInterval(UpdateMonsterPosition(2), 400);
	//monster_interval3 = setInterval(UpdateMonsterPosition(3), 400);
	//monster_interval4 = setInterval(UpdateMonsterPosition(4), 400);
	
	// gameMusic.play();
}

function Stop(){ //Stop game 
	window.clearInterval(interval);
	clock_flag = false;
	gameMusic.pause();
	gameMusic.currentTime = 0;
}

function findRandomEmptyCell(board) {
	//console.log("before random")
	var i = Math.floor(Math.random() * (rows-1) + 1);
	var j = Math.floor(Math.random() * (cols-1) + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * (rows-1) + 1);
		j = Math.floor(Math.random() * (cols-1) + 1);
	}
	//console.log("after random")
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
				img_clock.src="images/time.png";
				context.drawImage(img_clock,center.x - (width/2), center.y - (width/2), width, width);
			}
			//draw cake and goests
			
			// console.log("before cakes and monsters");
			// console.log((moving_objects_array[0]).i);

			//let moving_num= monsters_number +1;
			//TODO - THE LENGTH 
			for (let k = 0; k<moving_objects_array.length ; k++) {
				const curr_object =moving_objects_array[k];

				if( i=== curr_object.i && j=== curr_object.j ){

					//if( curr_object.isActive === true){
					context.drawImage(curr_object.image,center.x - (width/2), center.y - (width/2), width, width);
					//}
				}
			}


			
			

		}
	}


}


function UpdateCakePosition(){
	let i_now = moving_objects_array[0].i;
	let j_now = moving_objects_array[0].j;
	let move_right = [i_now,j_now+1];
	let move_left = [i_now,j_now-1];
	let move_up = [1+i_now,j_now];
	let move_down = [i_now-1,j_now];
	
	let random_dir = Math.floor(Math.random() * 4 + 1);
	let direction;
	let stop= false;
	while(stop===false){
		switch (random_dir) {
			case 1:
				direction = move_right;
			break;
			case 2:
				direction =move_left;
			break;
			case 3:
				direction = move_up;
			break;
			case 4:
				direction =	move_down;

		}
		if(board[direction[0]][direction[1]] !==4 ){
			stop=true;
		}

		
	}
	moving_objects_array[0].i= direction[0];
	moving_objects_array[0].j= direction[1];

	return direction;
}


function UpdateMonsterPosition(){

	for (let index = 1; index < monsters_number +1 ; index++){	

		if(moving_objects_array[index].isActive ===true){
			console.log ("START - UpdateMonsterPosition");
			let packman_i= shape.i;
			let packman_j= shape.j;
			let i_now = moving_objects_array[index].i;
			let j_now = moving_objects_array[index].j;
			console.log("i_now is: ")
			console.log(i_now);
			console.log("j_now is: ")
			console.log(j_now);

			let direction= new Array();
			//move right
			direction[0] = new Object();
			direction[0].index_i = i_now;
			direction[0].index_j = j_now+1;
			direction[0].dist = Math.abs(packman_i-direction[0].index_i) + Math.abs(packman_j-direction[0].index_j);

			console.log("monster1 ")
			console.log("i_now is: ")
			console.log(direction[0].index_i);
			console.log("j_now is: ")
			console.log(direction[0].index_j);
			console.log("dist: ")
			console.log(direction[0].dist);

			//move left
			direction[1] = new Object();
			direction[1].index_i =i_now;
			direction[1].index_j = j_now-1;
			direction[1].dist = Math.abs(packman_i-direction[1].index_i) + Math.abs(packman_j-direction[1].index_j);

			//move up
			direction[2] = new Object();
			direction[2].index_i =1+i_now;
			direction[2].index_j = j_now;
			direction[2].dist = Math.abs(packman_i-direction[2].index_i) + Math.abs(packman_j-direction[2].index_j);

			//move down 
			direction[3] = new Object();
			direction[3].index_i =i_now-1;
			direction[3].index_j = j_now;
			direction[3].dist = Math.abs(packman_i-direction[3].index_i) + Math.abs(packman_j-direction[3].index_j);

			let possible_directions = new Array();
			let possible_dists = new Array();
			
			
			for (let dir = 0; dir< 4; dir++) {
				if (board[direction[dir].index_i][direction[dir].index_j] !==4){
					possible_directions.push(dir);
					possible_dists.push(direction[dir].dist);
					console.log("possible_dists");
					console.log(possible_dists);
				}

			}
			let min = Math.min.apply(Math, possible_dists);
			console.log("min is: ");
			console.log(min);

			let min_index = possible_dists.indexOf(min);
			
			console.log("min index is: ");
			console.log(min_index);
			//updating monster location

			//updating monster location
			let good_i = direction[possible_directions[min_index]].index_i;
			let good_j = direction[possible_directions[min_index]].index_j;
			console.log("good i: " + good_i);
			console.log("good j: " + good_j);

			moving_objects_array[index].i =good_i;
			moving_objects_array[index].j =good_j;
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

	
	//console.log("after checking colission with monsters ")
	} else {

		// collision with monster - TODO
		console.log("before checking colission with monsters ")
		for (var k = 0; k< moving_objects_array.length; k++) {

		console.log("monster limit in loop"+ (monsters_number+1));
		const curr_object =moving_objects_array[k];
		const curr_points = curr_object.points;
		const curr_is_active = curr_object.points;
		console.log("curr points "+ curr_points);

			if( shape.i=== curr_object.i && shape.j=== curr_object.j){
				
				//curr_object.isActive = true;
				score  = score + curr_points ;
				//console.log("score");
				//console.log(score);

				if (score<0){
					score=0;
				}



				if (curr_object.kind ==="monster20"){
					
					lives= lives-2;
					console.log("score");
					console.log(score);

					if(lives===0||lives<0){
						Stop();
						alert("===== LOSER!!! =====");
					}

				}
				
				if(curr_object.kind ==="monster10"){
					lives= lives-1;
					if(lives===0||lives<0){
						Stop();
						alert("===== LOSER!!! =====");
					}
				}
				
				for(let index= 0; index<moving_objects_array.length;index++){

					//disappeare moving item
					moving_objects_array[index].i= moving_objects_array[index].i_origin;
					moving_objects_array[index].j= moving_objects_array[index].j_origin;
				}
				
				//packman new place
				var random1 = findRandomEmptyCell(board);
				board[shape.i][shape.j] =0;
				shape.i =random1[0];
				shape.j =random1[1];
				break;

			}
		}

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
