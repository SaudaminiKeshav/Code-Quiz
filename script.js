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

// Region Variable assignment
var quizQuestionIndex = 0;
var totalQuestions = 10;
var score = 0;
var selectedQuizOption = "";
var correctQuizOption = "";
var userData = [];
var alertDivList = ["alertDiv0", "alertDiv1", "alertDiv2", "alertDiv3"];
var userAnswerList = [];
// EndRegion 

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

// Region create a progressbar 
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
    userAnswerList.push(selectedQuizOption);

    if (selectedQuizOption == correctQuizOption) {
        console.log(selectedQuizOption);
        score++;
    } else {
      
        if (TotalTime > 9) {
            TotalTime = TotalTime - 10;
        }
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
    alertDiv.textContent = quizOption;
    colDiv.appendChild(alertDiv);
    addQuizOptionsClickListener(alertDiv, quizOption, correctOption);
}
// End region 

// Region quiz option click function 
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
}
// End region 

// Region quiz options click listener 
function addQuizOptionsClickListener(alertDiv, selectedOption, correctOption) {
    alertDiv.addEventListener('click', function () {
        this.setAttribute("class", "alert alert-primary border border-primary");

        alertDivList = ["alertDiv0", "alertDiv1", "alertDiv2", "alertDiv3"];

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

    ++quizQuestionIndex;

    for (var i = 0; i < quizObj[quizQuestionIndex].options.length; i++) {
        questionPTag.textContent = quizObj[quizQuestionIndex].question;

        optionArray[i].textContent = quizObj[quizQuestionIndex].options[i];
        optionArray[i].setAttribute("class", "alert alert-primary");

        addQuizOptionsClickListener(optionArray[i], quizObj[quizQuestionIndex].options[i], quizObj[quizQuestionIndex].correctOption);
    }
}
// End region 

// Region create summary page 
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
// End region 

// Region set up progress div and display progress bar percentage 
function setProgressPercentage() {
    var percentage = 0;
    percentage = score * 10;
    console.log(score);
    
    var emptyCount = 0;

    userAnswerList.forEach(element => {
        if (element == "") {
            emptyCount++;
        }
    });

    if (emptyCount == quizContent.length) {
    progressBarDiv.setAttribute("style", `width: 0%`);
    progressBarDiv.setAttribute("aria-valuenow", `0`);
    progressBarDiv.setAttribute("font-weight","bold");
    progressBarDiv.setAttribute("color"," black");
    progressBarDiv.textContent = `0%`;
    } else{
        progressBarDiv.setAttribute("style", `width: ${percentage}%`);
        progressBarDiv.setAttribute("aria-valuenow", `${percentage}`);
        progressBarDiv.setAttribute("font-weight","bold");
        progressBarDiv.textContent = `${percentage}%`;
    }
}
// End region 

// region create and display quiz summary page 
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
// End region 

// Region remove all child element from the cardBody div to display quiz summary 
function removeQuizhtmlElements() {
    cardBody.removeChild(timerLabel);
    cardBody.removeChild(questionPTag);
    rowDiv.removeChild(colDiv);
    cardBody.removeChild(rowDiv)
    cardBody.removeChild(nextButton);
}
// End region 

// Region display score result 
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
// End region 

// Region add retake quizContent, review results, and submit score buttons 
function addButtonsDiv() {
    var buttonsDiv = document.createElement("div");
    buttonsDiv.setAttribute("class", "white-bg");

    var retakeQuiz = document.createElement("button");
    retakeQuiz.setAttribute("class", "custom-button");
    retakeQuiz.textContent = "Retake Quiz";
    addRetakeQuizEventListner(retakeQuiz);

    var reviewResults = document.createElement("button");
    reviewResults.setAttribute("class", "custom-button");
    reviewResults.textContent = "Review Results";
    addReviewResultsEventListner(reviewResults);

    buttonsDiv.appendChild(retakeQuiz);
    buttonsDiv.appendChild(reviewResults);

    cardBody.appendChild(br);
    cardBody.appendChild(buttonsDiv);
}
// End region 

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

    var scoresArray = [];
    scoresArray = JSON.parse(localStorage.getItem('UserScore'));
    console.log(scoresArray);

    if (scoresArray != undefined || scoresArray != null) {
        if (scoresArray.length != 0) {
            scoresArray = JSON.parse(localStorage.getItem('UserScore'));
            scoresArray.push({ key: `${score}`, value: `${intialsInput} - ${score * 10}` });
            localStorage.setItem(`UserScore`, JSON.stringify(scoresArray));
        }
    } else {
        userData.push({ key: `${score}`, value: `${intialsInput} - ${score * 10}` })

        console.log(userData);

        localStorage.setItem(`UserScore`, JSON.stringify(userData));
    }
}


function addRetakeQuizEventListner(retakeQuiz) {
    retakeQuiz.addEventListener('click', function () {
        window.location.reload();
    })
}

function addReviewResultsEventListner(reviewResults) {
    reviewResults.addEventListener('click', function () {

        // Remove all the child nodes of cardBody 
        while (cardBody.firstChild) {
            cardBody.removeChild(cardBody.firstChild);
        }

        //Adding a titlte to the review page 
        var titleTag = document.createElement("h2");
        titleTag.setAttribute("class", "white-bg");
        titleTag.textContent = "Review Results";
        cardBody.appendChild(titleTag);
        cardBody.appendChild(getHrElement());
        cardBody.appendChild(getBrElement());

        console.log(userAnswerList);

        var emptyCount = 0;

        userAnswerList.forEach(element => {
            if (element == "") {
                emptyCount++;
            }
        });

        if (emptyCount == quizContent.length) {
            var emptyText = document.createElement("p");
            emptyText.textContent = "Please complete quiz to review results!"
            cardBody.appendChild(emptyText);

        } else {
            for (var i = 0; i < quizContent.length; i++) {
                displayQuizQuestions(i, userAnswerList[i]);
                cardBody.appendChild(getBrElement());
            }
        }
    })
}

function displayQuizQuestions(questionIndex, userAnswer) {

    // Display quiz question 
    var questionPTag = document.createElement("h5");
    questionPTag.setAttribute("class", "questionPTag");
    questionPTag.textContent = quizObj[questionIndex].question;
    cardBody.appendChild(questionPTag);
    for (var i = 0; i < quizObj[questionIndex].options.length; i++) {

        var rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "row rowBody justify-content-center");

        var colDiv = document.createElement("div");
        colDiv.setAttribute("class", "colBody col-lg-6");

        var alertDiv = document.createElement("div");
        alertDiv.setAttribute("role", "alert");
        alertDiv.setAttribute("style", "word-wrap:break-word;");

        // If the option is the one user selected and it is the right answer
        if (quizObj[questionIndex].options[i] == userAnswer && quizObj[questionIndex].options[i] == quizObj[questionIndex].correctOption) {
            alertDiv.setAttribute("class", "alert alert-success border border-primary");
        }

        // If the option is the one user selected and it is not the right answer
        else if (quizObj[questionIndex].options[i] == userAnswer && quizObj[questionIndex].options[i] != quizObj[questionIndex].correctOption) {
            alertDiv.setAttribute("class", "alert alert-danger border border-primary");
        }

        // If the option is the one user didn't selected and it is the right answer
        else if (quizObj[questionIndex].options[i] != userAnswer && quizObj[questionIndex].options[i] == quizObj[questionIndex].correctOption) {
            alertDiv.setAttribute("class", "alert alert-success");
        }

        // If the option is the one user didn't selected and it is not the right answer
        else if (quizObj[questionIndex].options[i] != userAnswer && quizObj[questionIndex].options[i] != quizObj[questionIndex].correctOption) {
            alertDiv.setAttribute("class", "alert alert-danger");
        }


        // alertDiv.setAttribute("id", `alertDiv${divCount}`);
        // alertDiv.setAttribute("onclick", "clickFunction(this.id)");
        alertDiv.textContent = quizObj[questionIndex].options[i];
        colDiv.appendChild(alertDiv);
        console.log("In review result")
        // Append question p tag, row and column div tags to body 

        rowDiv.appendChild(colDiv);

        cardBody.appendChild(rowDiv)

    }
}

function getBrElement() {
    return brTag = document.createElement("br");
}

function getHrElement() {
    return hrTag = document.createElement("hr");
}