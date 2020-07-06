
//Region HTML element creation
var cardBody = document.querySelector("card-body");
var cardTitle = document.querySelector("h4");
var cardBodyText = document.querySelector("p");
var startQuizButton = document.querySelector("#start-quiz-button");
// End region 

// Region event listener
startQuizButton.addEventListener('click', function(){
    console.log(cardTitle.innerHTML);
    cardBodyText.textContent = " ";
})
// End region 
