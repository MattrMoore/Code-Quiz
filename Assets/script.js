//containers 
var containerStartEl = document.getElementById("start-container");
var containerQuestionEl = document.getElementById("questions-container");  
var containerEndEl = document.getElementById("end-container")
var containerScoreEl = document.getElementById("score-banner")
var formInitials = document.getElementById("initials-form")
var containerHighScoresEl = document.getElementById("high-score-container")
var seeHighScoreEl = document.getElementById("see-highscores")
var listHighScoreEl = document.getElementById("high-scores-list")
var correctEl = document.getElementById("correct")
var incorrectEl = document.getElementById("incorrect")
//buttons
var btnStartEl = document.querySelector("#start-quiz");
var btnGoBackEl = document.querySelector("#go-back")
var btnClearScoresEl = document.querySelector("#clear-high-scores")
//questions and answers 
var questionEl = document.getElementById("question")
var answerbuttonsEl = document.getElementById("answer-buttons")
//timers
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;

//High Score Array
var HighScores = [];

//assign array details for questions 
var arrayShuffleQuestions
 var QuestionIndex = 0

 // The array of questions for our quiz game.
var questions = [
    { q: 'Javascript is an _____ language?', 
          a: '2. Object-Oriented', 
          choices: [{choice: '1. Object-based'}, {choice: '2. Object-Oriented'}, {choice: '3. Procedural'}, {choice: '4. None of the Above'}]
        },
    
    { q: 'Which of the following keywords is used to define a variable in Javascript?', 
          a: '3. Both 1 and 2', 
          choices: [{choice: '1. var'}, {choice: '2. let'}, {choice: '3. Both 1 and 2'}, {choice: '4. Function'}]
        },
    
    { q: 'Upon encountering empty statements, what does the Javascript Interpreter do?', 
          a: '4 Ignores the Statements', 
          choices: [{choice: '1. Throws and error'}, {choice: '2. Crashes and Resets the Program'}, {choice: '3. Gives a Warning'}, {choice: '4. Ignores the Statements'}]
        },
        
    { q: 'How can a datatype be declared to be a constant type?', 
          a: '3. const', 
          choices: [{choice: '1. constant'}, {choice: '2. var'}, {choice: '3. const'}, {choice: '4. let'}]
        },
        
    { q: 'What keyword is used to check whether a given property is valid or not?', 
          a: '1. in', 
          choices: [{choice: '1. in'}, {choice: '2. is in'}, {choice: '3. exists'}, {choice: '4. lies'}]
        },
    
        { q: 'What does the Javascript “debugger” statement do?', 
          a: '2. It acts as a breakpoint in a program', 
          choices: [{choice: '1. It will debug the erros in a program at runtime'}, {choice: '2. It acts as a breakpoint in a program'}, {choice: '3. It will debug the error in the current statement if any'}, {choice: '4. All of the Above'}]
        },
    
        { q:'Which of the following are closures in Javascript?',
          a: '4. All of the Above', 
          choices: [{choice: '1. Variables'}, {choice: '2. Functions'}, {choice: '3. Objects'}, {choice: '4. All of the Above'}]
 },
];
      
 //if go back button is hit on high score page
var renderStartPage = function () {
     containerHighScoresEl.classList.add("hide")
     containerHighScoresEl.classList.remove("show")
     containerStartEl.classList.remove("hide")
     containerStartEl.classList.add("show")
     containerScoreEl.removeChild(containerScoreEl.lastChild)
     QuestionIndex = 0
     gameover = ""
     timerEl.textContent = 0 
     score = 0

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide")
        }
        if (incorrectEl.className = "show") {
           incorrectEl.classList.remove("show");
           incorrectEl.classList.add("hide");
        }
    }

    //every second, check if game-over is true, or if there is time left. Start time at 30. 
    var setTime = function () {
        timeleft = 45;

    var timercheck = setInterval(function() {
        timerEl.innerText = timeleft;
        timeleft--

        if (gameover) {
            clearInterval(timercheck)
        }
       
        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }

        }, 1000)
    }

    var startGame = function() {
        //add classes to show/hide start and quiz screen
        containerStartEl.classList.add('hide');
        containerStartEl.classList.remove('show');
        containerQuestionEl.classList.remove('hide');
        containerQuestionEl.classList.add('show');
        //Shuffle the questions so they show in random order
        arrayShuffleQuestions = questions.sort(() => Math.random() - 0.5)
        setTime()
        setQuestion()
      }
    
    //set next question for quiz
    var setQuestion = function() {
        resetAnswers()
        displayQuestion(arrayShuffleQuestions[QuestionIndex])
    }

    //remove answer buttons
    var resetAnswers = function() {
        while (answerbuttonsEl.firstChild) {
            answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
        };
    };

    //display question information (including answer buttons)
    var displayQuestion = function(index) {
        questionEl.innerText = index.q
        for (var i = 0; i < index.choices.length; i++) {
            var answerbutton = document.createElement('button')
            answerbutton.innerText = index.choices[i].choice
            answerbutton.classList.add('btn')
            answerbutton.classList.add('answerbtn')
            answerbutton.addEventListener("click", answerCheck)
            answerbuttonsEl.appendChild(answerbutton)
            }
        };
    //display correct! on screen
    var answerCorrect = function() {
        if (correctEl.className = "hide") {
            correctEl.classList.remove("hide")
            correctEl.classList.add("banner")
           incorrectEl.classList.remove("banner")
           incorrectEl.classList.add("hide")
            }
        }  
    //display Incorrect! on screen
    var answerIncorrect = function() {
        if (incorrectEl.className = "hide") {
           incorrectEl.classList.remove("hide")
           incorrectEl.classList.add("banner")
            correctEl.classList.remove("banner")
            correctEl.classList.add("hide")
        }
    }

    //check if answer is correct    
    var answerCheck = function(event) {
        var selectedanswer = event.target
            if (arrayShuffleQuestions[QuestionIndex].a === selectedanswer.innerText){
                answerCorrect()
                score = score + 5
            }

            else {
              answerIncorrect()
              score = score - 3;
              timeleft = timeleft - 2;
          };

        //go to next question, check if there is more questions
          QuestionIndex++
            if  (arrayShuffleQuestions.length > QuestionIndex + 1) {
                setQuestion()
            }   
            else {
               gameover = "true";
               showScore();
                }
    }

        //Display total score screen at end of game
    var showScore = function () {
        containerQuestionEl.classList.add("hide");
        containerEndEl.classList.remove("hide");
        containerEndEl.classList.add("show");

        var scoreDisplay = document.createElement("p");
        scoreDisplay.innerText = ("Your final score is " + score + "!");
        containerScoreEl.appendChild(scoreDisplay);
    }       
    
    //create high score values
    var createHighScore = function(event) { 
        event.preventDefault() 
        var initials = document.querySelector("#initials").value;
        if (!initials) {
          alert("Enter your intials!");
          return;
        }

      formInitials.reset();

      var HighScore = {
      initials: initials,
      score: score
      } 

      //push and sort scores
      HighScores.push(HighScore);
      HighScores.sort((a, b) => {return b.score-a.score});

    //clear visibile list to resort
    while (listHighScoreEl.firstChild) {
       listHighScoreEl.removeChild(listHighScoreEl.firstChild)
    }
    //create elements in order of high scores
    for (var i = 0; i < HighScores.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.ClassName = "high-score";
      highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
      listHighScoreEl.appendChild(highscoreEl);
    }

      saveHighScore();
      displayHighScores();

    }
    //save high score
    var saveHighScore = function () {
        localStorage.setItem("HighScores", JSON.stringify(HighScores))
            
    }

    //load values 
    var loadHighScore = function () {
        var LoadedHighScores = localStorage.getItem("HighScores")
            if (!LoadedHighScores) {
            return false;
        }

        LoadedHighScores = JSON.parse(LoadedHighScores);
        LoadedHighScores.sort((a, b) => {return b.score-a.score})
 

        for (var i = 0; i < LoadedHighScores.length; i++) {
            var highscoreEl = document.createElement("li");
            highscoreEl.ClassName = "high-score";
            highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
            listHighScoreEl.appendChild(highscoreEl);

            HighScores.push(LoadedHighScores[i]);
            
        }
    }  

    //displays high score screen from link or when intials entered
    var displayHighScores = function() {

        containerHighScoresEl.classList.remove("hide");
        containerHighScoresEl.classList.add("show");
        gameover = "true"

        if (containerEndEl.className = "show") {
            containerEndEl.classList.remove("show");
            containerEndEl.classList.add("hide");
            }
        if (containerStartEl.className = "show") {
            containerStartEl.classList.remove("show");
            containerStartEl.classList.wadd("hide");
            }
            
        if (containerQuestionEl.className = "show") {
            containerQuestionEl.classList.remove("show");
            containerQuestionEl.classList.add("hide");
            }

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide");
        }

        if (incorrectEl.className = "show") {
           incorrectEl.classList.remove("show");
           incorrectEl.classList.add("hide");
            }
        
    }
    //clears high scores
    var clearScores = function () {
        HighScores = [];

        while (listHighScoreEl.firstChild) {
            listHighScoreEl.removeChild(listHighScoreEl.firstChild);
        }

        localStorage.clear(HighScores);

    } 

    loadHighScore()
        
      //on start click, start game
      btnStartEl.addEventListener("click", startGame)
      //on submit button -- enter or click
      formInitials.addEventListener("submit", createHighScore)
      //when view high-scores is clicked
      seeHighScoreEl.addEventListener("click", displayHighScores)
      //Go back button
      btnGoBackEl.addEventListener("click", renderStartPage)
      //clear scores button
      btnClearScoresEl.addEventListener("click", clearScores)