'use strict';

function Bullet() {
  this.element = createBulletCanvas(player);
  this.collider = new Collider(this.element, true);
  this.animationStart;

  Bullet.instances.push(this);
}

Bullet.prototype.removeBullet = function() {
  for (let i = 0; i < Bullet.instances.length; i++) {
    const checkBullet = Bullet.instances[i];
    if (this.element === checkBullet.element) {
      this.collider.deleteCollider();
      this.element.remove();
      Bullet.instances.splice(i, 1)
    }
  }
}

function createBulletCanvas(ship){
  const canvas = document.createElement('canvas');
  canvas.classList.add('bullet');
  canvas.width = '5';
  canvas.height = '10';
  canvas.style.position = 'absolute';
  canvas.style.bottom = '40px';
  canvas.style.left = `${getShipCenter(ship)}px`;

  const bulletCtx = canvas.getContext('2d');
  bulletCtx.fillStyle = '#cccccc'; 
  bulletCtx.fillRect(0, 0, 5, 10);

  gameScreen.element.append(canvas);
  return canvas;
}

Bullet.instances = [];

function getShipCenter(ship) {
  const shipRect = ship.element.getBoundingClientRect();
  const shipLeftSide = shipRect.left;
  const screenLeftSide = gameScreen.element.getBoundingClientRect().left;
  const bulletSizeAdjustment = 2.5; // Bullets are 5px, so we'll adjust by 2.5px to better center the bullet.
  const shipSizeHalf = shipRect.width / 2;
  
  const center = shipLeftSide - screenLeftSide + shipSizeHalf - bulletSizeAdjustment;
  return center;
}


