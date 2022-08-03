'use strict';
/* exported constants, animationState, gameState, gameScreen */

const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const gameOverScreen = document.getElementById('gameOverScreen');
const currentScoreBanner = document.getElementById('currentScoreDisplay');
const hiScoreBanner = document.getElementById('hiScoreDisplay');

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
  INVADER_HEIGHT: 40,
  INVADER_WIDTH: 55,
  PLAYER_HEIGHT: 35,
  PLAYER_WIDTH: 55,
};
