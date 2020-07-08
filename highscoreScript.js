var scores = JSON.parse(localStorage.getItem('UserScore'));
var sortedScores = sortArray(scores);
console.log(scores);
console.log(sortedScores);

var highScoreList = document.querySelector("ol");

console.log(scores);

scores.forEach(score => {
    var listItem = document.createElement("li");
    listItem.setAttribute("class", "white-bg");

   

    listItem.textContent = score;
    highScoreList.append(listItem);
    console.log(score);
});

function sortArray(scores){
return scores.split("-");
}