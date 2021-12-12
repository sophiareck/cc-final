var preLorde = []; //to hold original text file
var countLorde; //to go through each word separately
var lorde = []; //to hold the most common words at the end

var preKeats = [];
var countKeats;
var keats = [];

var preShakespeare = [];
var countShakespeare;
var shakespeare = [];

var preWhitman = [];
var countWhitman;
var whitman = [];

var prePlath = [];
var countPlath;
var plath = [];

var preRich = [];
var countRich;
var rich = [];

var wordsToShow = []; //array to add word objects
var userCountLorde = 0; //to store how many words the user picked that correspond to each poet
var userCountKeats = 0;
var userCountShakespeare = 0;
var userCountWhitman = 0;
var userCountPlath = 0;
var userCountRich = 0;
var userTotalCount = 0; //see how many words total have been chosen

var userChosen = []; //to hold words chosen by user
var authorChoice; //to hold which author the user's word choice is most like at the end
var authorDates; //chosen author's life span
var authorImg; //chosen author's photo
var authorText; //chosen author's bio
var myFont; //font

var percentageArray = [];

function preload() {
  myFont = loadFont('OldNewspaperTypes.ttf');
  preLorde = loadStrings("lorde.txt"); //text files with the poems
  preKeats = loadStrings("keats.txt");
  preShakespeare = loadStrings("shakespeare.txt");
  preWhitman = loadStrings("whitman.txt");
  prePlath = loadStrings('plath.txt');
  preRich = loadStrings('rich.txt');

  imgLorde = loadImage('lorde.jpg'); //images of poets
  imgKeats = loadImage('keats.jpg');
  imgShakespeare = loadImage('shakespeare.jpg');
  imgWhitman = loadImage('whitman.jpg');
  imgPlath = loadImage('plath.jpg');
  imgRich = loadImage('rich.jpg');
  imgTie = loadImage('unknown.png');
}

function setup() {
  textFont(myFont);

  opts = { //ignore irrelevant parts of words like punctuation etc
    ignoreCase: true,
    ignorePunctuation: true,
    ignoreStopWords: true
  };

  //different frequencies are used for different authors to get a similar amount of words for each common words array
  countLorde = RiTa.concordance(preLorde.join(" "), opts);
  for (var i in countLorde) {
    if (countLorde.hasOwnProperty(i)) {
      if (countLorde[i] > 4) { //if word appears more than 5 times
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

  countWhitman = RiTa.concordance(preWhitman.join(" "), opts);
  for (var i in countWhitman) {
    if (countWhitman.hasOwnProperty(i)) {
      if (countWhitman[i] > 7) { //if word appears more than 7 times
        whitman.push(i); //add to most common words list
      }
    }
  }

  countPlath = RiTa.concordance(prePlath.join(" "), opts);
  for (var i in countPlath) {
    if (countPlath.hasOwnProperty(i)) {
      if (countPlath[i] > 4) { //if word appears more than 4 times
        plath.push(i); //add to most common words list
      }
    }
  }

  countRich = RiTa.concordance(preRich.join(" "), opts);
  for (var i in countRich) {
    if (countRich.hasOwnProperty(i)) {
      if (countRich[i] > 3) { //if word appears more than 3 times
        rich.push(i); //add to most common words list
      }
    }
  }

  playAgainButton = createButton("play again");
  playAgainButton.position(width / 2 + 180, 650);
  playAgainButton.style('font-size', '20pt');
  playAgainButton.style('background-color', '#efe5d5')
  playAgainButton.style('font-family', 'OldNewspaperTypes');
  playAgainButton.mousePressed(replay);

  prepare(); //setting up wordsToShow
  createCanvas(600, 600)
  createChoices(); //create first choices
  textAlign(CENTER);
}

function draw() {
  background('#013220');
  fill('#efe5d5');

  if (userTotalCount < 15) { //if user hasn't chosen all 15 words
    textSize(14);
    text("total words chosen: " + userTotalCount, 520, 20); //display word count
    textSize(30);
    text("Pick a word for a poem!", width / 2, 100);
    textSize(20);
    stroke('#efe5d5');
    line(0, 480, 600, 480);
    noStroke();
    text("choices have been selected by analyzing the most commonly used words by each poet, then randomly displaying 6 for you to choose from!", 30, 500, 550, 200);
  } else { //if user has chosen all words
    if ((userCountLorde > userCountKeats) && (userCountLorde > userCountShakespeare) &&
      (userCountLorde > userCountWhitman) && (userCountLorde > userCountPlath) &&
      (userCountLorde > userCountRich)) {
      authorChoice = "Audre Lorde"; //if user chose most words from lorde, set her info
      authorDates = "1934-1992"
      authorImg = imgLorde;
      authorText = "Audre Lorde was an American writer, feminist, womanist, librarian, and civil rights activist. She was a self-described 'black, lesbian, mother, warrior, poet,' who dedicated both her life and her creative talent to confronting and addressing injustices of racism, sexism, classism, and homophobia."
    } else if ((userCountKeats > userCountLorde) && (userCountKeats > userCountShakespeare) &&
      (userCountKeats > userCountWhitman) && (userCountKeats > userCountPlath) &&
      (userCountKeats > userCountRich)) {
      authorChoice = "John Keats"; //if user chose most words from keats, set his info
      authorDates = "1795-1821"
      authorImg = imgKeats;
      authorText = "John Keats was an English poet prominent in the second generation of Romantic poets, known for his use of vivid imagery and philosophical subject matter. Although his poems had been published for only four years when he died of tuberculosis at the age of 25, his fame grew rapidly after his death."
    } else if ((userCountShakespeare > userCountLorde) && (userCountShakespeare > userCountKeats) &&
      (userCountShakespeare > userCountWhitman) && (userCountShakespeare > userCountPlath) &&
      (userCountShakespeare > userCountRich)) {
      authorChoice = "William Shakespeare"; //if user chose most words from shakespeare, set his info
      authorDates = "1564-1616"
      authorImg = imgShakespeare;
      authorText = "William Shakespeare was an English playwright, poet and actor, widely regarded as the greatest writer in the English language and the world's greatest dramatist. He is often called England's national poet and the 'Bard of Avon'. The majority of his poetry is in the form of the Elizabethan Sonnet."
    } else if ((userCountWhitman > userCountLorde) && (userCountWhitman > userCountKeats) &&
      (userCountWhitman > userCountShakespeare) && (userCountWhitman > userCountPlath) &&
      (userCountWhitman > userCountRich)) {
      authorChoice = "Walt Whitman";
      authorDates = "1819-1892";
      authorImg = imgWhitman;
      authorText = "Walt Whitman was an American poet, essayist and journalist. A humanist, he was a part of the transition between transcendentalism and realism, incorporating both views in his works. Transcendentalism is characterized by literary freedom and individualism, where Realism portrays life as it is."
    } else if ((userCountPlath > userCountLorde) && (userCountPlath > userCountKeats) &&
      (userCountPlath > userCountShakespeare) && (userCountPlath > userCountWhitman) &&
      (userCountPlath > userCountRich)) {
      authorChoice = "Sylvia Plath";
      authorDates = "1932-1963";
      authorImg = imgPlath;
      authorText = "Sylvia Plath was an American poet, novelist, and short-story writer. She is best known for advancing the genre of confessional poetry and incorporating despair, violent emotion, and obsession with death into her work. Plath notably struggled with depression and took her own life at the age of 30."
    } else if ((userCountRich > userCountLorde) && (userCountRich > userCountKeats) &&
      (userCountRich > userCountShakespeare) && (userCountRich > userCountWhitman) &&
      (userCountRich > userCountPlath)) {
      authorChoice = "Adrienne Rich";
      authorDates = "1929-2012";
      authorImg = imgRich;
      authorText = "Adrienne Cecile Rich was an American poet, essayist and feminist. She was one of the most widely read and influential poets of the second half of the 20th century, and was credited with bringing the oppression of women and lesbians to the forefront of poetic discourse";
    } else { //if there's a tie, some amounts are equal
      authorChoice = "A tie between authors!";
      authorDates = "???";
      authorImg = imgTie;
      authorText = "See percentages below to see which poets you write like the most";
    }

    textSize(25); //display author info
    text("Your word choice is most like:", width / 2, 50);
    textSize(40);
    text(authorChoice, width / 2, 100);
    image(authorImg, 30, 120, 200, 200);
    textSize(20);
    text(authorDates, 125, 350);
    textSize(18);
    textAlign(LEFT);
    text(authorText, 240, 130, 350, 220);
    textAlign(CENTER);
    stroke('#efe5d5');
    line(0, 370, 600, 370);
    noStroke();
    sortPercentages(); //calculate and sort percentages function
    text("1. " + percentageArray[5].percentage + "% " + percentageArray[5].author, 100, 450); //display percentages
    text("2. " + percentageArray[4].percentage + "% " + percentageArray[4].author, 300, 450);
    text("3. " + percentageArray[3].percentage + "% " + percentageArray[3].author, 500, 450);
    text("4. " + percentageArray[2].percentage + "% " + percentageArray[2].author, 100, 500);
    text("5. " + percentageArray[1].percentage + "% " + percentageArray[1].author, 300, 500);
    text("6. " + percentageArray[0].percentage + "% " + percentageArray[0].author, 500, 500);
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

  for (i = 0; i < whitman.length; i++) {
    wordsToShow.push(new Word(whitman[i], 'whitman')); //add all most common Whitman words to wordsToShow
  }

  for (i = 0; i < plath.length; i++) {
    wordsToShow.push(new Word(plath[i], 'plath')); //add all most common Plath words to wordsToShow
  }

  for (i = 0; i < rich.length; i++) {
    wordsToShow.push(new Word(rich[i], 'rich')); //add all most common Rich words to wordsToShow
  }

  for (i = 0; i < wordsToShow.length; i++) {
    //just removing some common words that are uninteresting for the user to choose from
    if (wordsToShow[i].word == ("nor") || wordsToShow[i].word == ("thou") ||
      wordsToShow[i].word == ("thy") || wordsToShow[i].word == ("through") ||
      wordsToShow[i].word == ("upon") || wordsToShow[i].word == ("such") ||
      wordsToShow[i].word == ("o") || wordsToShow[i].word == ("ye") ||
      wordsToShow[i].word == ("thee") || wordsToShow[i].word == ("thus") ||
      wordsToShow[i].word == ("hath") || wordsToShow[i].word == ("white") ||
      wordsToShow[i].word == ("sometimes") || wordsToShow[i].word == ("old") ||
      wordsToShow[i].word == ("still") || wordsToShow[i].word == ("yet")) {
      wordsToShow.splice(i, 1);
    }
  }
}

function createChoices() {
  choice1 = random(wordsToShow); //get random word from list
  choice1.removeWord(); //remove it from list to prevent repeats
  choice1Button = createButton(choice1.word) //create a button for choice 1
  choice1Button.position(50, 300); //position button on canvas
  choice1Button.style('font-size', '20pt'); //style button
  choice1Button.style('font-family', 'OldNewspaperTypes');
  choice1Button.style('background-color', '#efe5d5');
  choice1Button.style('width', '125px');
  choice1Button.mousePressed(chose1); //if this word is chosen, go to chose1 function

  choice2 = random(wordsToShow);
  choice2.removeWord();
  choice2Button = createButton(choice2.word)
  choice2Button.position(250, 300);
  choice2Button.style('font-size', '20pt');
  choice2Button.style('font-family', 'OldNewspaperTypes');
  choice2Button.style('background-color', '#efe5d5');
  choice2Button.style('width', '125px');
  choice2Button.mousePressed(chose2);

  choice3 = random(wordsToShow);
  choice3.removeWord();
  choice3Button = createButton(choice3.word)
  choice3Button.position(450, 300);
  choice3Button.style('font-size', '20pt');
  choice3Button.style('font-family', 'OldNewspaperTypes');
  choice3Button.style('background-color', '#efe5d5');
  choice3Button.style('width', '125px');
  choice3Button.mousePressed(chose3);

  choice4 = random(wordsToShow);
  choice4.removeWord();
  choice4Button = createButton(choice4.word)
  choice4Button.position(50, 500);
  choice4Button.style('font-size', '20pt');
  choice4Button.style('font-family', 'OldNewspaperTypes');
  choice4Button.style('background-color', '#efe5d5');
  choice4Button.style('width', '125px');
  choice4Button.mousePressed(chose4);

  choice5 = random(wordsToShow);
  choice5.removeWord();
  choice5Button = createButton(choice5.word)
  choice5Button.position(250, 500);
  choice5Button.style('font-size', '20pt');
  choice5Button.style('font-family', 'OldNewspaperTypes');
  choice5Button.style('background-color', '#efe5d5');
  choice5Button.style('width', '125px');
  choice5Button.mousePressed(chose5);

  choice6 = random(wordsToShow);
  choice6.removeWord();
  choice6Button = createButton(choice6.word)
  choice6Button.position(450, 500);
  choice6Button.style('font-size', '20pt');
  choice6Button.style('font-family', 'OldNewspaperTypes');
  choice6Button.style('background-color', '#efe5d5');
  choice6Button.style('width', '125px');
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
  if (userTotalCount < 15) { //if user hasn't chosen all 10 words yet, create more choices
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
  if (userTotalCount < 15) {
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
  if (userTotalCount < 15) {
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
  if (userTotalCount < 15) {
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
  if (userTotalCount < 15) {
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
  if (userTotalCount < 15) {
    createChoices();
  }
}

function checkAuthor(choice) {
  if (choice.author == "lorde") { //if author is lorde, add 1 to Lorde choice counter
    userCountLorde++;
  } else if (choice.author == "keats") { //etc
    userCountKeats++;
  } else if (choice.author == "shakespeare") {
    userCountShakespeare++;
  } else if (choice.author == "whitman") {
    userCountWhitman++;
  } else if (choice.author == "plath") {
    userCountPlath++;
  } else {
    userCountRich++;
  }
}

function replay() {
  userTotalCount = 0; //reset count values
  userCountLorde = 0;
  userCountKeats = 0;
  userCountShakespeare = 0;
  userCountWhitman = 0;
  userCountPlath = 0;
  userCountRich = 0;
  percentageArray = [];
  wordsToShow.splice(0) //reset words to show
  prepare(); //re-add words to show
  createChoices(); //display first set of choices
}

function sortPercentages() {
  percentageArray = [{ //array of objects to track percentage
      percentage: ((userCountLorde / 15) * 100).toFixed(1), // get percentage and round to 1 decimal point
      author: "Lorde" //rcord author
    },
    {
      percentage: ((userCountKeats / 15) * 100).toFixed(1),
      author: "Keats"
    },
    {
      percentage: ((userCountShakespeare / 15) * 100).toFixed(1),
      author: "Shakespeare"
    },
    {
      percentage: ((userCountWhitman / 15) * 100).toFixed(1),
      author: "Whitman"
    },
    {
      percentage: ((userCountPlath / 15) * 100).toFixed(1),
      author: "Plath"
    },
    {
      percentage: ((userCountRich / 15) * 100).toFixed(1),
      author: "Rich"
    }
  ];

  percentageArray.sort(function compare(a, b) { //sort using custom compare function
    return (a.percentage - b.percentage); //just compare percentages
  }); //(subtract cause only the sign of the return value counts)
}
