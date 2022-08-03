'use strict';

function Score(name, score) {
  this.name = name;
  this.score = score;
  Score.instances.push(this);
}

Score.instances = [];

new Score('AXC', 200);
new Score('TOO', 50000);
new Score('RCS', 90000);
new Score('DJS', 9001);


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

Score.saveScores();
Score.loadScores();

// console.log(Score.instances);