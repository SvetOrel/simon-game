
const buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence(); 
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log('## userClickedPattern: ',JSON.stringify(userClickedPattern));
    playColorSound(userChosenColor);
    animatedPress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playColorSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function playColorSound(color){
    var colorSound = new Audio("sounds/" + color + ".mp3");
    colorSound.play();
}

function animatedPress(currentColor){
    var selectedBtn = $("#" + currentColor);
    selectedBtn.addClass("pressed");
    setTimeout(function(){
        selectedBtn.removeClass("pressed");
    },100);
}

function nextSequence(){
    userClickedPattern = [];
    level ++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playColorSound(randomChosenColor);
}





