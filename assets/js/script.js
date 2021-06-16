

var numOfCorrectAnswers = 0;
var incorrectAnswers = 0;
var isGameOver = false;
var currentQuestion = 0;

// **************************************** Q&A Array ******************************* //
var questions = [
    "Commonly used data types DO NOT include:", 
    "The condition in an if / else statement is enclosed within", 
    "Arrays in Java Script can be used to store", 
    "String values must be enclosed within _____ when being assigned to variables.", 
    "A very useful tool used during development and debugging for printing content to the debugger is:"
]


var answers = [
    ["strings", "booleans", "alerts", "numbers"], 
    ["quotes", "curly brackets", "parenthesis", "square brackets"],
    ["numbers and strings", "other arrays", "booleans", "all of the above"],
    ["commas", "curly brackets", "quotes", "parenthesis"],
    ["JavaScript", "terminal/bash", "for loops", "console.log"]
]

// *************************************** correct answers array ********************** //
var correctAnswers = [2,2,3,3,3];

// ****************************************** Start quiz **************************** //
function loadQuestions() {
    
    setTime();
    setQuestionsAndAnswers(questions[currentQuestion], answers[currentQuestion]);
}

function setNextQuestion() {
    currentQuestion++;
    setQuestionsAndAnswers(questions[currentQuestion], answers[currentQuestion])
}

function increaseCorrectAnswer() {
    numOfCorrectAnswers++;
}

function increaseIncorrectAnswer() { 
    incorrectAnswers++;
}

function checkForCorrectAnswer(correctAnswerIndex, index) {
    console.log({correctAnswerIndex, index})
    if(correctAnswerIndex === index) {
        increaseCorrectAnswer();
    }else{
        increaseIncorrectAnswer();
    }
    setNextQuestion();
}

function setQuestionsAndAnswers(q, ans) {
    // Game is done display results
    if(!q || !ans) {
        displayScore()
        return;
    }
    var questionElement = document.getElementById("questionText")
    questionElement.innerText = q;
    var parentUL = document.getElementById("answers");
    parentUL.innerHTML = '';
    for(var i = 0; i < ans.length; i++){
        var ansItem = document.createElement('li')
        ansItem.id = i
        ansItem.innerText = ans[i];
        ansItem.addEventListener('click', (event) => {
            const itemId = parseInt(event.target.id, 10)
            checkForCorrectAnswer(correctAnswers[itemId], itemId)
            event.preventDefault();
        })
        parentUL.appendChild(ansItem)
    }
}

// ************************************* Set timer ************************//

function setTime(secondsLeft) {
    var secondsLeft = 30;
    var timeEl = document.getElementById("timer");
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if(secondsLeft == 0) {
            isGameOver = true;
            clearInterval(timerInterval);
            sendMessage();
        }
    }, 1000);
}



function sendMessage() {
    var timeEl = document.getElementById("timer");
    timeEl.textContent = "Game Over";
    var questionElement = document.getElementById("questionText")
    questionElement.innerText = "";
}


/* get a random question:
function getRandomQuestion(){
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    return randomQuestion;
}
const randomQuestion = getRandomQuestion();
*/

//************************************* submit initials and highscore *************//

function storeScore(name, score) {
    var highscore = localStorage.setItem("highscore", score);
    var nameInitials = localStorage.getItem("name", name);
    preventDefault();
}

function displayScore() {
    const scoreElement = document.getElementById("score");
    const currentScore = document.createElement("p");
    currentScore.innerText = "Your current score " + numOfCorrectAnswers + " / 5"
    scoreElement.append(currentScore)
    const nameInput = document.createElement('input');
    var name = "";
    nameInput.addEventListener('input', function (event){
        name = event.target.value;
    })
   
    scoreElement.append(nameInput)
    const submitButton = document.createElement('button')
    submitButton.innerText = "Submit"
    submitButton.addEventListener('click', function(event) {
        storeScore(name, numOfCorrectAnswers + " / 5" )
    })
    scoreElement.append(submitButton)
}

var btnStart = document.getElementById("btn");
btnStart.addEventListener("click", loadQuestions)

