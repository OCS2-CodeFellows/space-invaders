'use strict';

const scoreSection = document.getElementById('scoresSection');
const clearButton = document.getElementById('clearButton')
// TODO: Draw scores to page using Score.instances.
//const scores

function renderScores() {
  Score.loadScores();
  scoreSection.innerHTML = '';
  for (let i = 0; i < Score.instances.length; i++){
    const container = document.createElement('div');
    const playerName = document.createElement('span');
    playerName.classList.add('score-name');
    const playerScore = document.createElement('span');
    playerScore.classList.add('score-value');
    playerName.innerText = `${Score.instances[i].name}`.padStart(3, '__');
    playerScore.innerText = `${Score.instances[i].score}`.padStart(6, '0');
    container.append(playerName, playerScore);
    scoreSection.append(container);
  }
}

clearButton.addEventListener('click', clearScoreList)
function clearScoreList() {
  Score.clearScores();
  renderScores();
}

renderScores();
