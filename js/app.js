'use strict';

const player = new PlayerShip();
const invader = new Invader();

// Start the animation loop
render();

// Keydown
window.addEventListener('keydown', (e) => {
  if (!e.repeat) {
    if (e.key === 'a') {
      player.move('left');
    }
    if (e.key === 'd') {
      player.move('right');

    }
  }
});

window.addEventListener('keyup', (e) => {
  const gameScreenCollider = gameScreen.element.getBoundingClientRect();
  if (e.key === 'a') {
    const shipCollider = player.element.getBoundingClientRect();
    player.element.style.transform = (`translateX(${shipCollider.x - gameScreenCollider.x}px)`);
  }
  if (e.key === 'd') {
    const shipCollider = player.element.getBoundingClientRect();
    player.element.style.transform = (`translateX(${shipCollider.x - gameScreenCollider.x}px)`);
  }
});

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
    player.updateCanvas();
    // Move bullets and check if a player's bullet hits the top of the screen
    for (let bullet of Bullet.instances) {
      const elapsed = timestamp - bullet.animationStart;
      const count = Math.min(40 + (.6 * elapsed), 1000); // Sets speed of bullets and ensures they only move 1000px;
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
  animationState.previousTimestamp = timestamp;
  if (!animationState.done) {
    window.requestAnimationFrame(animationFrame);
  }
}

function render() {
  window.requestAnimationFrame(animationFrame);
}
