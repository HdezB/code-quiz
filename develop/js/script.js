var questionSection = document.querySelector("#questions");
var questionText = document.querySelector("#question-title");
var timerEl = document.querySelector("#timer");
var answerChoices = document.getElementById("answer-choices");
var startButton = document.querySelector("#startquiz-btn");
var submitBtn = document.querySelector("#highscore-submit-btn")
var initialsEl = document.querySelector("#initials")
var questionCounter = 0;
var timeScore = 60;
function startQuiz() {
    //hide the intro-page
    var removeIntro = document.querySelector(".intro");
    removeIntro.setAttribute("class", "hide")
    
    questionSection.removeAttribute("class");
    timer();
    createQuestion();
    timerEl.textContent = timeScore;
}

var questions = [
    {
        question: "Question 1. Commonly used data types DO NOT Include: _____",
        answer: [
            { choiceOne: "A. Strings", correct: false },
            { choiceTwo: "B. booleans", correct: false },
            { choiceThree: "C. Alerts", correct: true },
            { choiceFour: "D. Numbers", correct: false }
        ]
    },
    {
        question: "Question 2. The condition in an if/else statement is enclosed within: _____",
        answer: [
            { choiceOne: "A. Quotes", correct: false },
            { choiceTwo: "B. Curly Brackets", correct: false },
            { choiceThree: "C. Parentheses", correct: true },
            { choiceFour: "D. Square Brackets", correct: false }
        ]
    },
    {
        question: "Question 3. Arrays in JavaScript can be used to store ____",
        answer: [
            { choiceOne: "A. Numbers and Strings", correct: false },
            { choiceTwo: "B. Other Arrays", correct: false },
            { choiceThree: "C. Booleans", correct: false },
            { choiceFour: "D. All of the above", correct: true }
        ]
    },
    {
        question: "Question 4. String values must be enclosed within ____ when being assigned to variables.",
        answer: [
            { choiceOne: "A. Commas", correct: false },
            { choiceTwo: "B. Curly Brackets", correct: false },
            { choiceThree: "C. Quotes", correct: true },
            { choiceFour: "D. Parentheses", correct: false }
        ]
    }
]

function createQuestion() {
        for (var i = 0; i <= questionCounter; i++) {
            questionText.innerHTML = "<h2>" + questions[questionCounter].question + "</h2>";
            answerChoices.innerHTML = "<p id='answer-choice-one' class = 'btn'data-answer='" + questions[questionCounter].answer[0].correct + "'>" + questions[questionCounter].answer[0].choiceOne + "</p>";
            answerChoices.insertAdjacentHTML("beforeend", "<p id='answer-choice-two' class = 'btn' data-answer='" + questions[questionCounter].answer[1].correct + "'>" + questions[questionCounter].answer[1].choiceTwo + "</p>");
            answerChoices.insertAdjacentHTML("beforeend", "<p id='answer-choice-three' class = 'btn' data-answer='" + questions[questionCounter].answer[2].correct + "'>" + questions[questionCounter].answer[2].choiceThree + "</p>");
            answerChoices.insertAdjacentHTML("beforeend", "<p id='answer-choice-four' class = 'btn' data-answer='" + questions[questionCounter].answer[3].correct + "'>" + questions[questionCounter].answer[3].choiceFour + "</p>");
            answerChoices.addEventListener("click", checkAnswer);
        }
}

function checkAnswer() {
    choosenAnswer = event.target.dataset.answer;
    if (choosenAnswer === "true") {
        //IN SECTION QUESTIONS CREATE P WITH AN UNDERLINE. And call createQuestion plus increament counter.
        questionCounter++
        if (questionCounter <= 3) {
            createQuestion();
        }
    }
    else {
        timeScore = timeScore - 10;
        questionCounter++
        if (questionCounter <= 3) {
            createQuestion();
        }
    }
}

function timer() {
    var timerInterval = setInterval(function () {
            timerEl.textContent = "Timer: " + timeScore;
            timeScore--;
            if (timeScore == 0 || questionCounter > 3) {
                clearInterval(timerInterval);
                submitHighscore();
                timerEl.textContent = "";
            }
    }, 1000);
}

function submitHighscore() {

    var submitScoresScreen = document.querySelector("#results");
    submitScoresScreen.removeAttribute("class");

    var highscore = document.querySelector("#highscore-result")
    highscore.textContent = timeScore;
    
    questionSection.setAttribute("class", "hide");
}

function saveHighscore() {

    var initials = initialsEl.value.trim();

    if (initials !== "") {
        var scores = JSON.parse(window.localStorage.getItem("scores")) || [];

        var newScores = {
            score: timeScore,
            initials: initials
        };
        scores.push(newScores);
        window.localStorage.setItem("scores", JSON.stringify(scores));
        getHighscores();
    }
}

function getHighscores() {
    var scoresArr = JSON.parse(localStorage.getItem("scores"));
    for (var i = 0; i < scoresArr.length; i++) {
        var li = document.createElement("li");
        var ul = document.getElementById("highscores-list");

        li.textContent = scoresArr[i].initials + " " + scoresArr[i].score;
        ul.appendChild(li);
    }
}


startButton.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", saveHighscore)