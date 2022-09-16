
// can't use randomRoll separately to provide value for dice image because it gives random num each time it is called
// instead set the attribute of dice src directly inside the function randomRoll
function randomRoll() {
    const diceValue = Math.floor(Math.random() * 6) + 1
    dice.setAttribute('src', 'assets/dice' + diceValue + '.png')
    return diceValue
}

const player1 = {
    totalScore: document.querySelector('#totalScore1'),
    currentScore: document.querySelector('#scoreBox1'),
    playerName: document.querySelector('#playerOne'),
    currentArr: [],
    totalArr: []
}

const player2 = {
    totalScore: document.querySelector('#totalScore2'),
    currentScore: document.querySelector('#scoreBox2'),
    playerName: document.querySelector('#playerTwo'),
    currentArr: [],
    totalArr: []

}

const rollDice = document.querySelector('#rollDice');
const holdValueBtn = document.querySelector('#holdValue');
const newGameBtn = document.querySelector('#newGame')
let dice = document.querySelector('#dice')
let message = document.querySelector('#message')
let isMyTurn = true;
let isGameOver = false;




// randomRoll() won't work for reset and dice image because it gives a random number everytime it is called out
//function reset to reset currentScore when rolling a 1
// .includes() will check the array if it contains a value passed as argument. then will return a boollean
function reset(player, opponent) {
    if (player.currentArr.includes(1) === true && isMyTurn === true) {
        // rolling a 1 will result in an empty array and a 0 currentScore text
        //should execute player 2 after
        player.currentArr = []
        player.currentScore.textContent = '0'
        isMyTurn = false
        message.textContent = 'Player 1 rolled 1'
        // alert(`player 1 rolled 1`)
    }
    if (player.currentArr.includes(1) === true && isMyTurn === false) {
        // rolling a 1 will result in an empty array and a 0 currentScore text
        //should execute player 1 after
        player.currentArr = []
        player.currentScore.textContent = '0'
        isMyTurn = true
        message.textContent = 'Player 2 rolled 1'
        // alert(`player 2 rolled 1`)
    }
}

// use randomRoll only for updating scores
//update the currentArr1 and the currentScore1
//currentScore1 needs to be totaled to use as the currentScore text
// reduce currentArr1 to display total to curentScore1
function updateScore(player, opponent) {
    player.currentArr.push(randomRoll())
    player.currentScore.textContent = player.currentArr.reduce((first, second) => {
        return first + second
    })
}

function holdValue(player, opponent) {
    player.currentScore.textContent = '0'
    // save the value of the reduced currentArr1 to totalArr1
    player.totalArr.push(player.currentArr.reduce((first, second) => {
        return first + second
    }))
    // then use the reduced totalArr1 as the totalScore1
    player.totalScore.textContent = player.totalArr.reduce((first, second) => {
        return first + second
    })
    player.currentArr = []
    // prevent from continuing to play after holdValue is pressed
    isMyTurn = false
    winCondition(player1, player2)
    // console.log(`${player}holds the  value`)
}

function winCondition(player, opponent) {
    if (player.totalArr.reduce((first, second) => { return first + second }) >= 100) {
        isGameOver = true;
        player.totalScore.classList.add('winner')
        opponent.totalScore.classList.add('loser')
        message.textContent = 'Player 1 wins'
    }
    else if (opponent.totalArr.reduce((first, second) => { return first + second }) >= 100) {
        isGameOver = true;
        opponent.totalScore.classList.add('winner')
        player.totalScore.classList.add('loser')
        message.textContent = 'Player 2 Wins'
    }
}

// button event listeners
//check whose turn is it and if the game is still going
//should update the currentArr
rollDice.addEventListener('click', function () {
    message.textContent = ''
    if (isMyTurn === true && !isGameOver) {
        updateScore(player1, player2)
        reset(player1, player2)
    }
    else if (isMyTurn === false && !isGameOver) {
        updateScore(player2, player1)
        reset(player2, player1)
    }
})

// holdValue event listener

holdValueBtn.addEventListener('click', function () {
    if (isMyTurn && !isGameOver) {
        holdValue(player1, player2)
        isMyTurn = false
    } else if (!isMyTurn && !isGameOver) {
        holdValue(player2, player1)
        isMyTurn = true
    }
})

newGameBtn.addEventListener('click', function () {
    return newGame(player1, player2)
})

function newGame(player, opponent) {
    console.log('clicked')
    player.currentScore.textContent = 0
    player.totalScore.textContent = 0
    player.currentArr = []
    player.totalArr = []
    opponent.currentScore.textContent = 0
    opponent.totalScore.textContent = 0
    opponent.currentArr = []
    opponent.totalArr = []
    isMyTurn = true
    isGameOver = false
    player.totalScore.classList.remove('winner')
    player.totalScore.classList.remove('loser')
    opponent.totalScore.classList.remove('winner')
    opponent.totalScore.classList.remove('loser')
    message.textContent = ''
}

