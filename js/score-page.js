'use strict';

const scoreSection = document.getElementById('scoresSection');
const clearButton = document.getElementById('clearButton')
// TODO: Draw scores to page using Score.instances.
//const scores

function renderScores() {
  Score.loadScores();
  scoreSection.innerHTML = '';
  for (let i = 0; i < Score.instances.length; i++){
    console.log(Score.instances[i].initials)
    const container = document.createElement('div');
    container.classList.add('score-entry')
    const position = document.createElement('span');
    position.classList.add('score-position');
    const initials = document.createElement('span');
    initials.classList.add('score-name');
    const score = document.createElement('span');
    score.classList.add('score-value');
    position.innerText = '#' + `${i + 1}`.padStart(2, '0')
    initials.innerText = `${Score.instances[i].initials}`.padStart(3, '__');
    score.innerText = `${Score.instances[i].score}`.padStart(6, '0');
    container.append(position, initials, score);
    scoreSection.append(container);
  }
}

clearButton.addEventListener('click', clearScoreList)
function clearScoreList() {
  Score.clearScores();
  renderScores();
}

renderScores();
