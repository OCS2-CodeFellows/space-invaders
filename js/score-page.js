'use strict';

const scoreSection = document.getElementById('scoresSection');
// TODO: Draw scores to page using Score.instances.
//const scores

function renderScores() {
  for (let i = 0; i < Score.instances.length; i++){
    const container = document.createElement('div');
    const playerName = document.createElement('span');
    playerName.classList.add('score-name');
    const playerScore = document.createElement('span');
    playerScore.classList.add('score-value');
    playerName.innerText = Score.instances[i].name;
    playerScore.innerText = Score.instances[i].score;
    container.append(playerName, playerScore);
    scoreSection.append(container);
  }
}
Score.loadScores();
renderScores();
