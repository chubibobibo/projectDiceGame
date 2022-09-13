const randomRoll = () =>
    Math.floor(Math.random() * 6) + 1
const roll = randomRoll()

const player1 = {
    totalScore: document.querySelector('#totalScore1'),
    currentScore: document.querySelector('#scoreBox1'),
    currentArr: [],
    totalArr: []
}

const player2 = {
    totalScore: document.querySelector('#totalScore2'),
    currentScore: document.querySelector('#scoreBox2'),
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

function reset(player, opponent) {
    if (player.currentArr.includes(1) === true && isMyTurn === true) {
        // rolling a 1 will result in an empty array and a 0 currentScore text
        //should execute player 2 after
        player.currentArr = []
        player.currentScore.textContent = '0'
        console.log(player.currentArr)
        isMyTurn = false
        alert(`player 1 rolled 1`)
        console.log(randomRoll())
        console.log(roll)
        // to keep track of array
        // console.log('player rolls 1')
    } else if (player.currentArr.includes(1) === true && isMyTurn === false) {
        // rolling a 1 will result in an empty array and a 0 currentScore text
        //should execute player 2 after
        player.currentArr = []
        player.currentScore.textContent = '0'
        console.log(player.currentArr)
        isMyTurn = true
        alert(`player 1 rolled 1`)
        // to keep track of array
        // console.log('player rolls 1')
    }
}

function updateScore(player, opponent) {
    //update the currentArr1 and the currentScore1
    //currentScore1 needs to be totaled to use as the currentScore text
    player.currentArr.push(randomRoll())
    // reduce currentArr1 to display total to curentScore1
    player.currentScore.textContent = player.currentArr.reduce((first, second) => {
        return first + second
    })
    console.log(player.currentArr)


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
    console.log(`${player}holds the  value`)

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

//  dice image randomizer



// button event listener
//function reset to reset currentScore when rolling a 1

rollDice.addEventListener('click', function () {
    if (isMyTurn === true && !isGameOver) {
        updateScore(player1, player2)
        reset(player1, player2)
        dice.setAttribute('src', 'assets/dice' + randomRoll() + '.png')


    }
    else if (isMyTurn === false && !isGameOver) {
        updateScore(player2, player1)
        reset(player2, player1)
        dice.setAttribute('src', 'assets/dice' + randomRoll() + '.png')


    }
    winCondition(player1, player2)
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

newGameBtn.addEventListener('click', function () {
    return newGame(player1, player2)
})
