var array = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenPattern = [];
var level = 0;
var started = false;


function nextSequence() {
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = array[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);
    
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userChosenPattern.push(userChosenColor);
    console.log(userChosenPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer();

})

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

$(document).keydown(function(event){
    if(!started){
        $("#level-title").text("Level "+ level);
        started = true;
        nextSequence();
    }
})

function checkAnswer(){
    if(userChosenPattern[userChosenPattern.length-1] === gamePattern[userChosenPattern.length-1]){
        if (userChosenPattern.length === gamePattern.length) {
            userChosenPattern = [];
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        gamePattern = [];
        userChosenPattern = [];

        $("body").addClass("game-over");
        playSound("wrong")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        started = false;
        level = 0;
        $("#level-title").text("Game over,Press any key to restart game");
    }
}

