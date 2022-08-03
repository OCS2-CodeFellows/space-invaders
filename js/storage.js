'use strict';

function Score(name, score) {
  this.name = name;
  this.score = score;
  Score.instances.push(this);
  sortScores();
}

Score.instances = [];

new Score('AXC', 110);
new Score('TOO', 80);
new Score('RCS', 50);
new Score('DJS', 90);


// TODO: Delete possible old scores from Score.instances.
// TODO: For each score in storage, create a new Score instance/object
Score.loadScores = function () {
  const storageScores = JSON.parse(localStorage.getItem('scores'));
  Score.instances = [];
  for (let i = 0; i < storageScores.length; i++) {
    new Score(storageScores[i].name, storageScores[i].score);
  }
};

Score.saveScores = function () {
  localStorage.setItem('scores', JSON.stringify(Score.instances));
};

Score.addScore = function(initials, value) {
  console.log(value)
  console.log(Score.instances[Score.instances.length - 1].score)
  if (Score.instances.length < 10) {
    new Score(initials, value);
  } else if (value > Score.instances[Score.instances.length - 1].score) {

    new Score(initials, value);
    Score.instances.pop();
  }
};

function sortScores () {
  Score.instances.sort((a, b) => {
    if (a.score > b.score) {
      return -1;
    }
    if (a.score < b.score) {
      return 1;
    }
    return 0;
  });
}
// console.log(Score.instances);