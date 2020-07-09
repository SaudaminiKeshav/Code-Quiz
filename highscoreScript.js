var scores = JSON.parse(localStorage.getItem('UserScore'));

var highScoreList = document.querySelector("ol");
highScoreList.setAttribute("text-align", "center");

console.log(scores);
var orderScores = scores.sort((a,b) => b.key-a.key);

orderScores.forEach(score => {
    var listItem = document.createElement("li");
    listItem.setAttribute("class", "white-bg");
    listItem.setAttribute("text-align", "center");

    listItem.textContent = score.value;
    highScoreList.append(listItem);
});

var clearButton = document.querySelector("#clear-score-button");
clearButton.addEventListener('click', function(){
    var listItem = highScoreList.lastElementChild;

    while(listItem){
        highScoreList.removeChild(listItem);
        listItem = highScoreList.lastElementChild;
    }
})