


const spaceship = {
  element: document.querySelector('.spaceship-canvas'),
  position: 0,
};

spaceship.collider = new Collider(spaceship.element, true);

const invader = new Invader()


const bullets = [];

// Keydown
window.addEventListener('keydown', (e) => {
  if (!e.repeat) {
    if (e.key === 'a') {
      isMoving = true;
      moveDirection = 'left';
      // speed -= 0.1
      // window.requestAnimationFrame(moveLoop)
      move(spaceship, 'left');
    }
    if (e.key === 'd') {
      isMoving = true;
      moveDirection = 'right';
      // speed -= 0.1
      // window.requestAnimationFrame(moveLoop)
      move(spaceship, 'right');

    }
  }
});

window.addEventListener('keyup', (e) => {
  const gameScreenCollider = gameScreen.getBoundingClientRect();
  if (e.key === 'a') {
    const shipCollider = spaceship.element.getBoundingClientRect();
    spaceship.element.style.transform = (`translateX(${shipCollider.x - gameScreenCollider.x}px)`);
  }
  if (e.key === 'd') {
    const shipCollider = spaceship.element.getBoundingClientRect();
    spaceship.element.style.transform = (`translateX(${shipCollider.x - gameScreenCollider.x}px)`);
  }
});

window.addEventListener('keydown', (e) => {
  if (!e.repeat) {
    if (e.key === ' ' && bullets.length <= 3) {
      console.log('pew');
      newBullet = createBullet();
    }
  }
});



// NOTE - Need to create a bullet class/constructor
// bulletFrame should run any time there is a bullet on-screen
// So we need to only stop it if the instance array of Bullets is empty. Not every time a collision happens!
// We need to create a way to check if a bullet has collided with an enemy or the screen, then get THAT bullet out of the array.



function bulletFrame(timestamp) {
  animationState.done = false;
  if (animationState.reset) {
    animationState.start = timestamp;
  }
  animationState.reset = false;
  // animationState.done = false;
  if (animationState.start === undefined) {
    animationState.start = timestamp;
  }
  const elapsed = timestamp - animationState.start;
  // console.log("PREVIOUS", animationState.previousTimestamp)
  // console.log("CURRENT", timestamp)
  if (animationState.previousTimestamp !== timestamp) {
    for (bullet of bullets) {
      let spaceFromBottom = parseInt(bullet.element.style.bottom.replace('px', ''));
      bullet.element.style.bottom = `${spaceFromBottom += 5}px`;
    }
    const collision = Collider.checkCollisions();
    if (collision) {
      const bulletIndex = bullets.findIndex(checkBullet => {
        for (collider of collision) {
          if (collider.element === checkBullet.element) {
            return checkBullet.element === collider.element;
          }
        }
      });
      
      bullets[bulletIndex].element.remove();
      bullets.splice(bulletIndex, 1);

    }
    if (!bullets.length) animationState.done = true;
  }

  if (elapsed < 5000) {
    animationState.previousTimestamp = timestamp;
    if (!animationState.done) {
      window.requestAnimationFrame(bulletFrame);
    }
  }
}

function move(target, direction) {
  const velocity = 300;
  targetCollider = target.element.getBoundingClientRect();
  const gameScreenCollider = gameScreen.getBoundingClientRect();
  console.log('GAME SCREEN COLLIDER', gameScreenCollider);
  console.log('SHIP COLLIDER', targetCollider);

  let distance;
  let seconds;
  if (direction === 'left' && targetCollider.left > gameScreenCollider.left) {
    distance = targetCollider.left - gameScreenCollider.left;
    seconds = distance / velocity;
    console.log('DISTANCE MOVED', distance);
    console.log('SECONDS ANIMATED', seconds);
    console.log('VELOCITY', (distance / seconds));
    target.position = 0;

  } else if (direction === 'right' && targetCollider.right < gameScreenCollider.right){
    distance = gameScreenCollider.right - targetCollider.right;
    seconds = distance / velocity;
    console.log('DISTANCE MOVED', distance);
    console.log('SECONDS ANIMATED', seconds);
    console.log('VELOCITY', (distance / seconds));

    target.position = gameScreenCollider.width - targetCollider.width;

  } else {
    console.log('Boundary Reached');
  }
  target.element.style.transition = `transform ${seconds}s linear`;
  target.element.style.transform = (`translateX(${target.position}px)`);
  // reset = true
  // window.requestAnimationFrame(frame)
}

function Bullet() {
  this.element = document.createElement('canvas');

}
function createBullet() {
  animationState.reset = true;
  const bullet = {

  };
  const bulletCanvas = document.createElement('canvas');
  bulletCanvas.classList.add('bullet');
  bulletCanvas.width = '5';
  bulletCanvas.height = '10';
  const bulletCtx = bulletCanvas.getContext('2d');
  bulletCtx.fillStyle = '#cccccc'; 
  bulletCtx.fillRect(0, 0, 5, 10);
  gameScreen.append(bulletCanvas);
  bulletCanvas.style.position = 'absolute';
  bulletCanvas.style.bottom = '45px';
  // Redo this algorithm, or function it out.
  bulletCanvas.style.left = `${spaceship.element.getBoundingClientRect().left - gameScreen.getBoundingClientRect().left + 25}px`;
  bullet.element = bulletCanvas;
  bullet.collider = new Collider(bullet.element, true);
  window.requestAnimationFrame(bulletFrame);
  bullets.push(bullet);
}

// function screenCollision(target) {
//   targetCollider = target.element.getBoundingClientRect();
// }

// function objectsCollision(object, target) {
//   objectCollider = object.element.getBoundingClientRect();
//   targetCollider = target.element.getBoundingClientRect();
// }

console.log(Collider.checkCollisions());
