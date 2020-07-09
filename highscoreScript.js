// Get the Userscore object from the local storage and parse it
var scores = JSON.parse(localStorage.getItem('UserScore'));

// Create a ordered list to display all the scores 
var highScoreList = document.querySelector("ol");
highScoreList.setAttribute("text-align", "center");

// Before displaying the scores sort the scores with respect to the key/Score value 
var orderScores = scores.sort((a, b) => b.key - a.key);

// Go though the list to add the values to the list items 
orderScores.forEach(score => {
    var listItem = document.createElement("li");
    listItem.setAttribute("class", "white-bg");
    listItem.setAttribute("text-align", "center");

    listItem.textContent = score.value;
    highScoreList.append(listItem);
});

// Create a clear button to clear highscores
var clearButton = document.querySelector("#clear-score-button");
clearButton.addEventListener('click', function () {
    var listItem = highScoreList.lastElementChild;

    // Remove all the children/list items when the clear button is clicked 
    while (listItem) {
        highScoreList.removeChild(listItem);
        listItem = highScoreList.lastElementChild;
    }
})