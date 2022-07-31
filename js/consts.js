'use strict';

const gameScreen = {
  element: document.getElementById('gameScreen'),
};

const gameState = {
  score: 0,
};

const animationState = {
  reset: false,
  done: false,
  start: 0,
  previousTimestamp: 0,
};

const constants = {
  MAXBULLETS: 5,
};
