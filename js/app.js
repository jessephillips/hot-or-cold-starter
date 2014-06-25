
var globalSecret = 101;
var globalGuessNum  = 101;
var globalGuessPrev   = 101;
var globalGuessCount = 0;
var boolWin = false;

$(document).ready(function(){
	/*--- start new game on page load ---*/
	startNewGame();

	/*--- start new game on click +New Game link ---*/
	$('nav').on('click', '.new', function(e) {
		e.preventDefault();
		startNewGame();
	});

	/*--- make a guess ---*/
	$("form").on('click', '#guessButton', function(e) {
		e.preventDefault();
		var userGuessBox = $("form").find('#userGuess');
		var theGuess = userGuessBox.val();
		
		if ( !boolWin ) {
				
			if (validateInput(theGuess)) { // user hasn't won yet, so loging a guess.
				console.log("got to make guess");
				makeGuess(theGuess); // make a guess
				if ( globalSecret == globalGuessNum ) {
					boolWin = true;
					$('#guessButton').val("Click +New Game");
				}
			}

		} else {
			alert("Click '+New Game' to start a new game");
		}

		userGuessBox.val(""); // either way remove the guess from the box
	});

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

});

function startNewGame() {
	boolWin = false;
	globalGuessCount = 0; // set guess count to 0
	globalGuessNum = 101;
	globalGuessPrev = 101; // reset global guess & prevGuess
	globalSecret = Math.floor(Math.random() * 100) + 1; // reset the secret number
	
	$('#feedback').text('Make your Guess!'); // reset feedback text
	$('#guessList').empty(); // remove all guesses
	$('#count').text("0"); // set guess count on the screen to 0
	$('#guessButton').val("Guess");
}

function makeGuess (guess) {
	globalGuessPrev = globalGuessNum; // set prev guess to old current guess
	globalGuessNum = guess; // set globalGuessNum
	$('#guessList').append($('<li>'+guess+'</li>')); // append guess to list

	globalGuessCount++; // increment guess count & on the UI
	$('#count').text(+globalGuessCount);

	$('#feedback').text(guessFeedback(guess)); // update feedback based on guess
}

function guessFeedback ( guess ) {
	var howFarOff = Math.abs( globalSecret - guess );
	var feedback = "---";
	var distance = "...";

	if (guess >= globalSecret ) {
		feedback = "<- ";
	} else {
		feedback = "-> ";
	}

	if (howFarOff == 0 ) {
		return "YOU GOT IT!";
	} else if ( howFarOff < 3 ) {
		distance = "super hot!";
	} else if ( howFarOff < 5) {
		distance = "very hot!";
	} else if ( howFarOff < 10 ) {
		distance =  "hot!";
	} else if ( howFarOff < 20 ) {
		distance = "very warm";
	} else if ( howFarOff < 30 ) {
		distance = "warm";
	} else if ( howFarOff < 40 ) {
		distance = "cool";
	} else if ( howFarOff < 60 ) {
		distance = "cold";
	} else if ( howFarOff < 80 ) {
		distance = "ice cold";
	} else if ( howFarOff < 90 ) {
		distance = "arctic";
	}

	return feedback + distance;
}

function validateInput ( aGuess ) {
	var stringToNum = +aGuess;

	if ( isNaN(stringToNum) ) {
		alert("you must enter a number between 1-100. you entered: " + aGuess + ". Please try again." );
		return false;
	} else if ( stringToNum % 1 != 0 ) {
		alert("You must enter an integer (non-decimal) between 1-100. You entered: " + stringToNum + ". Please try again.");
		return false;
	} else if ( stringToNum > 100 || stringToNum < 1 ) {
		alert("You must enter a number between 1-100. you entered: " + stringToNum );
		return false;
	} else {
		return true;
	}

}