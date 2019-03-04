$(document).ready(function() {

    var correctAnswer = 0;
    var wrongAnswer = 0;
    var unanswerCount = 0;
    var timer = 15;
    var intervalId;
    var userGuess ="";
    var running = false;
    var questionCount = 8;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    var options = [
        {
            question: "Which planet is the closest to Earth?", 
            choice: ["Mercury", "Venus", "Mars", "Jupiter"],
            answer: 1,
            photo: "https://media.giphy.com/media/3o7buctjKD8g5r4544/giphy.gif"
         },
         {
             question: "Traditionally, how many Wonders of the World are there?", 
            choice: ["7", "8", "4", "6"],
            answer: 0,
            photo: "https://media.giphy.com/media/RTu8N93RFxFC/giphy.gif"
         }, 
         {
             question: "According to the old proverb, to which European capital city do all roads lead?", 
            choice: ["Madrid", "Berlin", "Rome", "Paris" ],
            answer: 2,
            photo: "https://media.giphy.com/media/eBtpLQVJeFEBx92VCy/giphy.gif"
        }, 
        {
            question: "On which mountain did Moses receive the Ten Commandments?", 
            choice: ["Mount Kailash", "Mount Fuji", "Mount Sinai", "Mount Olympus" ],
            answer: 2,
            photo: "https://media.giphy.com/media/fXgKfzV4aaHQI/giphy.gif"
        }, 
        {
            question: "Which is the tallest mammal?", 
            choice: ["Elephant", "Sperm Whale", "Grizzly Bear", "Giraffe" ],
            answer: 3,
            photo: "https://media.giphy.com/media/znLTkIJ8r0dAA/giphy.gif"
        }, 
        {
            question: "Which sign of the zodiac is represented by the ram?", 
            choice: ["Leo", "Aires", "Virgo", "Libra" ],
            answer: 1,
            photo: "https://media.giphy.com/media/8IdVfinaYH1S0/giphy.gif"
        }, 
        {
            question: "Mount Everest is found in which mountain range?", 
            choice: ["Alps", "Himalayas", "Rockies", "Pyrenees" ],
            answer: 1,
            photo: "https://media.giphy.com/media/gLBSSqDTWLK9i/giphy.gif"
        }, 
        {
            question: "Who directed the movie Jaws?", 
            choice: ["Steven Spielberg", "Clint Eastwood", "James Cameron", "George Lucas" ],
            answer: 0,
            photo: "https://media.giphy.com/media/v5fnQmsXh95Hq/giphy.gif"
        }];


        $("#reset").hide();
        $("#start").on("click", function () {
                $("#start").hide();
                displayQuestion();
                runTimer();
        for(var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
            })
        //timer start
        function runTimer(){
            if (!running) {
            intervalId = setInterval(decrement, 1000); 
            running = true;
            }
        }
        //timer countdown
        function decrement() {
            $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
            timer --;
        
            //stop timer if reach 0
            if (timer === 0) {
                unanswerCount++;
                stop();
                $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }	
        }
        

        function stop() {
            running = false;
            clearInterval(intervalId);
        }

        function displayQuestion() {

            index = Math.floor(Math.random()*options.length);
            pick = options[index];
        

                $("#questionblock").html("<h2>" + pick.question + "</h2>");
                for(var i = 0; i < pick.choice.length; i++) {
                    var userChoice = $("<div>");
                    userChoice.addClass("answerchoice");
                    userChoice.html(pick.choice[i]);

                    //assign array position to it so can check answer
                    userChoice.attr("data-guessvalue", i);
                    $("#answerblock").append(userChoice);
                }
        
        
        
        //click function to select answer and outcomes
        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));
        
            //correct guess or wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                correctAnswer++;
                userGuess="";
                $("#answerblock").html("<p>Correct!</p>");
                hidepicture();
        
            } else {
                stop();
                wrongAnswer++;
                userGuess="";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
        }
        
        
        function hidepicture () {
            $("#answerblock").append("<img src=" + pick.photo + ">");
            newArray.push(pick);
            options.splice(index,1);
        
            var hidpic = setTimeout(function() {
                $("#answerblock").empty();
                timer= 20;
        
            //run the score screen if all questions answered
            if ((wrongAnswer + correctAnswer + unanswerCount) === questionCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctAnswer + "</h4>" );
                $("#answerblock").append("<h4> Incorrect: " + wrongAnswer + "</h4>" );
                $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;
        
            } else {
                runTimer();
                displayQuestion();
        
            }
            }, 3000);
        
        
        }
        
        $("#reset").on("click", function() {
            $("#reset").hide();
            $("#answerblock").empty();
            $("#questionblock").empty();
            for(var i = 0; i < holder.length; i++) {
                options.push(holder[i]);
            }
            runTimer();
            displayQuestion();
        
        })
        
});