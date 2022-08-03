'use strict';

function Score(name, score) {
  this.name = name;
  this.score = score;
  Score.instances.push(this);
  sortScores();
}

Score.instances = [];


// TODO: Delete possible old scores from Score.instances.
// TODO: For each score in storage, create a new Score instance/object
Score.loadScores = function () {
  let parsedStorage = JSON.parse(localStorage.getItem('scores'))
  if (!parsedStorage.length){
    defaultScores();
    Score.saveScores();
    parsedStorage = JSON.parse(localStorage.getItem('scores'))
  }
  Score.instances = [];
  for (let i = 0; i < parsedStorage.length; i++) {
    new Score(parsedStorage[i].name, parsedStorage[i].score);
  }
};

Score.saveScores = function () {
  localStorage.setItem('scores', JSON.stringify(Score.instances));
};

Score.addScore = function(initials, value) {
  if (Score.instances.length < 10) {
    new Score(initials, value);
  } else if (value > Score.instances[Score.instances.length - 1].score) {

    new Score(initials, value);
    Score.instances.pop();
  }
};

Score.clearScores = function() {
  Score.instances = [];
  Score.saveScores();
}

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

function defaultScores() {
  new Score('AXC', 40);
  new Score('TOO', 30);
  new Score('RCS', 20);
  new Score('DJS', 10);
}
// console.log(Score.instances);