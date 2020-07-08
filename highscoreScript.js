var scores = JSON.parse(localStorage.getItem('UserScore'));

console.log(scores);
var highScoreList = document.querySelector("ol");

var orderScores = Object.entries(scores).sort((a,b) => b[0]-a[0]);
console.log(orderScores);

orderScores.forEach(score => {
    var listItem = document.createElement("li");
    listItem.setAttribute("class", "white-bg");

    listItem.textContent = score[1];
    highScoreList.append(listItem);
    console.log(score[1]);
});