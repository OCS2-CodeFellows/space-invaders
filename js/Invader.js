'use strict';
function Invader() {
  this.element = createInvaderCanvas();
  this.collider = new Collider(this.element);
  this.pointsWorth = 20;
  Invader.instances.push(this);
}

Invader.instances = [];

function createInvaderCanvas(){
  const canvas = document.createElement('canvas');
  canvas.width = 55;
  canvas.height = 40;
  canvas.classList.add('invader');
  // Right now this grabs the single img element in the HTML.
  // later we should have it do some Canvas magic to select from a sprite sheet.
  const sourceImg = document.getElementById('invaderSource');
  canvas.getContext('2d').drawImage(sourceImg, 0, 0);
  gameScreen.element.append(canvas);
  return canvas;
}