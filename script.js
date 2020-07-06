
//Region HTML element creation
var cardBody = document.querySelector(".card-body");
var cardTitle = document.querySelector("h4");
var cardBodyText = document.querySelector("p");
var startQuizButton = document.querySelector("#start-quiz-button");
// End region 

// Region event listener
startQuizButton.addEventListener('click', function(){
    cardTitle.textContent = " ";
    cardBodyText.textContent = " ";
    cardBody.appendChild(timerLabel);
    timerLabel.appendChild(timeCountdownValue);
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

