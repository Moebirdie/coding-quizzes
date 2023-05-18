var timerBox = document.getElementById('timerbox');
var timer = document.getElementById('timer');
var questionBox = document.getElementById('questionbox');
var subHeader = document.getElementById('subheader');
var startButton = document.getElementById('startbutton');
var playAgainButton = document.getElementById('playagain');
var highScore = document.getElementById('highscore');
var questionGroup = document.getElementById('questiongroup');
var questionLiteral = document.getElementById('question');
var resetHighScoreButton = document.getElementById('resetScoreButton');
var resultMessage = document.getElementById('resultmessage');
var gameoverdiv = document.getElementById('gameover');
var saveHighScoreBtn = document.getElementById('saveHighScoreBtn');
var savedHighScore = [];

var questionsPool = [];
var questionsUsed = [[{ "questionid": 1, "question": "Commonly used data types DO NOT include: ", "text": "strings", "result": false },
{ "questionid": 1, "question": "Commonly used data types DO NOT include: ", "text": "booleans", "result": false },
{ "questionid": 1, "question": "Commonly used data types DO NOT include: ", "text": "alerts", "result": true },
{ "questionid": 1, "question": "Commonly used data types DO NOT include: ", "text": "numbers", "result": false }
],
[{ "questionid": 2, "question": "The condition in an if / else statement is enclosed within ______.", "text": "quotes", "result": false },
{ "questionid": 2, "question": "The condition in an if / else statement is enclosed within ______.", "text": "curly brackets", "result": false },
{ "questionid": 2, "question": "The condition in an if / else statement is enclosed within ______.", "text": "parentheses", "result": true },
{ "questionid": 2, "question": "The condition in an if / else statement is enclosed within ______.", "text": "square brackets", "result": false }
],
[{ "questionid": 3, "question": "Arrays in JavaScript can be used to store _______.", "text": "numbers and strings", "result": false },
{ "questionid": 3, "question": "Arrays in JavaScript can be used to store _______.", "text": "other arrays", "result": false },
{ "questionid": 3, "question": "Arrays in JavaScript can be used to store _______.", "text": "booleans", "result": false },
{ "questionid": 3, "question": "Arrays in JavaScript can be used to store _______.", "text": "all of the above", "result": true }
],
[{ "questionid": 4, "question": "String values must be enclosed within ______ when being assigned to variables.", "text": "commas", "result": false },
{ "questionid": 4, "question": "String values must be enclosed within ______ when being assigned to variables.", "text": "curly brackets", "result": false },
{ "questionid": 4, "question": "String values must be enclosed within ______ when being assigned to variables.", "text": "quotes", "result": true },
{ "questionid": 4, "question": "String values must be enclosed within ______ when being assigned to variables.", "text": "parentheses", "result": false }
],
[{ "questionid": 5, "question": "A very useful tool used during development and debugging for printing content to the debugger is:", "text": "JavaScript", "result": false },
{ "questionid": 5, "question": "A very useful tool used during development and debugging for printing content to the debugger is:.", "text": "terminal/bash", "result": false },
{ "questionid": 5, "question": "A very useful tool used during development and debugging for printing content to the debugger is:", "text": "for keeps", "result": false },
{ "questionid": 5, "question": "A very useful tool used during development and debugging for printing content to the debugger is:", "text": "console.log", "result": true }
],
[{ "questionid": 6, "question": "An example of a boolean variable is which of the following:", "text": "true", "result": true },
{ "questionid": 6, "question": "An example of a boolean variable is which of the following:", "text": "'yes'", "result": false },
{ "questionid": 6, "question": "An example of a boolean variable is which of the following:", "text": "235", "result": false },
{ "questionid": 6, "question": "An example of a boolean variable is which of the following:", "text": "'true'", "result": false }
]];

function startQuiz(event) {
    event.preventDefault();
    startButton.setAttribute("class","hide");
    playAgainButton.removeAttribute("class","hide");
    resetScore();
    for (var i of questionsUsed) {
        questionsPool.push(i);
    }
//    questionsUsed = [];
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
    return timeInterval;
}

function displayQuestion() {
    resultMessage.innerHTML = "";
    questionGroup.innerHTML = '';
    playAgainButton.setAttribute("class","hide");
    subHeader.setAttribute("class","hide");
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
            liButton.textContent = questionsPool[questionIndex][i].text;
            liButton.dataset.result = questionsPool[questionIndex][i].result;
        }
        questionsPool.splice(questionIndex, 1);
    }
}

function makeSelection(event) {
    event.preventDefault();
    var clickedAnswer = event.target;
    console.log(clickedAnswer);
    var newScore = 0;
    var currentTimer = Number(timerBox.innerHTML);
    var result = clickedAnswer.dataset.result;
    console.log(result);

    if (result === "true") {
        var newScore = 10;
        var adjTimeLeft = currentTimer;
        clickedAnswer.setAttribute("style","background-color: var(--lightgreen)");
    } else {
        var newScore = 0;
        var adjTimeLeft = currentTimer - 8;
        clickedAnswer.setAttribute("style","background-color:var(--darkred)");
    }
    clearInterval(timeInterval);
    countdown(adjTimeLeft);
    saveScores(newScore);
    displayResult(result);
}

function viewHighScores(event) {
    startButton.setAttribute("class","hide");
    playAgainButton.removeAttribute("class","hide");
    questionBox.innerHTML = "";
    var displayHighScores = localStorage.getItem("high-score");
    var highScoreItems = JSON.parse(displayHighScores);
    console.log( highScoreItems);
    var UlEl = document.createElement("ul");
    questionBox.appendChild(UlEl);
    for ( var scores in highScoreItems) {
     var LiEl = document.createElement("li");
      UlEl.appendChild(LiEl);
      LiEl.textContent = (highScoreItems[scores].initials + "  -   " + highScoreItems[scores].scores); 
      }
    }

function displayResult(result) {
    var hrEl = document.createElement("hr");
    var resultEl = document.createElement("h2");
    resultMessage.appendChild(hrEl);
    resultMessage.appendChild(resultEl);
    if (result === "true") {
        resultEl.textContent = "Correct! 🎉";
    } else {
        resultEl.textContent = "Wrong! 😔"
    }
    console.log(result);
    setTimeout(displayQuestion, 1000);
}

function lastQuestion() {
    clearInterval(timeInterval);
    displayTimeUp();
}

function displayTimeUp() {
    timer.textContent = "";
    subHeader.removeAttribute("class","hide");
    subHeader.textContent = "All Done!";
    subHeader.setAttribute("style","font-size:26px;color:var(--darkred)");
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
    gameoverH2.textContent = ("Your final score is " + score);
    gameoverP.textContent = "Input your initials:";
    gameoverInput.setAttribute("name", "initials");
    saveHighScoreBtn.removeAttribute("class", "hide");
    console.log("game over");
    return;
}

function resetScore() {
    localStorage.setItem("current-score", 0);
}
function resetHighScore() {
    localStorage.removeItem("high-score");
    refresh();
} 

function saveScores(score) {
    var currentScore = localStorage.getItem("current-score");
    var newCurrentScore = (score + (+currentScore));
    localStorage.setItem("current-score", newCurrentScore);
}
function saveFinalScore(event) {
    event.preventDefault();
    var inits = document.querySelector('input[name=initials]').value;
    var currFinalScore = localStorage.getItem("current-score")
    var highScores =
    {
        "scores": currFinalScore,
        "initials": inits
    }
    var existHighScores = localStorage.getItem("high-score");
    console.log(existHighScores);
    if (existHighScores !== null) {
        var newexistHighScores = JSON.parse(existHighScores);
        newexistHighScores.push(highScores);
        localStorage.setItem("high-score", JSON.stringify(newexistHighScores));
    } else {
        savedHighScore.push(highScores);

    localStorage.setItem("high-score", JSON.stringify(savedHighScore));
}
saveHighScoreBtn.setAttribute("class", "hide");
gameoverdiv.innerHTML = "";
var inits = "";
subHeader.setAttribute("class","hide");
playAgainButton.removeAttribute("class","hide");
}

function refresh() {
    window.location.reload();
}



startButton.addEventListener("click", startQuiz);
questionGroup.addEventListener("click", makeSelection);
resetHighScoreButton.addEventListener("click", resetHighScore);
saveHighScoreBtn.addEventListener("click", saveFinalScore);
highScore.addEventListener("click", viewHighScores);
playAgainButton.addEventListener("click", refresh);


