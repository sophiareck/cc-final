var preLorde = []; //to hold original text file
var countLorde; //to go through each word separately
var lorde = []; //to hold the most common words at the end

var preKeats = [];
var countKeats;
var keats = [];

var preShakespeare = [];
var countShakespeare;
var shakespeare = [];

function preload() {
  preLorde = loadStrings("lorde.txt");
  preKeats = loadStrings("keats.txt");
  preShakespeare = loadStrings("shakespeare.txt");
}

function setup() {
  opts = { //ignore irrelevant parts of words like punctuation etc
    ignoreCase: true,
    ignorePunctuation: true,
    ignoreStopWords: true
  };
  countLorde = RiTa.concordance(preLorde.join(" "), opts);
  for (var i in countLorde) {
    if (countLorde.hasOwnProperty(i)) {
      if (countLorde[i] > 5) { //if word appears more than 5 times
        lorde.push(i); //add to most common words list
      }
    }
  }
  countKeats = RiTa.concordance(preKeats.join(" "), opts);
  for (var i in countKeats) {
    if (countKeats.hasOwnProperty(i)) {
      if (countKeats[i] > 7) { //if word appears more than 7 times
        keats.push(i);//add to most common words list
      }
    }
  }

  countShakespeare = RiTa.concordance(preShakespeare.join(" "), opts);
  for (var i in countShakespeare) {
    if (countShakespeare.hasOwnProperty(i)) {
      if (countShakespeare[i] > 15) { //if word appears more than 15 times
        shakespeare.push(i);//add to most common words list
      }
    }
  }

  print(lorde); //print to console
  print(keats);
  print(shakespeare);
}
