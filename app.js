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

////////////////////////
// Main DOM Elements
////////////////////////
const $question = $('.question h2');
const $answers = $('.answer');
const $a = $('#a');
const $b = $('#b');
const $c = $('#c');
const $d = $('#d');
const $p1score = $('#player1 h4');
const $p2score = $('#player2 h4');

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

    // Update text on page with question
    $question.text(q.question);
    $a.text(q.a);
    $b.text(q.b);
    $c.text(q.c);
    $d.text(q.d);
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

// Add an event listener on the answers
$answers.on("click", (e) => {
    // if the answer clicked is the correct answer
    if ($(e.target).text() === state.currentQuestion.answer) {
        // update the player score and switch players
        updatePlayerScore();
        // update the game board with a new question
        setBoard();
        
    }
    // if the answer clicked is the incorrect answer 
    else {
        // just switch to the player 
        state.player1turn = !state.player1turn;
        // update the game board with a new question
        setBoard();

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
    // Set board with new question
    setBoard();
})



/* Ideas:
- Use setTimeout or another jquery method to delay resetting the board so that user can see answer highlighted with correct or incorrect color
- Toggle an active class on the player divs to show who's turn it is 
*/