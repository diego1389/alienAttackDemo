//Game variables
var alienPositionX;
var alienPositionY;
var positionYGap;
var guessX;
var guessY;
var userGuesses = 0;
var remainingGuesses = 8;
var gameWon = false;


//Game logic
var  playGame = function(){
	guessX = $("#guessX").val();
	guessY = $("#guessY").val(); 

	if(validatePosition(guessX) && validatePosition(guessY))
	{
		renderCannon(guessX, guessY);
		 if(remainingGuesses > 0){
			$("#result").empty();

			guessAlienPosition(guessX, guessY, alienPositionX, alienPositionY);
		 	userGuesses++;
			remainingGuesses--;
		}else{
			//endgame
			alert("GAME OVER");
		}
	}else{
		$("#result").html("Write valid positions");
	}
	return false;
}

var guessAlienPosition = function(userGuessX, userGuessY){
	if(!gameWon){

		if(userGuessX == alienPositionX && userGuessY == alienPositionY){
			gameWon = true;
			alert("WON");
		}else{
			recalculateAlienPosition();		
		}
	}
}

var setAlienFirstPosition = function(remGuesses){
	var limitFirstYValue = Math.floor(300 / remGuesses);
	alienPositionX = Math.floor((Math.random() * 299) + 1)
	alienPositionY = Math.floor((Math.random() * limitFirstYValue ) + 1)

	positionYGap = Math.floor((299 - alienPositionY)/ remGuesses);
	renderAlien(alienPositionX, alienPositionY);
	$("#result").html("X: " + alienPositionX + " Y: " +alienPositionY);
}

var recalculateAlienPosition = function(){
	alienPositionX = Math.floor((Math.random() * 299) + 1);
	alienPositionY = alienPositionY + positionYGap;
	renderAlien(alienPositionX, alienPositionY);
	$("#result").html("X: " + alienPositionX + " Y: " +alienPositionY);
}

var validatePosition = function(number){
	if(!isNaN(number) && number != ""){
		return true;
	}else{
		return false;
	}
}

var renderAlien = function(alienX, alienY){	
	$("#alien").css("left", validateRenderPositions(alienX) + "px");
	$("#alien").css("top", validateRenderPositions(alienY) + "px");
}

var renderCannon  = function(posX, posY){
	$("#cannon").css("left", validateRenderPositions(posX) + "px");
	renderMissile(posX, posY);
}	

var renderMissile = function(x, y){

	$("#missile").css("left", validateRenderPositions(x) + "px");
	$("#missile").css("top", validateRenderPositions(y) + "px");
}

var validateRenderPositions = function(position){
	var positionFixed = position;

	if (positionFixed  > 280){
		positionFixed = 280;
	}
	return positionFixed;
};

//Fire events
$("#guessX").keydown(function(event) {
  if(event.keyCode === 13)
	{
		playGame();
	}

});

$("#guessY").keydown(function(event) {
  if(event.keyCode === 13)
	{
		playGame();
	}
});


$( document ).ready(function() {
  setAlienFirstPosition(remainingGuesses);
});