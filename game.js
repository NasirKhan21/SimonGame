var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level  " + level);
        nextSequence();
        started =true;
    }    
    
});
// jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function(){
    //Inside the handler, create a new variable called userChosenColour to store the id of the 
    // button that got clicked.
       var userChosenColour = $(this).attr("id");

    //Add the contents of the variable userChosenColour created in step 2 to the end of this
    //new userClickedPattern
       userClickedPattern.push(userChosenColour);

       
       playSound(userChosenColour);
       animatePress(userChosenColour);
       
       checkAnswer(userClickedPattern.length-1);


});

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] ===  userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");


        $("body").addClass("game-over");

        $("#level-title").text("Game Over! Press any Key to restart the game");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
       
      

        startOver();

    }
}

function nextSequence(){
    
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level  " + level);

    var randomNumber = Math.floor(Math.random()*4);;

    var randomChosenColor = buttonColors[randomNumber];
   
    gamePattern.push(randomChosenColor);

   

   //Using jQuery to select the button with the same id as the randomChosenColour
   
       
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    
    

    
}

function animatePress(currentColor){
 
        $("#"+currentColor).addClass("pressed");

        setTimeout(function(){
            $("#"+currentColor).removeClass('pressed');
        },100);

   
}

function playSound(name){
     var audio = new Audio("sounds/" + name+ ".mp3");
        audio.play();
        
}

function startOver(){
   level = 0;
   gamePattern = [];
   started = false;
}


