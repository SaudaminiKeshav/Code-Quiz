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
        "question": "Which of the following function of String object returns the calling string value converted to lower case while respecting the current locale?",
        "options": [
            "toLocaleLowerCase()",
            "toLowerCase()",
            "toString()",
            "substring()"
        ],
        "correctOption": "toLocaleLowerCase()"
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
var score = 0;
var selectedQuizOption = "";
var correctQuizOption = "";
var userData = [];
var alertDivList = ["alertDiv0", "alertDiv1", "alertDiv2", "alertDiv3"];

//Region HTML element creation
var cardBody = document.querySelector(".card-body");
var cardTitle = document.querySelector("h4");
var cardBodyText = document.querySelector("p");
var startQuizButton = document.querySelector("#start-quiz-button");
// End region 

// Region create html elements - row and colums for quiz options 
var br = document.createElement("br");

var rowDiv = document.createElement("div");
rowDiv.setAttribute("class", "row rowBody py-5 justify-content-center");

var colDiv = document.createElement("div");
colDiv.setAttribute("class", "colBody col-lg-6");

// Display quiz question 
var questionPTag = document.createElement("h5");
questionPTag.setAttribute("class", "questionPTag");

var nextButton = document.createElement("button");
nextButton.setAttribute("class", "next-question-button");
nextButton.textContent = "Next";

//Parse quiz content from json
var quizObj = JSON.parse(JSON.stringify(quizContent));

// Region creating div elements to display prgress bar 
var progressDiv = document.createElement("div");

// Region create div to display snackbar 
var toastDiv = document.createElement("div");
toastDiv.setAttribute("class", "toast mt-3");
var toastBodyDiv = document.createElement("div");
toastBodyDiv.setAttribute("class", "toast-body");
toastDiv.appendChild(toastBodyDiv);

// End region 

progressDiv.setAttribute("class", "progress");

var progressBarDiv = document.createElement("div");
progressBarDiv.setAttribute("class", "progress-bar bg-success");
progressBarDiv.setAttribute("role", "progressbar");
progressBarDiv.setAttribute("aria-valuemin", "0");
progressBarDiv.setAttribute("aria-valuemax", "100");
// End region 

// Region progress summary 
var quizStatus = document.createElement("h4");
quizStatus.setAttribute("class", "quizResult")
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


    console.log(selectedQuizOption);
    console.log(correctQuizOption);

    if (selectedQuizOption == correctQuizOption) {
        score++;
        console.log(`Correct answer ${score}`);
    } else {
        console.log("Wrong answer");
        console.log(`Wrong answer ${TotalTime}`);
        if (TotalTime > 9) {
            TotalTime = TotalTime - 10;
        }
        console.log(`Wrong answer ${TotalTime}`);
    }

    if (TotalTime <= 0 || TotalTime <= 9 || quizQuestionIndex == 9) {
        clearInterval(timerFunc);
        nextButton.textContent = "Quiz Summary";
        createAndDisplayQuizSummaryPage();
    } else if (TotalTime > 9) {
        if (quizQuestionIndex != 9) {
            displayNextQuestion();
        }
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
    alertDiv.setAttribute("onclick", "clickFunction(this.id)");
    console.log(divCount);
    alertDiv.textContent = quizOption;
    colDiv.appendChild(alertDiv);
    addQuizOptionsClickListener(alertDiv, quizOption, correctOption);
}
// End region 

function clickFunction(alertDivid) {

    var alertDiv = document.getElementById(alertDivid);

    alertDiv.setAttribute("class", "alert alert-primary border border-primary");

    selectedQuizOption = alertDiv.textContent;

    alertDivList = ["alertDiv0", "alertDiv1", "alertDiv2", "alertDiv3"];

    var index = alertDivList.indexOf(alertDivid);
    if (index > -1) {
        alertDivList.splice(index, 1);
    }

    alertDivList.forEach(element => {
        var alertDiv = document.querySelector(`#${element}`);
        alertDiv.setAttribute("class", "alert alert-primary");
    });
    console.log(selectedQuizOption);
    console.log(correctQuizOption);
}

// Region quiz options click listener 
function addQuizOptionsClickListener(alertDiv, selectedOption, correctOption) {
    alertDiv.addEventListener('click', function () {
        this.setAttribute("class", "alert alert-primary border border-primary");

        console.log(alertDivList);

        alertDivList = ["alertDiv0", "alertDiv1", "alertDiv2", "alertDiv3"];

        console.log(alertDiv);
        console.log(alertDivList);

        var index = alertDivList.indexOf(this.id);
        if (index > -1) {
            alertDivList.splice(index, 1);
        }

        alertDivList.forEach(element => {
            var div = document.querySelector(`#${element}`);
            div.setAttribute("class", "alert alert-primary");
        });

        selectedQuizOption = selectedOption;
        correctQuizOption = correctOption;

        console.log(selectedQuizOption);
        console.log(correctQuizOption);

        console.log(alertDivList);

    }, { once: true })

}
// End region 

// Region display next question 
function displayNextQuestion() {
    var optionPos0 = document.querySelector("#alertDiv0");
    var optionPos1 = document.querySelector("#alertDiv1");
    var optionPos2 = document.querySelector("#alertDiv2");
    var optionPos3 = document.querySelector("#alertDiv3");

    var optionArray = [optionPos0, optionPos1, optionPos2, optionPos3];

    // resetAlertDivBorderOfSelectedOption();

    console.log(optionArray[i]);

    ++quizQuestionIndex;

    for (var i = 0; i < quizObj[quizQuestionIndex].options.length; i++) {
        console.log(quizQuestionIndex);
        questionPTag.textContent = quizObj[quizQuestionIndex].question;

        optionArray[i].textContent = quizObj[quizQuestionIndex].options[i];
        optionArray[i].setAttribute("class", "alert alert-primary");

        addQuizOptionsClickListener(optionArray[i], quizObj[quizQuestionIndex].options[i], quizObj[quizQuestionIndex].correctOption);
    }
}
// End region 

// function resetAlertDivBorderOfSelectedOption() {

//     alertDivList = ["alertDiv0", "alertDiv1", "alertDiv2", "alertDiv3"];

//     alertDivList.forEach(element => {
//         var alertDiv = document.querySelector(`#${element}`);
//         alertDiv.style.pointerEvents = 'auto';
//     });
// }

function createAndDisplayQuizSummaryPage() {
    cardBody.removeChild(timerLabel);
    cardBody.removeChild(questionPTag);
    rowDiv.removeChild(colDiv);
    cardBody.removeChild(rowDiv)
    cardBody.removeChild(nextButton);


    setProgressPercentage();

    progressDiv.appendChild(progressBarDiv);
    cardBody.appendChild(progressDiv);
}

function setProgressPercentage() {
    var percentage = 0;
    if (score != 0) {
        percentage = (score / 10) * 100;
        console.log(percentage);
        progressBarDiv.setAttribute("style", `width: ${percentage}%`);
        progressBarDiv.setAttribute("aria-valuenow", `${percentage}`);
        progressBarDiv.textContent = `${percentage}%`;
    } else {
        console.log(percentage);
        progressBarDiv.setAttribute("style", `width: 100%`);
        progressBarDiv.setAttribute("aria-valuenow", `0`);
        progressBarDiv.textContent = `0%`;
    }

}

function createAndDisplayQuizSummaryPage() {

    removeQuizhtmlElements();

    displayQuizSummarryData();

    cardBody.appendChild(quizStatus);
    progressDiv.appendChild(progressBarDiv);
    cardBody.appendChild(progressDiv);
    cardBody.appendChild(br);

    addButtonsDiv()

    addSubmitButtonDiv()

    var resultPer = setProgressPercentage();
    displayScoreData(resultPer);
}

function setProgressPercentage() {
    var percentage = 0;
    percentage = score * 10;
    console.log(percentage);
    progressBarDiv.setAttribute("style", `width: ${percentage}%`);
    progressBarDiv.setAttribute("aria-valuenow", `${percentage}`);
    progressBarDiv.textContent = `${percentage}%`;
    return percentage;
}

function removeQuizhtmlElements() {
    cardBody.removeChild(timerLabel);
    cardBody.removeChild(questionPTag);
    rowDiv.removeChild(colDiv);
    cardBody.removeChild(rowDiv)
    cardBody.removeChild(nextButton);
}

function displayScoreData(resultPer) {
    quizStatus.textContent = "";
    if (resultPer < 50) {
        quizStatus.textContent = "Fail";
    } else if (resultPer >= 50) {
        quizStatus.textContent = "Pass";
    }
}

function displayQuizSummarryData() {
    var totalPercent = document.createElement("p");
    totalPercent.textContent = "Total percentage: 100%"

    var passPercent = document.createElement("p");
    passPercent.textContent = "Pass percentage: 50%"

    cardBody.appendChild(totalPercent);
    cardBody.appendChild(passPercent);
}

function addButtonsDiv() {
    var buttonsDiv = document.createElement("div");
    buttonsDiv.setAttribute("class", "white-bg");

    var retakeQuiz = document.createElement("button");
    retakeQuiz.setAttribute("class", "custom-button");
    retakeQuiz.textContent = "Retake Quiz";

    var reviewResult = document.createElement("button");
    reviewResult.setAttribute("class", "custom-button");
    reviewResult.textContent = "Review Result";

    buttonsDiv.appendChild(retakeQuiz);
    buttonsDiv.appendChild(reviewResult);

    cardBody.appendChild(br);
    cardBody.appendChild(buttonsDiv);
}

function addSubmitButtonDiv() {
    var buttonsDiv = document.createElement("div");
    buttonsDiv.setAttribute("class", "white-bg");

    var submitIntials = document.createElement("button");
    submitIntials.setAttribute("class", "custom-button");
    submitIntials.textContent = "Submit";

    var intialsInput = document.createElement("INPUT");
    intialsInput.setAttribute("type", "text");
    intialsInput.setAttribute("placeholder", "Input Initials");
    intialsInput.setAttribute("class", "white-bg");

    var successMessage = document.createElement("p");
    successMessage.textContent = "Submitted successfully!"

    buttonsDiv.appendChild(intialsInput);
    buttonsDiv.appendChild(submitIntials);
    cardBody.appendChild(buttonsDiv);

    submitIntials.addEventListener('click', function () {
        storeUserInitialAndScoreToLocalStorage(intialsInput.value);

        cardBody.appendChild(successMessage);
    })
}

function storeUserInitialAndScoreToLocalStorage(intialsInput) {
    console.log(intialsInput);
    console.log(score);

    var scoresArray = "";
    scoresArray = JSON.parse(localStorage.getItem('UserScore'));
    console.log(scoresArray);

    if (scoresArray != "") {
        scoresArray = JSON.parse(localStorage.getItem('UserScore'));
        scoresArray.push({ key: `${score}`, value: `${intialsInput} - ${score * 10}` });
        localStorage.setItem(`UserScore`, JSON.stringify(scoresArray));
    } else {
        userData.push({ key: `${score}`, value: `${intialsInput} - ${score * 10}` })

        console.log(userData);

        localStorage.setItem(`UserScore`, JSON.stringify(userData));
    }
}