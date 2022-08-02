'use strict';

const scoreSection = document.getElementById('scoresSection');
// TODO: Draw scores to page using Score.instances.
//const scores



for(let i = 0; i < Score.instances.length; i++){
  const container = document.createElement('div');
  const playerName = document.createElement('span');
  const playerScore = document.createElement('span');
  playerName.innerText = Score.instances[i].name;
  playerName.classList.add('score-name');
  playerScore.innerText = Score.instances[i].score;
  playerScore.classList.add('score-value');
  container.append(playerName, playerScore);
  scoreSection.append(container);
}


console.log(Score.instances);