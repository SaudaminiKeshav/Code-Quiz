
// Region create quiz content json 
var quizContent = [
    {
        "question": "Inside which HTML element do we put the JavaScript?",
        "options": [
            "<js>",
            "<script>",
            "<javascript>",
            "<scripting>"
        ]
    },
    {
        "question": "Where is the correct place to insert a JavaScript?",
        "options": [
            "The <body> section",
            "The <head> section",
            "Both the <head> section and the <body> section are correct",
            "None of the above"
        ]
    },
    {
        "question": "What is the correct syntax for referring to an external script called \"xxx.js\"?",
        "options": [
            "<script name = \"xxx.js\">",
            "<script href = \"xxx.js\">",
            "<script src = \"xxx.js\">",
            "None of the above"
        ]
    },
    {
        "question": "The external JavaScript file must contain the <script> tag.",
        "options": [
            "True",
            "False"
        ]
    },
    {
        "question": "How do you write \"Hello World\" in an alert box?",
        "options": [
            "alertBox(\"Hello World\");",
            "alert(\"Hello World\");",
            "msg(\"Hello World\");",
            "msgBox(\"Hello World\");"
        ]
    },
    {
        "question": "How do you create a function in JavaScript?",
        "options": [
            "function:myFunction()",
            "function myFunction()",
            "function = myFunction()"
        ]
    },
    {
        "question": "How do you call a function named \"myFunction\"?",
        "options": [
            "myFunction()",
            "call function myFunction()",
            "call myFunction()"
        ]
    },
    {
        "question": "How to write an IF statement in JavaScript?",
        "options": [
            "if (i==5)",
            "if i = 5 then",
            "if i = 5",
            "if i == 5 then"
        ]
    },
    {
        "question": "How do you round the number 7.25, to the nearest integer?",
        "options": [
            "rnd(7.25)",
            "round(7.25)",
            "Math.round(7.25)",
            "Math.rnd(7.25)"
        ]
    },
    {
        "question": "Which event occurs when the user clicks on an HTML element?",
        "options": [
            "onChange",
            "onClick",
            "onmouseover",
            "onmouseclick"
        ]
    }
];

//End region

//Region HTML element creation
var cardBody = document.querySelector(".card-body");
var cardTitle = document.querySelector("h4");
var cardBodyText = document.querySelector("p");
var startQuizButton = document.querySelector("#start-quiz-button");
// End region 

// Region event listener
startQuizButton.addEventListener('click', function(){
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

var timerFunc = setInterval(function(){
timeCountdownValue.textContent = TotalTime;
console.log(`Timer running`);
TotalTime--;
if(TotalTime<0){
    clearInterval(timerFunc);
}
}, 1000);
// End region 

// Region quiz question creation 
function createAndDisplayQuizQuestions(cardBody){

    // Region create row and colums for quiz options 
    var rowDiv = document.createElement("div");
    rowDiv.setAttribute("class", "row rowBody py-5");

    var colDiv1 = document.createElement("div");
    colDiv1.setAttribute("class", "colBody col-lg-6");

    var colDiv2 = document.createElement("div");
    colDiv2.setAttribute("class", "colBody col-lg-6");
    // End region 

    // Region display quiz question 
    var questionPTag = document.createElement("p");
    questionPTag.setAttribute("class", "questionPTag");
    // End region 

    generateQuizQuestion(colDiv1, colDiv2, questionPTag);

    // Append question p tag, row and column div tags to body 
    cardBody.appendChild(questionPTag);
    rowDiv.appendChild(colDiv1);
    rowDiv.appendChild(colDiv2);
    cardBody.appendChild(rowDiv)
}

function generateQuizQuestion(colDiv1, colDiv2, questionPTag){
    createAndDisplayQuizOptions(colDiv1, "test text");
}

function createAndDisplayQuizOptions(colDiv, quizOption){
    var alertDiv = document.createElement("div");
    alertDiv.setAttribute("class", "alert alert-primary");
    alertDiv.setAttribute("role", "alert");
    alertDiv.textContent = quizOption;

    colDiv.appendChild(alertDiv);
}
// End region 