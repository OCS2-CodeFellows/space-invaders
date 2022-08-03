'use strict';
function InvaderBox() {
  this.element = createInvaderBox();
  this.rowCount = 4;
  this.columnCount = 5;
  this.horizontalSteps = 0;
  this.verticalSteps = 0;
  this.stepSize = 5;
  this.stepDirection = constants.RIGHT;
}



InvaderBox.prototype.layoutInvaders = function() {
  for (let i = 0; i < Invader.instances.length; i++) {
    const invader = Invader.instances[i];
    invader.element.style.top = `${52 * invader.position[0]}px`;
    invader.element.style.left = `${68 * invader.position[1]}px`;
  }
};

InvaderBox.prototype.stepInvaders = function() {
  const gameScreenBound = gameScreen.element.getBoundingClientRect();
  const boxBound = this.element.getBoundingClientRect();
  if (((boxBound.left - this.stepSize) - (gameScreenBound.left)) <= 0) {
    this.stepDirection = constants.RIGHT;
    this.verticalSteps++;
  } 
  if ((gameScreenBound.right) - (boxBound.right + this.stepSize) <= 0) {
    this.stepDirection = constants.LEFT;
    this.verticalSteps++;
  }
  if (this.stepDirection === constants.RIGHT) {
    this.horizontalSteps++;
  }
  if (this.stepDirection === constants.LEFT) {
    this.horizontalSteps--;
  }

  this.element.style.left = `${this.horizontalSteps * this.stepSize}px`
  this.element.style.top = `${52 + this.verticalSteps * this.stepSize}px`
  // console.log(this.horizontalSteps)
}

function createInvaderBox() {
  const box = document.createElement('div');
  box.classList.add('invader-box');
  box.style.width = '316px';
  box.style.height = '188px';
  box.style.position = 'absolute';

  gameScreen.element.append(box);
  return box;
}

