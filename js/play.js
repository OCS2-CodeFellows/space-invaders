'use strict';
Score.loadScores();
updateBannerScores();

let invaderBox = new InvaderBox();
const player = new PlayerShip();


function spawnWave() {
  for (let bullet of Bullet.instances) {
    bullet.removeBullet();
  }

  for (let box of InvaderBox.instances) {
    box.removeInvaderBox();
  }

  invaderBox = new InvaderBox();
  gameState.invaderSpeed *= .95;
  gameState.invaderStepSize *= 1.05;
  // console.log("INVADER SPEED:", gameState.invaderSpeed);
  // console.log("INVADER STEP SIZE:", gameState.invaderStepSize);

  // Remove old bullets when spawning in a new wave.

  new Invader(0, 10, [0, 0]);
  new Invader(0, 10, [0, 1]);
  new Invader(0, 10, [0, 2]);
  new Invader(0, 10, [0, 3]);
  new Invader(0, 10, [0, 4]);
  new Invader(3, 10, [1, 0]);
  new Invader(4, 10, [1, 1]);
  new Invader(3, 10, [1, 2]);
  new Invader(4, 10, [1, 3]);
  new Invader(3, 10, [1, 4]);
  new Invader(6, 10, [2, 0]);
  new Invader(6, 10, [2, 1]);
  new Invader(6, 10, [2, 2]);
  new Invader(6, 10, [2, 3]);
  new Invader(6, 10, [2, 4]);
  new Invader(1, 10, [3, 0]);
  new Invader(2, 10, [3, 1]);
  new Invader(1, 10, [3, 2]);
  new Invader(2, 10, [3, 3]);
  new Invader(1, 10, [3, 4]);
  invaderBox.layoutInvaders();
}


// keydown handler
function handleActions(e) {
  if(e.key === ' ') {
    e.preventDefault();
  }
  if (!e.repeat) {
    if (e.key === 'a' || e.key === 'ArrowLeft') {
      player.move('left');
    }
    if (e.key === 'd' || e.key === 'ArrowRight') {
      player.move('right');
    }
    if (e.key === 'Escape') {
      endGame();
    }
    if (e.key === ' ' && Bullet.instances.length < constants.MAXBULLETS) {
      new Bullet();
    }
  }
}
// keyup handler
function handleStop(e) {
  const screenBound = gameScreen.element.getBoundingClientRect();
  if (e.key === 'a' || e.key === 'ArrowLeft') {
    const shipBound = player.element.getBoundingClientRect();
    player.element.style.transform = (`translateX(${shipBound.x - screenBound.x}px)`);
  }
  if (e.key === 'd' || e.key === 'ArrowRight') {
    const shipBound = player.element.getBoundingClientRect();
    player.element.style.transform = (`translateX(${shipBound.x - screenBound.x}px)`);
  }
}

window.addEventListener('keydown', handleActions);
// On keyup, place ship in its current spot, stopping CSS transition.
window.addEventListener('keyup', handleStop);


// This function runs on every frame.
function animationFrame(timestamp) {
  if (Invader.instances.length <= 0) {
    spawnWave();
  }
  const screenBound = gameScreen.element.getBoundingClientRect();

  for (let bullet of Bullet.instances) {
    if (bullet.animationStart === undefined) {
      bullet.animationStart = timestamp;
    }
  }
  if (animationState.start === undefined) {
    animationState.start = timestamp;
  }

  // This is our "main loop", where all the actual animation/check work should be done.
  if (animationState.previousTimestamp !== timestamp) {

    // Executes the code block once every (gameState.invaderSpeed)ms
    if (timestamp - animationState.previousTimestamp >= gameState.invaderSpeed) {
      animationState.previousTimestamp = timestamp;
      for (let invader of Invader.instances) {
        invader.nextSprite();
      }
      invaderBox.stepInvaders();
    }
    player.updateCanvas();
    for (let invader of Invader.instances) {
      invader.updateCanvas();
    }
    // Move bullets and check if a player's bullet hits the top of the screen
    for (let bullet of Bullet.instances) {
      const elapsed = timestamp - bullet.animationStart;
      const count = Math.min(40 + (.5 * elapsed), 1000); // Sets speed of bullets and ensures they only move 1000px;
      const bulletRect = bullet.element.getBoundingClientRect();

      bullet.element.style.bottom = `${count}px`;
      if (bulletRect.top <= screenBound.top) {
        bullet.removeBullet();
      }
    }

    const collision = Collider.checkCollisions();
    if (collision) {
      const c1 = collision[0];
      const c2 = collision[1];
      if (c1.element.classList.contains('bullet') && c2.element.classList.contains('invader') ||
      c2.element.classList.contains('bullet') && c1.element.classList.contains('invader')) {
        for (let bullet of Bullet.instances) {
          if (c1.element === bullet.element || c2.element === bullet.element) {
            bullet.removeBullet();
          }
        }
        for (let invader of Invader.instances) {
          if (c1.element === invader.element || c2.element === invader.element) {
            incrementScore(invader);
            invader.removeInvader();
          }
        }
      }
    }
    for (let invader of Invader.instances) {
      const invaderBound = invader.element.getBoundingClientRect();
      const gameOverLine = screenBound.bottom - 32;
      if (invaderBound.bottom >= gameOverLine) {
        endGame();
      }
    }

    if (!animationState.done) {
      window.requestAnimationFrame(animationFrame);
    }
  }
}

function endGame() {
  console.log('GAME OVER');
  animationState.done = true;
  window.removeEventListener('keydown', handleActions);
  gameOverScreen.classList.remove('hidden');
}



function render() {
  window.requestAnimationFrame(animationFrame);
}

const initialsForm = document.forms.initialsForm;

function submitScore() {
  let playerInitials = '';
  const initialsInputs = document.querySelectorAll('.input-initial');
  for (let initial of initialsInputs) {
    playerInitials += initial.value.toUpperCase();
  }
  new Score(playerInitials, gameState.score);
  Score.saveScores();
}

initialsForm.addEventListener('submit', submitScore);
initialsForm.addEventListener('input', (e) => {
  if (e.target.nextElementSibling) {
    e.target.nextElementSibling.focus();
  } else {
    initialsForm.submitButton.focus();
  }
});

render();
