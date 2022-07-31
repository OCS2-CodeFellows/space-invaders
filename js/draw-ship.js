'use strict';
function PlayerShip() {
  this.element = createPlayerCanvas();
  this.collider = new Collider(this.element);
  this.sourceImg = document.getElementById('playerSource');
  this.ctx = this.element.getContext('2d');
}

PlayerShip.prototype.move = function(direction) {
  const velocity = 300; // pixels / second
  const playerRect = this.element.getBoundingClientRect();
  const gameScreenCollider = gameScreen.element.getBoundingClientRect();
  console.log('GAME SCREEN COLLIDER', gameScreenCollider);
  console.log('SHIP COLLIDER', playerRect);

  let distance;
  let seconds;
  if (direction === 'left' && playerRect.left > gameScreenCollider.left) {
    distance = playerRect.left - gameScreenCollider.left;
    seconds = distance / velocity;

    this.position = 0;

  } else if (direction === 'right' && playerRect.right < gameScreenCollider.right){
    distance = gameScreenCollider.right - playerRect.right;
    seconds = distance / velocity;


    this.position = gameScreenCollider.width - playerRect.width;

  } else {
    console.log('Boundary Reached');
  }
  console.log('DISTANCE MOVED', distance);
  console.log('SECONDS ANIMATED', seconds);
  console.log('VELOCITY', (distance / seconds));
  // Use CSS transitions to move the ship. May update this to use a similar logic to the bullet animations.
  this.element.style.transition = `transform ${seconds}s linear`;
  this.element.style.transform = (`translateX(${this.position}px)`);
}

function createPlayerCanvas(){
  const canvas = document.createElement('canvas');
  canvas.width = 55;
  canvas.height = 35;
  canvas.classList.add('player');

  gameScreen.element.append(canvas);
  return canvas;
}

PlayerShip.prototype.updateCanvas = function(){
  this.ctx.clearRect(0, 0, 55, 35);
  this.ctx.drawImage(this.sourceImg, 0, 0);
};




