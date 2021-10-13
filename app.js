////////////////////////
// Game State
////////////////////////
const state = {
    player1: 0,
    player2: 0,
    currentQuestion: {},
    // this value switches depending on who's turn it is:
    player1turn: true
}

let questions = [];
let usedQuestions = [];

////////////////////////
// Main DOM Elements
////////////////////////
const $overlay = $('.overlay');
const $question = $('.question h2');
const $answers = $('.answer');
const $a = $('#a');
const $b = $('#b');
const $c = $('#c');
const $d = $('#d');
const $p1score = $('#player1 h4');
const $p2score = $('#player2 h4');
const $questionsLeft = $('#questions-left');

////////////////////////
// Helper Functions
////////////////////////
const getRandomQuestion = (arr) => {
    let randomNumber = Math.floor(Math.random() * arr.length);
    return questions[randomNumber];
}

const setBoard = () => {
    // Get a random question from the questions array
    const q = getRandomQuestion(questions);
    // Update the current question in game state object
    state.currentQuestion = q;
    // Move question from questions array to usedQuestions array so it can't be asked again
    usedQuestions.push(q);
    const qIndex = questions.indexOf(q);
        // removes the question from the questions array
    questions.splice(qIndex, 1);


    // Update text on page with question
    $question.text(q.question);
    $a.text(q.a);
    $b.text(q.b);
    $c.text(q.c);
    $d.text(q.d);

    // Update the amount of questions left in game
    $questionsLeft.text(`Questions left: ${questions.length}`);
}

const updatePlayerScore = () => {
    // if it is player 1's turn add to their score and switch players
    if (state.player1turn) {
        state.player1 +=1;
        $p1score.text(state.player1);
        state.player1turn = false;
    } 
    // if it is player 2's turn add to their score and switch players
    else {
        state.player2 += 1;
        $p2score.text(state.player2);
        state.player1turn = true;
    }
}

const checkScores = () => {
    if (state.player1 > state.player2) {
        $("#results").text("Player 1 wins!");
    }
    else if (state.player1 < state.player2) {
        $("#results").text("Player 2 wins!");
    }
    else if (state.player1 === state.player2) {
        $("#results").text("It's a tie!");
    }
}

///////////////////////////////////////
// AJAX Call to Get Trivia Questions
///////////////////////////////////////

// AJAX call to trivia question API
const url = "https://cdn.contentful.com/spaces/unul3en2jtfl/environments/master/entries?access_token=YIweag8-CCwmyLDQiTXz5O1Zvf-LsVDbckGQC0y-J2A&content_type=triviaq";

$.ajax(url)
.then((data) => {
    // Loops over returned data array and creates new array of questions/answers
    questions = data.items.map(item => item.fields);

    // Add initial question and answers to the board
    setBoard();
})

///////////////////////////////
// Event Listeners/ Game Logic
///////////////////////////////

// Start game
$('.startBtn').on("click", () => {
    $overlay.css("display", "none");
})

// Add an event listener on the answers
$answers.on("click", (e) => {
    
    // Checks if there are still questions left
    if (questions.length === 0) {
        $(".end").css("display", "flex");
        checkScores();
    }
    else {
        // if the answer clicked is the correct answer
        if ($(e.target).text() === state.currentQuestion.answer) {

            // animate the correct answer choice
            $(e.target).addClass("correct");

            // Delay changing the board to give time for animation
            setTimeout(() => {
                // update the player score and switch players
                updatePlayerScore();
                // update the game board with a new question
                setBoard();
                // remove the animation class
                $(e.target).removeClass("correct");
            }, 2000)

        
        }
        // if the answer clicked is the incorrect answer 
        else {
            // animate the wrong answer choice
            $(e.target).addClass("incorrect");

            // highlight the correct answer 
            
            // Delay changing the board to give time for animation
            setTimeout(() => {
                // just switch to the player 
                state.player1turn = !state.player1turn;
                // update the game board with a new question
                setBoard();
                // remove the animation class
                $(e.target).removeClass("incorrect");
            }, 2000)
            

        }
    }

})

// Reset event listener
$('button').on("click", () => {
    // Reset player states and scores on board
    state.player1 = 0;
    $p1score.text(state.player1);
    state.player2 = 0;
    $p2score.text(state.player2);
    // Reset to player 1 being first
    state.player1turn = true;

    // Reset questions
    // Move questions from usedQuestions back to questions array 
    usedQuestions.forEach(question => {
        questions.push(question);
    })
    // Empty the usedQuestions array
    usedQuestions = [];

    // Reset board
    setBoard();
})

