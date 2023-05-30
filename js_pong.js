// Game State
var gameState = false,
	frameUpdate = 10;

// Page Loaded
window.addEventListener("load", function () {
	// Game Canvas
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d");

	// Buttons
	var btn_start = this.document.getElementById('btn_start'),
		btn_re = document.getElementById('btn_restart'),
		btn_Sound = document.getElementById('btn_sound');

	// Game Sound
	var bounceSFX = new Audio(),
		scoreSFX = new Audio(),
		soundState = false;

	bounceSFX.src = "sound/pong.wav";
	scoreSFX.src = "sound/score.wav";

	// Ball Movement
	var posX = 100,
		stapX = 2,
		posY = 100,
		stapY = 2;

	// Players Paddles
	var rightY = 100,
		leftY = 100;

	// Player Scores
	var scoreP1 = 0,
		scoreP2 = 0,
		displayScore1 = document.getElementById('scorep1'),
		displayScore2 = document.getElementById('scorep2');

	// Button Events
	btn_start.addEventListener('click', function () {
		gameState = !gameState;

		if (gameState) {
			btn_start.value = 'Pause Game';
			playGame();

			//btn_start.style.display = 'none';
		} else {
			btn_start.value = 'Start Game';
		}
		console.log("Play Game: " + gameState);
	})

	// Sound Button
	btn_Sound.addEventListener("click", function () {
		soundState = !soundState;
		if (soundState) {
			btn_Sound.style.textDecoration = 'underline';
		} else {
			btn_Sound.style.textDecoration = 'none';
		}
	})


	// Restart Button
	btn_re.addEventListener("click", function () {
		scoreP1 = 00;
		displayScore1.innerHTML = scoreP1;
		scoreP2 = 00;
		displayScore2.innerHTML = scoreP2;
		posX = 400;
	})

	// User Input
	window.addEventListener("keydown", function (e) {
		//Player 1 Movement
		if (e.key == 'w' && leftY != 0) {
			leftY -= 10;
		}
		if (e.key == 's' && leftY != 350) {
			leftY += 10;
		}

		// Player 2 Movement
		if (e.key == 'ArrowUp' && rightY != 0) {
			rightY -= 10;
		}
		if (e.key == 'ArrowDown' && rightY != 350) {
			rightY += 10;
		}
	})

	function playGame() {
		var drawInterval;

		if (gameState) {

			function draw() {
				console.log("Start Draw");
				// Draw Pong Ball
				context.clearRect(0, 0, 800, 450);
				context.fillStyle = "red";
				context.fillRect(posX, posY, 50, 50);
				// Draw Player 1
				context.fillStyle = "yellow";
				context.fillRect(10, leftY, 15, 100);
				// Draw Player 2
				context.fillStyle = "green";
				context.fillRect(770, rightY, 15, 100);

				// Pong Ball Movement
				posX += stapX;
				posY += stapY;

				// Pong Ball Collision Player 1
				if (posX >= 0 &&
					posX <= 20 &&
					posY >= leftY - 80 &&
					posY <= leftY + 100) {
					stapX = -stapX;
					if (soundState) {
						bounceSFX.playbackRate = 0.25;
						bounceSFX.play()
					};
				}

				// Pong Ball Collision Player 2
				if (posX + 50 >= 775 &&
					posX + 50 <= 800 &&
					posY >= rightY - 100 &&
					posY <= rightY + 80) {
					stapX = -stapX;
					if (soundState) {
						bounceSFX.playbackRate = 0.25;
						bounceSFX.play()
					};
				}

				// Pong Ball Score Player 1
				if (posX > 750) {
					posX = 400;
					scoreP1++;
					displayScore1.innerHTML = scoreP1;
					if (soundState) {
						scoreSFX.play()
					};
				}
				// Pong Ball Score Player 2
				if (posX < 0) {
					posX = 400;
					scoreP2++;
					displayScore2.innerHTML = scoreP2;
					if (soundState) {
						scoreSFX.play()
					};
				}

				// Pong Ball Bounce Wall
				if (posY < 0 || posY > 400) {
					stapY = -stapY;
					if (soundState) {
						bounceSFX.playbackRate = bounceSFX.defaultPlaybackRate;
						bounceSFX.play()
					};
				}
			}

			// Canvas Draw Update
			drawInterval = setInterval(draw, frameUpdate);

		} else {
			clearInterval(drawInterval);
		}

	}

})





