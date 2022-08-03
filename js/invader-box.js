'use strict';
function InvaderBox() {
  this.element = createInvaderBox();
  this.rowCount = 4;
  this.columnCount = 6;
}

InvaderBox.prototype.layoutInvaders = function() {
  for (let i = 0; i < Invader.instances.length; i++) {
    const invader = Invader.instances[i];
    invader.element.style.top = `${70 * invader.position[0]}px`;
    invader.element.style.left = `${85 * invader.position[1]}px`;
  }
};

function createInvaderBox() {
  const box = document.createElement('div');
  box.classList.add('invader-box');
  box.style.width = '455px';
  box.style.height = '220px';
  box.style.position = 'absolute';

  gameScreen.element.append(box);
  return box;
}
