var start = document.getElementById("start-button");
var intro = document.getElementById("intro");
var highScoresEl = document.getElementsByClassName("high-scores");
var result = document.getElementById("result");
var timerEl = document.getElementById("timer");
var startQuizBtn = document.getElementById("start-button");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");

var questionsLength = questions.length;
var secondsRemaining;
var interval;
var finalScore;

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
var timer;
var score = 0;

function renderQuestion(){
    var q = questions[runningQuestion];
    question.innerHTML = "<p>"+ q.title +"</p>";
    choiceA.innerHTML = q.choices[0];
    choiceB.innerHTML = q.choices[1];
    choiceC.innerHTML = q.choices[2];
    choiceD.innerHTML = q.choices[3];
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz(){
    intro.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    startTimer();
    // timer = setInterval(renderCounter, 1000);
    checkAnswer();
};

// //  15 seconds per question
var startTimer = function() {
    // Set the game play timer
    var gameTime = parseInt(questionsLength * 15 * 100);
    console.log(gameTime);
    var interval = setInterval(function(){
    secondsRemaining = gameTime - count;
    var sec = Math.floor(secondsRemaining / 100);
    // var min = Math.floor(secondsRemaining / 100 / 60);
    // timerEl.textContent = min + ":" + sec;
    timerEl.textContent = sec;
    count++;

    if (secondsRemaining == 0){
        clearInterval(interval);
        timerEl.textContent = "00:00";
        }
    },10)
};
// Check for users' answer
function checkAnswer(answer){
    if (answer == questions[runningQuestion].answer){
        // Correct answer
        result.textContent = "Correct!";
        secondsRemaining += 15;
        console.log(secondsRemaining / 100);
    }else{
        // Wrong answer
        secondsRemaining -= 15;
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(interval);
        scoreRender();
    }
}

// score render
function scoreRender(){        
    finalScore.innerHTML += "<p id= scoreP>" + secondsRemaining + "</p>";
}

var initials = document.getElementById("initials");
var finalScore = document.getElementById("final-score");
var btnInsert = document.getElementById("btn-insert");
var lsOutput = document.getElementById("lsOutput");
var scorePer = document.getElementById("scoreP");

btnInsert.onclick = function() {
    const key = initials.value;
    const value = secondsRemaining;
    console.log(key, value);
    if (key && value) {
        localStorage.setItem(key, value);
        location.reload();
    }
};

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log("this is the -" + key, value)

    lsOutput.innerHTML += `${key}: ${value}<br />`;

}

