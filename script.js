
//Region HTML element creation
var cardBody = document.querySelector(".card-body");
var cardTitle = document.querySelector("h4");
var cardBodyText = document.querySelector("p");
var startQuizButton = document.querySelector("#start-quiz-button");
// End region 

// Region event listener
startQuizButton.addEventListener('click', function () {
    cardBody.removeChild(cardTitle);
    cardBody.removeChild(cardBodyText);

    cardBody.appendChild(timerLabel);
    timerLabel.appendChild(timeCountdownValue);
    createAndDisplayQuizQuestions(cardBody);
})
// End region 

// Region timer 
var TotalTime = 100;
var timerLabel = document.createElement("p");
timerLabel.setAttribute("class", "timer-label");
timerLabel.textContent = "Time remaining: "

var timeCountdownValue = document.createElement("h5");
timeCountdownValue.setAttribute("class", "timeCountdownValue");

var timerFunc = setInterval(function () {
    timeCountdownValue.textContent = TotalTime;
    TotalTime--;
    if (TotalTime < 0) {
        clearInterval(timerFunc);
    }
}, 1000);
// End region 

// Region quiz question creation 
function createAndDisplayQuizQuestions(cardBody) {
    //Get quiz content from json
    var quizObj = JSON.parse(JSON.stringify(quizContent));

    // Region create row and colums for quiz options 
    var rowDiv = document.createElement("div");
    rowDiv.setAttribute("class", "row rowBody py-5 justify-content-center");

    var colDiv = document.createElement("div");
    colDiv.setAttribute("class", "colBody col-lg-6");

    // End region 

    // Region display quiz question 
    var questionPTag = document.createElement("p");
    questionPTag.setAttribute("class", "questionPTag");
    // End region 

    var i = 0;
    generateQuizQuestion(colDiv, questionPTag, quizObj[i]);

    // Append question p tag, row and column div tags to body 
    cardBody.appendChild(questionPTag);
    rowDiv.appendChild(colDiv);
    cardBody.appendChild(rowDiv)
}

function generateQuizQuestion(colDiv, questionPTag, quizObj) {
    questionPTag.textContent = quizObj.question;
    for (var i = 0; i < quizObj.options.length; i++) {
        createAndDisplayQuizOptions(colDiv, quizObj.options[i], quizObj.correctOption);
    }
   
}

function createAndDisplayQuizOptions(colDiv, quizOption, correctOption) {
    var alertDiv = document.createElement("div");
    alertDiv.setAttribute("class", "alert alert-primary");
    alertDiv.setAttribute("role", "alert");
    alertDiv.textContent = quizOption;
    colDiv.appendChild(alertDiv);
    addQuizOptionsClickListener(alertDiv, quizOption, correctOption)
}
// End region 

// Region quiz options click listener 
function addQuizOptionsClickListener(alertDiv,  selectedOption, correctOption){
    alertDiv.addEventListener('click', function(){
        if(selectedOption == correctOption){
            console.log("Correct answer");
        }else{
            console.log("Wrong answer");
            if(TotalTime != 0){
                TotalTime = TotalTime - 5;
            }
        }
    })
}
// End region 

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
        "question": "The external JavaScript file must contain the <script> tag.",
        "options": [
            "True",
            "False"
        ],
        "correctOption": "False"
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
            "function = myFunction()"
        ],
        "correctOption": "function myFunction()"
    },
    {
        "question": "How do you call a function named \"myFunction\"?",
        "options": [
            "myFunction()",
            "call function myFunction()",
            "call myFunction()"
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