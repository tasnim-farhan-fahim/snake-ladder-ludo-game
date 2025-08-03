  const board = document.getElementById('board');
  const playerScore = document.getElementById('player-score');
  const aiScore = document.getElementById('ai-score');
  const dice = document.getElementById('dice');
  const rollBtn = document.getElementById('roll-btn');
  const message = document.getElementById('message');


  let playerPos = 0;
  let aiPos = 0;
  let currentTurn = 'player';

  // Snakes and Ladders configuration
  const snakes = {
     77: 59,
     46: 15, 
     93: 34, 
     29: 18, 
     85: 64, 
     37: 30, 
     32: 21, 
     61: 43, 
     98: 66 };
  const ladders = {
      4: 25, 
      9: 19, 
     27: 55,
     33: 86,
     48: 58,
     56: 78, 
     60: 69, 
     62: 71,
     74: 94,};

  // Create the board with diagonal colors
  function createBoard() {
      const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5'];
      for (let i = 100; i >= 1; i--) {
          const tile = document.createElement('div');
          tile.classList.add('tile');
          tile.id = `tile-${i}`;
          tile.textContent = i;
          // Assign colors in a diagonal pattern
          const row = Math.floor((100 - i) / 10);
          const col = (i - 1) % 10;
          const colorIndex = (row + col) % 5;
          tile.classList.add(colors[colorIndex]);
          if (snakes[i]) tile.classList.add('snake');
          if (ladders[i]) tile.classList.add('ladder');
          board.appendChild(tile);
      }
      updatePositions();
  }

  // Update player and AI positions
  function updatePositions() {
      document.querySelectorAll('.player, .ai').forEach(el => el.remove());
      if (playerPos > 0) {
          const playerTile = document.getElementById(`tile-${playerPos}`);
          const player = document.createElement('div');
          player.classList.add('player');
          playerTile.appendChild(player);
      }
      if (aiPos > 0) {
          const aiTile = document.getElementById(`tile-${aiPos}`);
          const ai = document.createElement('div');
          ai.classList.add('ai');
          aiTile.appendChild(ai);
      }
      playerScore.textContent = playerPos;
      aiScore.textContent = aiPos;
  }

  // Roll dice with animation
  function rollDice() {
      rollBtn.disabled = true;
      dice.classList.add('rolling');
      let rolls = 0;
      const rollInterval = setInterval(() => {
          const roll = Math.floor(Math.random() * 6) + 1;
          dice.textContent = roll;
          rolls++;
          if (rolls >= 15) { // Longer animation
              clearInterval(rollInterval);
              dice.classList.remove('rolling');
              const finalRoll = Math.floor(Math.random() * 6) + 1;
              dice.textContent = finalRoll;
              setTimeout(() => {
                  movePlayer(finalRoll);
              }, 1000); // Delay before moving
          }
      }, 100);
  }

  // Move player or AI
//   function movePlayer(roll) {
//       if (currentTurn === 'player') {
//           playerPos = Math.min(playerPos + roll, 100);
//           if (snakes[playerPos]) {
//               message.textContent = `Player hit a snake! Slid from ${playerPos} to ${snakes[playerPos]}.`;
//               playerPos = snakes[playerPos];
//           } else if (ladders[playerPos]) {
//               message.textContent = `Player climbed a ladder from ${playerPos} to ${ladders[playerPos]}!`;
//               playerPos = ladders[playerPos];
//           } else {
//               message.textContent = `Player moved to ${playerPos}.`;
//           }
//           updatePositions();
//           if (playerPos === 100) {
//               message.textContent = 'Player wins!';
//               rollBtn.disabled = true;
//               return;
//           }
//           currentTurn = 'ai';
//           setTimeout(aiTurn, 2000); // Delay before AI turn
//       } else {
//           aiPos = Math.min(aiPos + roll, 100);
//           if (snakes[aiPos]) {
//               message.textContent = `AI hit a snake! Slid from ${aiPos} to ${snakes[aiPos]}.`;
//               aiPos = snakes[aiPos];
//           } else if (ladders[aiPos]) {
//               message.textContent = `AI climbed a ladder from ${aiPos} to ${ladders[aiPos]}!`;
//               aiPos = ladders[aiPos];
//           } else {
//               message.textContent = `AI moved to ${aiPos}.`;
//           }
//           updatePositions();
//           if (aiPos === 100) {
//               message.textContent = 'AI wins!';
//               rollBtn.disabled = true;
//               return;
//           }
//           currentTurn = 'player';
//           setTimeout(() => {
//               rollBtn.disabled = false;
//           }, 1000); // Delay before enabling button
//       }
//   }
function movePlayer(roll) {
    if (currentTurn === 'player') {
        // Only move if sum <= 100
        if (playerPos + roll <= 100) {
            playerPos += roll;

            if (snakes[playerPos]) {
                message.textContent = `Player hit a snake! Slid from ${playerPos} to ${snakes[playerPos]}.`;
                playerPos = snakes[playerPos];
            } else if (ladders[playerPos]) {
                message.textContent = `Player climbed a ladder from ${playerPos} to ${ladders[playerPos]}!`;
                playerPos = ladders[playerPos];
            } else {
                message.textContent = `Player moved to ${playerPos}.`;
            }
        } else {
            message.textContent = `Player needs exact roll to reach 100! Stayed at ${playerPos}.`;
        }

        updatePositions();

        if (playerPos === 100) {
            message.textContent = 'Player wins!';
            rollBtn.disabled = true;
            document.getElementById('play-again-btn').style.display = 'block'; // Show play again button
            return;
        }

        currentTurn = 'ai';
        setTimeout(aiTurn, 2000); // Delay before AI turn

    } else {
        // Only move if sum <= 100
        if (aiPos + roll <= 100) {
            aiPos += roll;

            if (snakes[aiPos]) {
                message.textContent = `AI hit a snake! Slid from ${aiPos} to ${snakes[aiPos]}.`;
                aiPos = snakes[aiPos];
            } else if (ladders[aiPos]) {
                message.textContent = `AI climbed a ladder from ${aiPos} to ${ladders[aiPos]}!`;
                aiPos = ladders[aiPos];
            } else {
                message.textContent = `AI moved to ${aiPos}.`;
            }
        } else {
            message.textContent = `AI needs exact roll to reach 100! Stayed at ${aiPos}.`;
        }

        updatePositions();

        if (aiPos === 100) {
            message.textContent = 'AI wins!';
            rollBtn.disabled = true;
            document.getElementById('play-again-btn').style.display = 'block'; // Show play again button
            return;
        }

        currentTurn = 'player';
        setTimeout(() => {
            rollBtn.disabled = false;
        }, 1000); // Delay before enabling button
    }
}

function playAgain() {
    playerPos = 0;
    aiPos = 0;
    currentTurn = 'player';
    message.textContent = 'Game reset! Player starts.';
    updatePositions();
    rollBtn.disabled = false;
    document.getElementById('play-again-btn').style.display = 'none';
    dice.textContent = '1'; // Show placeholder instead of blank
}

  // AI turn
  function aiTurn() {
      rollDice();
  }

  // Event listener for dice roll
  rollBtn.addEventListener('click', rollDice);

  // Initialize the game
  createBoard();
