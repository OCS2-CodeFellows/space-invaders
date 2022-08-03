'use strict';
function Invader(spriteNumber, pointsValue, position) {
  this.element = createInvaderCanvas();
  this.collider = new Collider(this.element);
  this.sourceImg = document.getElementById('invaderSource');
  this.imgCoords = [0, calculateSheetY(spriteNumber)];
  this.ctx = this.element.getContext('2d');
  this.pointsValue = pointsValue;
  this.position = position || [0, 0];
  Invader.instances.push(this);
}

Invader.instances = [];

Invader.prototype.updateCanvas = function(){
  this.ctx.clearRect(0, 0, 44, 32);
  this.ctx.drawImage(this.sourceImg, this.imgCoords[0], this.imgCoords[1], 55, 40, 0, 0, 44, 32);
};

// This assumes that a sprite only has 2 "versions" right next to each other in the sprite sheet.
Invader.prototype.nextSprite = function(){
  if (this.imgCoords[0] === 60){
    this.imgCoords[0] = 0;
  } else if (this.imgCoords[0] === 0) {
    this.imgCoords[0] = 60;
  }
};

Invader.prototype.removeInvader = function() {
  for (let i = 0; i < Invader.instances.length; i++) {
    const checkInvader = Invader.instances[i];
    if (this.element === checkInvader.element) {
      this.collider.deleteCollider();
      this.element.remove();
      Invader.instances.splice(i, 1);
    }
  }
};
function createInvaderCanvas(){
  const canvas = document.createElement('canvas');
  canvas.width = 44;
  canvas.height = 32;
  canvas.classList.add('invader');
  canvas.style.position = 'absolute';
  // Right now this grabs the single img element in the HTML.
  // later we should have it do some Canvas magic to select from a sprite sheet.
  invaderBox.element.append(canvas);
  return canvas;
}

function calculateSheetY(spriteNumber){
  return spriteNumber * 45;
}

// Maybe create a function that takes a string or an int and uses that to create an invader of a certain type with a random color.

