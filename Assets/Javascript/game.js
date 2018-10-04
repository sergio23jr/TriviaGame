var questions = [
    {
        question: "Which is true?",
        options: ["true", "false"],
        answer: 0
    },
    {
        question: "Which is false",
        options: ["Yes", "No", "False"],
        answer: 2
    }
]
var numRight = 0;
var numWrong = 0;
var questionIndex = 0;
var gameTimer = 90;
var parentDiv;
var siblingDiv;
$(".question").hide();
$(".bottom").hide();
$(".last").hide();


$(".startButton").on("click", function () {
    // when button is clicked hide the start menu 

    $("#startgame").hide();
    // start the game
    startGame();
    //compare is correct or wrong
})
function startGame() {
    var questionsLeft = questions.length;
    $(".bottom").show();
    $(".last").show();
    //start timer
    $("#gameTime").text(gameTimer);
    $('#questionsLeft').text(questionsLeft);

    timerFunction();

    //display my questions
    displayQuestions();
    //setscore
}
function timerFunction() {
    var gameTime = setInterval(function () {
        gameTimer--;
        $("#gameTime").text(gameTimer);
        if (gameTimer === 0) {
            clearInterval(gameTime)
            endOfGame();
        }
    }, 1000)


}
function endOfGame() {
    $(".question").hide();
    $("#startGame").hide();
    $(".results").append("<h1> Game Over</h1>");
    $(".right").append(`<div> You got ${numRight} right <div>`)
    $(".wrong").append(`<div> You got ${numWrong} wrong <div>`)


}
function displayQuestions() {
    $(".question").show()


    var parentDiv = $("<div>");
    var questionDiv = $("<h1>");
    questionDiv.text(questions[questionIndex].question)
    parentDiv.append(questionDiv)
    $(".question").append(parentDiv);

    for (var j = 0; j < questions[questionIndex].options.length; j++) {
        var bigDiv = $("<div>");
        var buttonDiv = $("<button>");
        buttonDiv.addClass("option-btn")
        buttonDiv.text(questions[questionIndex].options[j])
        buttonDiv.val(j)
        bigDiv.append(buttonDiv);
        $(".question").append(bigDiv);
    }


}
$(document).on("click", ".option-btn", function () {
    console.log(this)
    var clickedButton = $(this);
    if (+clickedButton.val() === questions[questionIndex].answer) {

        numRight++
    } else {

        numWrong++
    }
    questionIndex++
    if (questionIndex === questions.length) {
        clearInterval(gameTime)
        endOfGame();
    } else {

        $(".question").empty()
        displayQuestions();
    }

})
