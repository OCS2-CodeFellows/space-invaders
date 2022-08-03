'use strict';

const invaderBox = new InvaderBox();
const player = new PlayerShip();
new Invader(0, 10, [0, 0]);
new Invader(1, 10, [0, 1]);
new Invader(2, 10, [0, 2]);
// new Invader(0, 10, [0, 3]);
// new Invader(1, 10, [0, 4]);
// new Invader(0, 10, [0, 5]);
// new Invader(3, 10, [1, 0]);
// new Invader(4, 10, [1, 1]);
// new Invader(3, 10, [1, 2]);
// new Invader(4, 10, [1, 3]);
// new Invader(3, 10, [1, 4]);
// new Invader(4, 10, [1, 5]);
// new Invader(5, 10, [2, 0]);
// new Invader(6, 10, [2, 1]);
// new Invader(5, 10, [2, 2]);
// new Invader(6, 10, [2, 3]);
// new Invader(5, 10, [2, 4]);
// new Invader(6, 10, [2, 5]);


const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const inputScreen = document.getElementById('inputScreen');
const nameForm = document.forms.playerName;
// Start the animation loop
startButton.addEventListener('click', startGame);
// render();

// Keydown
window.addEventListener('keydown', (e) => {
  if (!e.repeat) {
    if (e.key === 'a' || e.key === 'ArrowLeft') {
      player.move('left');
    }
    if (e.key === 'd' || e.key === 'ArrowRight') {
      player.move('right');
    }
    if (e.key === 'Enter') {
      endGame()
    }
  }
});

// On keyup, place ship in its current spot, stopping CSS transition.
window.addEventListener('keyup', (e) => {
  const gameScreenCollider = gameScreen.element.getBoundingClientRect();
  if (e.key === 'a' || e.key === 'ArrowLeft') {
    const shipCollider = player.element.getBoundingClientRect();
    player.element.style.transform = (`translateX(${shipCollider.x - gameScreenCollider.x}px)`);
  }
  if (e.key === 'd' || e.key === 'ArrowRight') {
    const shipCollider = player.element.getBoundingClientRect();
    player.element.style.transform = (`translateX(${shipCollider.x - gameScreenCollider.x}px)`);
  }
});

// Lets us shoot bullets.
window.addEventListener('keydown', (e) => {
  if (!e.repeat) {
    if (e.key === ' ' && Bullet.instances.length < constants.MAXBULLETS) {
      console.log('pew');
      new Bullet();
    }
  }
});








// This function runs on every frame.
function animationFrame(timestamp) {
  animationState.done = false;
  // console.log("TIMESTAMP", timestamp)
  const screenRect = gameScreen.element.getBoundingClientRect();

  // if (animationState.reset) {
  //   animationState.start = timestamp;
  // }

  // Later this should loop over everything on the screen that needs to be animated/moved. Not just bullets
  // It sets the start time of the object's animation so that we can compare it to a GLOBAL timestamp for elapsed time

  for (let bullet of Bullet.instances) {
    if (bullet.animationStart === undefined) {
      bullet.animationStart = timestamp;
    }
  }
  // if (animationState.start === undefined) {
  //   animationState.start = timestamp;
  // }

  // console.log("PREVIOUS", animationState.previousTimestamp)
  // console.log("CURRENT", timestamp)
  // This is our "main loop", where all the actual animation/check work should be done.
  if (animationState.previousTimestamp !== timestamp) {

    if (timestamp - animationState.previousTimestamp >= 500) {
      animationState.previousTimestamp = timestamp;
      for (let invader of Invader.instances) {
        invader.nextSprite();
      }
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

      // console.log(elapsed);
      // console.log(count);
      // console.log("COUNT", count);
      bullet.element.style.bottom = `${count}px`;
      if (bulletRect.top <= screenRect.top) {
        bullet.removeBullet();
      }
    }

    const collision = Collider.checkCollisions();
    if (collision) {
      for (let collider of collision) {
        // Check if one of the colliders in a collision is a bullet
        if (collider.element.classList.contains('bullet')){
          for (let bullet of Bullet.instances) {
            if (collider.element === bullet.element) {
              bullet.removeBullet();
            }
          }
        }
        // TODO: Check if one of the colliders in a collision is an invader (INVADER BULLETS SHOULD PASS THROUGH OTHER INVADERS)

        // TODO: Check if one of the colliders in a collision is the player
      }

    }
    // if (!bullets.length) animationState.done = true;
  }
  // if (elapsed < 1000)
  // animationState.previousTimestamp = timestamp;
  if (!animationState.done) {
    window.requestAnimationFrame(animationFrame);
  }
}

function startGame() {
  startScreen.classList.add('hidden');
  invaderBox.layoutInvaders();
  render();
}

function endGame() {
  animationState.done = true;
  inputScreen.classList.remove('hidden');
}

function submitName(event) {
  event.preventDefault();
  console.log("do stuff")
}

function render() {
  window.requestAnimationFrame(animationFrame);
}
