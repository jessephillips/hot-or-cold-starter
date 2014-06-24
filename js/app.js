
var globalSecret = 101;
var globalGuessNum  = 101;
var globalGuessPrev   = 101;
var globalGuessCount = 0;
var boolWin = false;

$(document).ready(function(){
	/*--- start new game on page load ---*/
	startNewGame();

	/*--- make a guess ---*/
	$("form").on('click', '#guessButton', function(e) {
		e.preventDefault();
		if ( boolWin ) { // user just won, so this click should start a new game
			startNewGame();
		} else { // user hasn't won yet, so loging a guess.
			var userGuessBox = $("form").find('#userGuess');
			makeGuess(userGuessBox.val());
			userGuessBox.val("");
			if ( globalSecret == globalGuessNum ) {
				boolWin = true;
				$('#guessButton').val("Start New Game");
			}
		}
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

	if (howFarOff == 0 ) {
		return "YOU GOT IT!";
	} else if ( howFarOff < 3 ) {
		return "super hot!";
	} else if ( howFarOff < 5) {
		return "very hot!";
	} else if ( howFarOff < 10 ) {
		return "hot!";
	} else if ( howFarOff < 20 ) {
		return "warm";
	} else if ( howFarOff < 30 ) {
		return "tepid";
	} else if ( howFarOff < 40 ) {
		return "cool";
	} else if ( howFarOff < 60 ) {
		return "cold";
	} else if ( howFarOff < 80 ) {
		return "ice cold";
	} else if ( howFarOff < 90 ) {
		return "arctic";
	}

}