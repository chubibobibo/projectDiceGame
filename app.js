
const totalScore1 = document.querySelector('#totalScore1')
const currentScore1 = document.querySelector('#scoreBox1')

const totalScore2 = document.querySelector('#totalScore2')
const currentScore2 = document.querySelector('#scoreBox2')

const rollDice = document.querySelector('#rollDice');
const holdValue = document.querySelector('#holdValue');
const newGame = document.querySelector('#newGame')
let dice = document.querySelector('#dice')
let message = document.querySelector('#message')

// save random in a function to have it execute random nums
randomRoll = function () {
    return Math.floor(Math.random() * 6) + 1
}
// let randomRoll = Math.floor(Math.random() * 6) + 1
let isMyTurn = true;
let isGameOver = false;
let currentArr1 = []
let totalArr1 = []
let currentArr2 = []
let totalArr2 = []


newGame.addEventListener('click', function () {
    console.log('clicked')
    currentScore1.textContent = 0
    totalScore1.textContent = 0
    currentArr1 = []
    totalArr1 = []
    currentScore2.textContent = 0
    totalScore2.textContent = 0
    currentArr2 = []
    totalArr2 = []
    isMyTurn = true
    isGameOver = false
    totalScore1.classList.remove('winner')
    totalScore1.classList.remove('loser')
    totalScore2.classList.remove('winner')
    totalScore2.classList.remove('loser')
    message.textContent = ''

})

//  refactored to a function for reusability
//need to fix the gameover logic
function updateScore() {
    if (randomRoll() === 1 && isMyTurn) {
        // rolling a 1 will result in an empty array and a 0 currentScore text
        //should execute player 2 after
        currentArr1 = []
        currentScore1.textContent = '0'
        console.log(currentArr1)
        isMyTurn = false
        alert('player1 rolls 1')
        // to keep track of array
        // console.log('player rolls 1')
    }
    //update the currentArr1 and the currentScore1
    //currentScore1 needs to be totaled to use as the currentScore text
    else if (isMyTurn === true) {
        currentArr1.push(randomRoll())
        // reduce currentArr1 to display total to curentScore1
        currentScore1.textContent = currentArr1.reduce((first, second) => {
            return first + second
        })
        console.log(currentArr1)
    }
}

function udpateScore2() {

    if (randomRoll() === 1 && !isMyTurn) {
        // rolling a 1 will result in an empty array and a 0 currentScore text
        //should execute player 1 after
        currentArr2 = []
        currentScore2.textContent = '0'
        isMyTurn = true
        alert('player 2 rolls 1')
        console.log('player 2 rolls 1')
    }
    //update the currentArr2 and the currentScore2
    //currentScore2 needs to be totaled to use as the currentScore text
    else if (isMyTurn === false) {
        currentArr2.push(randomRoll())
        // reduced currentArr2 to display total to curentScore1
        currentScore2.textContent = currentArr2.reduce((first, second) => {
            return first + second
        })
        console.log(currentArr2)
    }

}

function holdValue1() {
    currentScore1.textContent = '0'
    // save the value of the reduced currentArr1 to totalArr1
    totalArr1.push(currentArr1.reduce((first, second) => {
        return first + second
    }))
    // then use the reduced totalArr1 as the totalScore1
    totalScore1.textContent = totalArr1.reduce((first, second) => {
        return first + second
    })
    currentArr1 = []
    // prevent from continuing to play after holdValue is pressed
    isMyTurn = false
    console.log('player1 holds the  value')

}
function holdValue2() {
    currentScore2.textContent = '0'
    // save the value of the reduced currentArr2 to totalArr2
    totalArr2.push(currentArr2.reduce((first, second) => {
        return first + second
    }))
    totalScore2.textContent = totalArr2.reduce((first, second) => {
        return first + second
    })
    currentArr2 = []
    // prevent from continuing to play after hold value is pressed
    isMyTurn = true
    console.log('player2 holds the value')

}

// dice image

// function diceImg() {
//     let input = randomRoll()
//     switch (input) {
//         case 1:
//             dice.src = "C:/Downloads/dice/dice1.png"
//             break;
//         case 2:
//             dice.src = 'C:/Downloads/dice/dice2.png'
//             break;
//         case 3:
//             dice.src = 'C:/Downloads/dice/dice3.png'
//         case 4:
//             dice.src = 'C:/Downloads/dice/dice4.png'
//         case 5:
//             dice.src = 'C:/Downloads/dice/dice5.png'
//         case 6:
//             dice.src = 'C:/Downloads/dice/dice6.png'
//     }
// }

// define the dice image path and use it to update diceImg source

let diceInput = 'C:/Downloads/dice/dice' + randomRoll() + '.png'



// button event listeners

rollDice.addEventListener('click', function () {
    if (totalArr1 >= 10 || totalArr2 >= 10) {
        if (totalArr1 >= 10) {
            totalScore1.classList.add('winner')
            totalScore2.classList.add('loser')
            message.textContent = 'player 1 wins'

        } else {
            totalScore2.classList.add('winner')
            totalScore1.classList.add('loser')
            message.textContent = 'player 2 wins'
        }
        isGameOver = true;
    }
    else if (isMyTurn === true && !isGameOver) {
        dice.setAttribute('src', diceInput)
        updateScore()
        console.log(randomRoll())
    }
    // problem with currentScore2 updating right after player1 rolls a 1
    // changed to else if insted of nested if
    else if (isMyTurn === false && !isGameOver) {
        dice.setAttribute('src', diceInput)
        udpateScore2()
        console.log(randomRoll())
    }

})

holdValue.addEventListener('click', function () {
    if (isMyTurn && !isGameOver) {
        holdValue1()
    }
    else if (!isMyTurn && !isGameOver) {
        dice.setAttribute('src', diceInput)
        holdValue2()
        isMyTurn = true
    }
})








