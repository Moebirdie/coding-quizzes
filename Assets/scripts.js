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

function countdown() {
    var timeLeft = 78;
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerBox.textContent = "Time Left " + timeLeft;
        if (timeLeft < 0) {
            clearInterval(timeInterval);
            displayTimeUp();
        }
    }, 1000)
}

function displayTimeUp() {
    timerBox.textContent = "Times Up!"
    return;
}

function startQuiz(event) {
    event.preventDefault();
    for (var i of questionsUsed) {
        questionsPool.push(i);
    }
    questionsUsed = [];
    console.log(questionsPool, questionsUsed);
    countdown();
    displayQuestion();
}

function viewHighScore(event) {
    //    display highscore from storage
}

function makeSelection(event) {
    event.preventDefault();
    var clickedAnswer = event.target;
    var result = clickedAnswer.getAttribute("data-result");
    console.log(typeof result);
    if (result === "true") {
        newScore = 10;
    } else {
        newScore = -10;
    }
    console.log(newScore);
    saveScores(newScore);
    findCurrQuesInArray();
    //pushQuesToUsed();
    console.log("pink");
}

function displayQuestion() {
    var listElement = document.createElement("ol");
    questionGroup.appendChild(listElement);
    var questionIndex = Math.floor(Math.random() * questionsPool.length);
    console.log(questionIndex);
    questionLiteral.textContent = questionsPool[questionIndex][0].question;
    console.log(questionsPool[questionIndex][0].text)
    console.log(questionsPool[questionIndex][1].text);
    console.log(questionsPool[questionIndex].length);
    for (i = 0; i < questionsPool[questionIndex].length; i++) {
        var liItems = document.createElement("li");
        var liButton = document.createElement("button");
        listElement.appendChild(liButton);
        liButton.appendChild(liItems);
        liItems.textContent = questionsPool[questionIndex][i].text;
        liItems.dataset.result = questionsPool[questionIndex][i].result;
    }
    var removeQuestion = questionsPool[questionIndex];
    questionsPool.splice(questionIndex,1);
    console.log(removeQuestion)
    console.log(questionsPool,questionsUsed);        
}

function resetScore(event) {
    event.preventDefault();
    localStorage.setItem("high-score", 0);  
}

function saveScores(score) {
    var currHighScore = localStorage.getItem("high-score");
    var newHighScore = (score + (+currHighScore));
    console.log(typeof newHighScore);
    localStorage.setItem("high-score", newHighScore);
    //localStorage.setItem("initials","")
}

startButton.addEventListener("click", startQuiz);
highScore.addEventListener("click", viewHighScore);
questionGroup.addEventListener("click", makeSelection);
resetScoreButton.addEventListener("click", resetScore);
