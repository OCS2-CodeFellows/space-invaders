'use strict';

function GameScreen() {
  this.element = document.getElementById('gameScreen');
}

const gameScreen = new GameScreen();
// const gameScreen = document.getElementById('gameScreen');

const animationState = {
  reset: false,
  done: false,
  start: 0,
  previousTimestamp: 0,
}