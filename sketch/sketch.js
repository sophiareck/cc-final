var preLorde = []; //to hold original text file
var countLorde; //to go through each word separately
var lorde = []; //to hold the most common words at the end

var preKeats = [];
var countKeats;
var keats = [];

var preShakespeare = [];
var countShakespeare;
var shakespeare = [];

var wordsToShow = []; //array to add word objects
var userCountLorde = 0; //to store how many words the user picked that correspond to each poet
var userCountKeats = 0;
var userCountShakespeare = 0;
var userTotalCount = 0; //see how many words total have been chosen

var userChosen = []; //to hold words chosen by user
var authorChoice; //to hold which author the user's word choice is most like at the end
var authorDates; //chosen author's life span
var authorImg //chosen author's photo
var myFont; //font

function preload() {
  raleway = loadFont('Raleway-Regular.ttf');
  preLorde = loadStrings("lorde.txt"); //text files with the poems
  preKeats = loadStrings("keats.txt");
  preShakespeare = loadStrings("shakespeare.txt");

  imgLorde = loadImage('lorde.jpg');
  imgKeats = loadImage('keats.jpg');
  imgShakespeare = loadImage('shakespeare.jpg');
}

function setup() {
  textFont(raleway);

  opts = { //ignore irrelevant parts of words like punctuation etc
    ignoreCase: true,
    ignorePunctuation: true,
    ignoreStopWords: true
  };

  //different frequencies are used for different authors to get a similar amount of words for each common words array
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
        keats.push(i); //add to most common words list
      }
    }
  }

  countShakespeare = RiTa.concordance(preShakespeare.join(" "), opts);
  for (var i in countShakespeare) {
    if (countShakespeare.hasOwnProperty(i)) {
      if (countShakespeare[i] > 15) { //if word appears more than 15 times
        shakespeare.push(i); //add to most common words list
      }
    }
  }
  playAgainButton = createButton("play again");
  playAgainButton.position(width / 2 + 180, 550);
  playAgainButton.style('font-size', '20pt');
  playAgainButton.style('font-family', 'raleway');
  playAgainButton.mousePressed(replay);

  prepare();
  createCanvas(600, 600)
  createChoices(); //create first choices
  textAlign(CENTER);
}

function draw() {
  background(50);
  fill(255);

  if (userTotalCount < 10) { //if user hasn't chosen all 10 words
    textSize(14);
    text("total words chosen: " + userTotalCount, 525, 20); //display word count
  } else { //if user has chosen all words
    if ((userCountLorde > userCountKeats) && (userCountLorde > userCountShakespeare)) {
      authorChoice = "Audre Lorde"; //if user chose most words from lorde, set her info
      authorDates = "1934-1992"
      authorImg = imgLorde;
    } else if ((userCountKeats > userCountLorde) && (userCountKeats > userCountShakespeare)) {
      authorChoice = "John Keats"; //if user chose most words from keats, set his info
      authorDates = "1795-1821"
      authorImg = imgKeats;
    } else {
      authorChoice = "William Shakespeare"; //if user chose most words from shakespeare, set his info
      authorDates = "1564-1616"
      authorImg = imgShakespeare;
    }
    textSize(20); //display author info
    text("Your word choice is most like:", width / 2, 100);
    textSize(40);
    text(authorChoice, width / 2, 175);
    image(authorImg, width / 2 - 100, 200, 200, 200);
    textSize(20);
    text(authorDates, width / 2, 420);
    playAgainButton.show(); //show play again button
  }
}

class Word { //class for word objects
  constructor(word, author) {
    this.word = word; //store actual word
    this.pos = RiTa.pos(this.word)[0]; //get part of speech from RiTa, returns array so need to get first position
    this.author = author; //store author
  }
  removeWord() {
    for (let i = 0; i < wordsToShow.length; i++) { //check word list for word
      if (wordsToShow[i] == this) {
        wordsToShow.splice(i, 1); //remove it
      }
    }
  }
}

function prepare() {
  playAgainButton.hide(); //hide play again button, setting up game

  for (i = 0; i < lorde.length; i++) {
    wordsToShow.push(new Word(lorde[i], 'lorde')); //add all most common Lorde words to wordsToShow
  }

  for (i = 0; i < keats.length; i++) {
    wordsToShow.push(new Word(keats[i], 'keats')); //add all most common Keats words to wordsToShow
  }

  for (i = 0; i < shakespeare.length; i++) {
    wordsToShow.push(new Word(shakespeare[i], 'shakespeare')); //add all most common Shakespeare words to wordsToShow
  }

  for (i = 0; i < wordsToShow.length; i++) {
    //just removing some common words that are uninteresting for the user to choose from
    if (wordsToShow[i].word == ("nor") || wordsToShow[i].word == ("thou") ||
      wordsToShow[i].word == ("thy") || wordsToShow[i].word == ("through") ||
      wordsToShow[i].word == ("upon") || wordsToShow[i].word == ("such") ||
      wordsToShow[i].word == ("o") || wordsToShow[i].word == ("ye") ||
      wordsToShow[i].word == ("thee") || wordsToShow[i].word == ("thus") ||
      wordsToShow[i].word == ("hath")) {
      wordsToShow.splice(i, 1);
    }
  }
}

function createChoices() {
  choice1 = random(wordsToShow); //get random word from list
  choice1.removeWord(); //remove it from list to prevent repeats
  choice1Button = createButton(choice1.word) //create a button for choice 1
  choice1Button.position(width / 2 - 200, 300); //position button on canvas
  choice1Button.style('font-size', '20pt'); //style button
  choice1Button.style('font-family', 'raleway');
  choice1Button.mousePressed(chose1); //if this word is chosen, go to chose1 function

  choice2 = random(wordsToShow);
  choice2.removeWord();
  choice2Button = createButton(choice2.word)
  choice2Button.position(width / 2 - 50, 300);
  choice2Button.style('font-size', '20pt');
  choice2Button.style('font-family', 'raleway');
  choice2Button.mousePressed(chose2);

  choice3 = random(wordsToShow);
  choice3.removeWord();
  choice3Button = createButton(choice3.word)
  choice3Button.position(width / 2 + 100, 300);
  choice3Button.style('font-size', '20pt');
  choice3Button.style('font-family', 'raleway');
  choice3Button.mousePressed(chose3);

  choice4 = random(wordsToShow);
  choice4.removeWord();
  choice4Button = createButton(choice4.word)
  choice4Button.position(width / 2 - 200, 500);
  choice4Button.style('font-size', '20pt');
  choice4Button.style('font-family', 'raleway');
  choice4Button.mousePressed(chose4);

  choice5 = random(wordsToShow);
  choice5.removeWord();
  choice5Button = createButton(choice5.word)
  choice5Button.position(width / 2 - 50, 500);
  choice5Button.style('font-size', '20pt');
  choice5Button.style('font-family', 'raleway');
  choice5Button.mousePressed(chose5);

  choice6 = random(wordsToShow);
  choice6.removeWord();
  choice6Button = createButton(choice6.word)
  choice6Button.position(width / 2 + 100, 500);
  choice6Button.style('font-size', '20pt');
  choice6Button.style('font-family', 'raleway');
  choice6Button.mousePressed(chose6);
}

function chose1() {
  userChosen.push(choice1); //add word to list of user's choices
  checkAuthor(choice1); //record what author word belongs to, keep count
  choice1Button.remove(); //get rid of buttons
  choice2Button.remove();
  choice3Button.remove();
  choice4Button.remove();
  choice5Button.remove();
  choice6Button.remove();
  userTotalCount++; //keep track of how many total words picked
  if (userTotalCount < 10) { //if user hasn't chosen all 10 words yet, create more choices
    createChoices();
  }
}

function chose2() {
  userChosen.push(choice2);
  checkAuthor(choice2);
  choice1Button.remove();
  choice2Button.remove();
  choice3Button.remove();
  choice4Button.remove();
  choice5Button.remove();
  choice6Button.remove();
  userTotalCount++;
  if (userTotalCount < 10) {
    createChoices();
  }
}

function chose3() {
  userChosen.push(choice3);
  checkAuthor(choice3);
  choice1Button.remove();
  choice2Button.remove();
  choice3Button.remove();
  choice4Button.remove();
  choice5Button.remove();
  choice6Button.remove();
  userTotalCount++;
  if (userTotalCount < 10) {
    createChoices();
  }
}

function chose4() {
  userChosen.push(choice4);
  checkAuthor(choice4);
  choice1Button.remove();
  choice2Button.remove();
  choice3Button.remove();
  choice4Button.remove();
  choice5Button.remove();
  choice6Button.remove();
  userTotalCount++;
  if (userTotalCount < 10) {
    createChoices();
  }
}

function chose5() {
  userChosen.push(choice5);
  checkAuthor(choice5);
  choice1Button.remove();
  choice2Button.remove();
  choice3Button.remove();
  choice4Button.remove();
  choice5Button.remove();
  choice6Button.remove();
  userTotalCount++;
  if (userTotalCount < 10) {
    createChoices();
  }
}

function chose6() {
  userChosen.push(choice6);
  checkAuthor(choice6);
  choice1Button.remove();
  choice2Button.remove();
  choice3Button.remove();
  choice4Button.remove();
  choice5Button.remove();
  choice6Button.remove();
  userTotalCount++;
  if (userTotalCount < 10) {
    createChoices();
  }
}

function checkAuthor(choice) {
  if (choice.author == "lorde") { //if author is lorde, add 1 to Lorde choice counter
    userCountLorde++;
  } else if (choice.author == "keats") { //etc
    userCountKeats++;
  } else {
    userCountShakespeare++;
  }
}

function replay() {
  userTotalCount = 0; //reset count values
  userCountLorde = 0;
  userCountKeats = 0;
  userCountShakespeare = 0;
  wordsToShow.splice(0) //reset words to show
  prepare(); //re-add words to show
  createChoices(); //display first set of choices
}
