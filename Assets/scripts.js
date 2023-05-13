//multiple choice questions - add ol and li elements
//associate questions and answers
//one has to be the correct answer
//timer ***** done
//dynamically updated HTML and CSS via js
//store high scores
//display high scores
//start button - timer kicks off  *** done
//start button - presented with a question
//response to question triggers - correct or incorrect on bottom display
//response to question - triggers points
//response to question - triggers another question
//response to question - incorrect answer subtracts time clock
//game over - when all questions answered OR
//game over - when timer reaches 0
//on game over - save initials and score
//hover effect on button

var timerBox = document.getElementById('timerbox');
var questionBox = document.getElementById('questionbox');
var startButton = document.getElementById('startbutton');
var highScore = document.getElementById('highscore');
var questionGroup = document.getElementById('questiongroup');
var questionLiteral = document.getElementById('question');
var resetScoreButton = document.getElementById('resetScoreButton');
var resultMessage = document.getElementById('resultmessage');
var gameoverdiv = document.getElementById('gameover');
var saveHighScoreBtn = document.getElementById('saveHighScoreBtn');
var savedInitials = [];
var savedHighScore = [];

var questionsPool = [];
var questionsUsed = [[{ "questionid": 1, "question": "Question 1", "text": "Q1answer1", "result": false },
{ "questionid": 1, "question": "Question 1", "text": "Q1answer2", "result": false },
{ "questionid": 1, "question": "Question 1", "text": "Q1answer3", "result": true },
{ "questionid": 1, "question": "Question 1", "text": "Q1answer4", "result": false }
],
[{ "questionid": 2, "question": "Question 2", "text": "Q2answer1", "result": false },
{ "questionid": 2, "question": "Question 2", "text": "Q2answer2", "result": false },
{ "questionid": 2, "question": "Question 2", "text": "Q2answer3", "result": true },
{ "questionid": 2, "question": "Question 2", "text": "Q2answer4", "result": false }
],
[{ "questionid": 3, "question": "Question 3", "text": "Q3answer1", "result": false },
{ "questionid": 3, "question": "Question 3", "text": "Q3answer2", "result": false },
{ "questionid": 3, "question": "Question 3", "text": "Q3answer3", "result": true },
{ "questionid": 3, "question": "Question 3", "text": "Q3answer4", "result": false }
],
[{ "questionid": 4, "question": "Question 4", "text": "Q4answer1", "result": false },
{ "questionid": 4, "question": "Question 4", "text": "Q4answer2", "result": false },
{ "questionid": 4, "question": "Question 4", "text": "Q4answer3", "result": true },
{ "questionid": 4, "question": "Question 4", "text": "Q4answer4", "result": false }
]];


function startQuiz(event) {
    event.preventDefault();
    resetScore();
    for (var i of questionsUsed) {
        questionsPool.push(i);
    }
    questionsUsed = [];
    console.log(questionsPool, questionsUsed);
    countdown(78);
    displayQuestion();
}

function countdown(timeLeft) {
     timeInterval = setInterval(function () {
        timeLeft--;
        timerBox.textContent = timeLeft;
        if (timeLeft < 0) {
            clearInterval(timeInterval);
            displayTimeUp();
       }
    }, 1000);
//    console.log(timeInterval);
    return timeInterval;
}

function displayQuestion() {
    resultMessage.innerHTML = "";
    questionGroup.innerHTML = '';
    var listElement = document.createElement("ol");
    questionGroup.appendChild(listElement);
    var questionIndex = Math.floor(Math.random() * questionsPool.length);
    console.log(questionIndex);
    if (questionsPool.length < 1) {
        questionBox.innerHTML = '';
        resultMessage.innerHTML = "";
       console.log("peanutbutter");
       lastQuestion();
    } 
    else {              
    questionLiteral.textContent = questionsPool[questionIndex][0].question;
    for (i = 0; i < questionsPool[questionIndex].length; i++) {
        var liItems = document.createElement("li");
        var liButton = document.createElement("button");
        listElement.appendChild(liButton);
        liButton.appendChild(liItems);
        liItems.textContent = questionsPool[questionIndex][i].text;
        liItems.dataset.result = questionsPool[questionIndex][i].result;
    }
    questionsPool.splice(questionIndex, 1);
}
}

function makeSelection(event) {
    event.preventDefault();
    var clickedAnswer = event.target;
    var newScore = 0;
    var currentTimer = Number(timerBox.innerHTML);
    var result = clickedAnswer.getAttribute("data-result");
    if (result === "true") {
        var newScore = 10;
        var adjTimeLeft = currentTimer;
    } else {
        var newScore = 0;
        var adjTimeLeft = currentTimer - 5;
    }
    clearInterval(timeInterval);
    countdown(adjTimeLeft);
    saveScores(newScore);
    displayResult(result);
}

function viewHighScore(event) {
    //    display highscore from storage
}

function displayResult(result) {
//    resultMessage.innerHTML = "";
    var hrEl = document.createElement("hr");
    var resultEl = document.createElement("h2");
    resultMessage.appendChild(hrEl);
    resultMessage.appendChild(resultEl);
    if (result === "true") {
        resultEl.textContent = "Correct!";
    } else {
        resultEl.textContent = "Wrong!"
    }
    console.log(result);
    setTimeout(displayQuestion,3000);
}

function lastQuestion() {
    clearInterval(timeInterval);
    displayTimeUp();
}

function displayTimeUp() {
    timerBox.textContent = "Game Over"
    gameover();
    return;
}

function gameover() {
    var score = localStorage.getItem("current-score");
    document.getElementById('questionbox').innerHTML = '';
    document.getElementById('resultmessage').innerHTML = '';
    var gameoverH2 = document.createElement("h2");
    var gameoverInput = document.createElement("input");
    var gameoverP = document.createElement("p");
    gameoverdiv.appendChild(gameoverH2);
    gameoverdiv.appendChild(gameoverP);
    gameoverdiv.appendChild(gameoverInput);
    gameoverH2.textContent = ("Your Score is " + score);
    gameoverP.textContent = "Input your initials:";
    gameoverInput.setAttribute("name","initials");
    saveHighScoreBtn.removeAttribute("class", "hide");
    console.log("game over");
    return;
}

function resetScore() {
    localStorage.setItem("current-score", 0);
}

function saveScores(score) {
    currentScore = localStorage.getItem("current-score");
    var newCurrentScore = (score + (+currentScore));
    localStorage.setItem("current-score", newCurrentScore);
}
//function saveFinalScore(event) {
//    event.preventDefault();
//    var inits = document.querySelector('input[name=initials]').value;
//   var storedInitials = JSON.parse(localStorage["initials"] || null);
//   var highscores = JSON.parse(localStorage["high-score"] || null);
//   console.log(storedInitials,highscores);
//}

startButton.addEventListener("click", startQuiz);
highScore.addEventListener("click", viewHighScore);
questionGroup.addEventListener("click", makeSelection);
resetScoreButton.addEventListener("click", resetScore);
//saveHighScoreBtn.addEventListener("click", saveFinalScore);
