// Region create quiz content json 
var quizContent = [
    {
        "question": "Inside which HTML element do we put the JavaScript?",
        "options": [
            "<js>",
            "<script>",
            "<javascript>",
            "<scripting>"
        ],
        "correctOption": "<script>"
    },
    {
        "question": "Where is the correct place to insert a JavaScript?",
        "options": [
            "The <body> section",
            "The <head> section",
            "Both the <head> section and the <body> section are correct",
            "None of the above"
        ],
        "correctOption": "The <body> section"
    },
    {
        "question": "What is the correct syntax for referring to an external script called \"xxx.js\"?",
        "options": [
            "<script name = \"xxx.js\">",
            "<script href = \"xxx.js\">",
            "<script src = \"xxx.js\">",
            "None of the above"
        ],
        "correctOption": "<script src = \"xxx.js\">"
    },
    {
        "question": "What is the correct JavaScript syntax to change the content of the HTML element below? <p id=\"demo\">This is a demonstration.</p>",
        "options": [
            "document.getElement(\"p\").innerHTML = \"Hello World!\";",
            "document.getElementByName(\"p\").innerHTML = \"Hello World!\";",
            "#demo.innerHTML = \"Hello World!\";",
            "document.getElementById(\"demo\").innerHTML = \"Hello World!\";"
        ],
        "correctOption": "document.getElementById(\"demo\").innerHTML = \"Hello World!\";"
    },
    {
        "question": "How do you write \"Hello World\" in an alert box?",
        "options": [
            "alertBox(\"Hello World\");",
            "alert(\"Hello World\");",
            "msg(\"Hello World\");",
            "msgBox(\"Hello World\");"
        ],
        "correctOption": "alert(\"Hello World\");"
    },
    {
        "question": "How do you create a function in JavaScript?",
        "options": [
            "function:myFunction()",
            "function myFunction()",
            "function = myFunction()",
            "None of the above"
        ],
        "correctOption": "function myFunction()"
    },
    {
        "question": "How do you call a function named \"myFunction\"?",
        "options": [
            "myFunction()",
            "call function myFunction()",
            "call myFunction()",
            "All of the above"
        ],
        "correctOption": "myFunction()"
    },
    {
        "question": "How to write an IF statement in JavaScript?",
        "options": [
            "if (i==5)",
            "if i = 5 then",
            "if i = 5",
            "if i == 5 then"
        ],
        "correctOption": "if (i==5)"
    },
    {
        "question": "How do you round the number 7.25, to the nearest integer?",
        "options": [
            "rnd(7.25)",
            "round(7.25)",
            "Math.round(7.25)",
            "Math.rnd(7.25)"
        ],
        "correctOption": "Math.round(7.25)"
    },
    {
        "question": "Which event occurs when the user clicks on an HTML element?",
        "options": [
            "onChange",
            "onClick",
            "onmouseover",
            "onmouseclick"
        ],
        "correctOption": "onClick"
    }
];

//End region

var quizQuestionIndex = 0;
var totalQuestions = 10;

//Region HTML element creation
var cardBody = document.querySelector(".card-body");
var cardTitle = document.querySelector("h4");
var cardBodyText = document.querySelector("p");
var startQuizButton = document.querySelector("#start-quiz-button");
// End region 

// Region create html elements - row and colums for quiz options 
var rowDiv = document.createElement("div");
rowDiv.setAttribute("class", "row rowBody py-5 justify-content-center");

var colDiv = document.createElement("div");
colDiv.setAttribute("class", "colBody col-lg-6");

// Display quiz question 
var questionPTag = document.createElement("p");
questionPTag.setAttribute("class", "questionPTag");

var nextButton = document.createElement("button");
nextButton.setAttribute("class", "next-question-button");
nextButton.textContent = "Next";

//Parse quiz content from json
var quizObj = JSON.parse(JSON.stringify(quizContent));

// Region creating div elements to display prgress bar 
var progressDiv = document.createElement("div");
progressDiv.setAttribute("class", "progress");

var progressBarDiv = document.createElement("div");
progressBarDiv.setAttribute("class", "progress-bar bg-success");
progressBarDiv.setAttribute("role", "progressbar");
progressBarDiv.setAttribute("aria-valuemin", "0");
progressBarDiv.setAttribute("aria-valuemax", "100");
// End region 

// Region timer 
var TotalTime = 100;
var timerLabel = document.createElement("p");
timerLabel.setAttribute("class", "timer-label");
timerLabel.textContent = "Time remaining: "

var timeCountdownValue = document.createElement("p");
timeCountdownValue.setAttribute("class", "timeCountdownValue");

var timerFunc = setInterval(function () {
    timeCountdownValue.textContent = TotalTime;
    if (TotalTime > 0) {
        --TotalTime;
    }
    if (TotalTime == 0 || TotalTime <= 9) {
        nextButton.textContent = "Quiz Summary";
    }
    if (TotalTime < 0) {
        clearInterval(timerFunc);
    }
}, 1000);
// End region 

// Start button Event listener
startQuizButton.addEventListener('click', function () {
    cardBody.removeChild(cardTitle);
    cardBody.removeChild(cardBodyText);

    cardBody.appendChild(timerLabel);
    timerLabel.appendChild(timeCountdownValue);
    createAndDisplayQuizQuestions();
})
// End region 

// Next button event listener 
nextButton.addEventListener('click', function () {
    if (TotalTime < 0) {
        clearInterval(timerFunc);
    } else if (TotalTime > 9) {
        displayNextQuestion();
    }
    if (TotalTime == 0 || TotalTime <= 9) {
        nextButton.textContent = "Quiz Summary";
        createAndDisplayQuizSummaryPage();
    }
})
// End region 

// Region quiz question creation 
function createAndDisplayQuizQuestions() {
    generateQuizQuestion(quizQuestionIndex);

    // Append question p tag, row and column div tags to body 
    cardBody.appendChild(questionPTag);
    rowDiv.appendChild(colDiv);
    cardBody.appendChild(rowDiv)
    cardBody.appendChild(nextButton);
}

function generateQuizQuestion(quizQuestionIndex) {


    questionPTag.textContent = quizObj[quizQuestionIndex].question;
    for (var i = 0; i < quizObj[quizQuestionIndex].options.length; i++) {
        createAndDisplayQuizOptions(quizObj[quizQuestionIndex].options[i], quizObj[quizQuestionIndex].correctOption, i);
    }
}

function createAndDisplayQuizOptions(quizOption, correctOption, divCount) {
    var alertDiv = document.createElement("div");
    alertDiv.setAttribute("class", "alert alert-primary");
    alertDiv.setAttribute("role", "alert");
    alertDiv.setAttribute("style", "word-wrap:break-word;");
    alertDiv.setAttribute("id", `alertDiv${divCount}`);
    console.log(divCount);
    alertDiv.textContent = quizOption;
    colDiv.appendChild(alertDiv);
    addQuizOptionsClickListener(alertDiv, quizOption, correctOption)
}
// End region 

// Region quiz options click listener 
function addQuizOptionsClickListener(alertDiv, selectedOption, correctOption) {
    alertDiv.addEventListener('click', function () {
        alertDiv.setAttribute("class", "alert alert-primary border border-primary");

        if (TotalTime <= 0) {
            nextButton.textContent = "Quiz Summary";
        }

        if (selectedOption == correctOption) {
            console.log("Correct answer");
            ++quizQuestionIndex
        } else {
            console.log("Wrong answer");
            if (TotalTime > 9) {
                TotalTime = TotalTime - 10;
            }
            ++quizQuestionIndex
        }
    })
}
// End region 

// Region display next question 
function displayNextQuestion() {
    var optionPos0 = document.querySelector("#alertDiv0");
    var optionPos1 = document.querySelector("#alertDiv1");
    var optionPos2 = document.querySelector("#alertDiv2");
    var optionPos3 = document.querySelector("#alertDiv3");

    console.log(optionPos0);
    console.log(optionPos1);
    console.log(optionPos2);
    console.log(optionPos3);

    var optionArray = [optionPos0, optionPos1, optionPos2, optionPos3];

    questionPTag.textContent = quizObj[quizQuestionIndex].question;
    console.log(optionArray[i]);
    for (var i = 0; i < quizObj[quizQuestionIndex].options.length; i++) {
        optionArray[i].textContent = quizObj[quizQuestionIndex].options[i];
        optionArray[i].setAttribute("class", "alert alert-primary");
    }
}
// End region 

function createAndDisplayQuizSummaryPage() {
    cardBody.removeChild(timerLabel);
    cardBody.removeChild(questionPTag);
    rowDiv.removeChild(colDiv);
    cardBody.removeChild(rowDiv)
    cardBody.removeChild(nextButton);


    progressBarDiv.setAttribute("style", "width: 45%");
    progressBarDiv.setAttribute("aria-valuenow", "45");


    progressBarDiv.textContent = "45%";

    progressDiv.appendChild(progressBarDiv);
    cardBody.appendChild(progressDiv);

}