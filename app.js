
const totalScore1 = document.querySelector('#totalScore1')
const currentScore1 = document.querySelector('#scoreBox1')

const totalScore2 = document.querySelector('#totalScore2')
const currentScore2 = document.querySelector('#scoreBox2')

const rollDice = document.querySelector('#rollDice');
const holdValue = document.querySelector('#holdValue');
const newGame = document.querySelector('#newGame')

// save random in a function to have it execute random nums
let randomRoll = function () {
    return Math.floor(Math.random() * 6) + 1
}

let isMyTurn = true;
let isGameOver = false;
let currentArr1 = []
let totalArr1 = []
let currentArr2 = []
let totalArr2 = []

// if (isMyTurn && !isGameOver) {
//     rollDice.addEventListener('click', function () {
//         if (randomRoll() === 1) {
//             currentScore1.textContent = '0'
//             currentArr.push(0)
//         }
//         currentArr.push(randomRoll())
//         console.log(currentArr)
//         currentScore1.textContent = currentArr.reduce((first, second) => {
//             return first + second
//         })
//     })

//  refactored to a function

function updateScore() {

    if (randomRoll() === 1 && isMyTurn) {
        // randomRoll() = 0
        currentArr1 = []
        currentScore1.textContent = '0'
        console.log(currentArr1)
        isMyTurn = false
        alert('player1 rolls 1')
        console.log('player rolls 1')

    }
    else if (isMyTurn === true) {
        currentScore1.textContent = randomRoll()
        currentArr1.push(parseInt(currentScore1.textContent))
        console.log(currentArr1)
    }

}

function udpateScore2() {

    if (randomRoll() === 1 && !isMyTurn) {
        // randomRoll() = 0
        currentArr2 = []
        currentScore2.textContent = '0'
        isMyTurn = true
        alert('player 2 rolls 1')
        console.log('player 2 rolls 1')
    }
    else if (isMyTurn === false) {
        currentScore2.textContent = randomRoll()
        currentArr2.push(parseInt(currentScore2.textContent))
        console.log(currentArr2)
    }

}

function holdValue1() {
    currentScore1.textContent = '0'
    totalScore1.textContent = currentArr1.reduce((first, second) => {
        return first + second
    })
    // totalArr1.push(currentArr1.reduce((first, second) => {
    //     return first + second
    // }))
    // prevent from continuing to play after hold is pressed
    isMyTurn = false
    console.log('player1 holds the  value')

}
function holdValue2() {
    currentScore2.textContent = '0'
    totalScore2.textContent = currentArr2.reduce((first, second) => {
        return first + second
    })
    // totalArr2.push(currentArr2.reduce((first, second) => {
    //     return first + second
    // }))
    // prevent from continuing to play after hold value is pressed
    isMyTurn = true
    console.log('player2 holds the value')

}

if (totalScore1 > 20 || totalScore2 > 20) {
    isGameOver = true

}


rollDice.addEventListener('click', function () {
    if (isMyTurn === true && !isGameOver) {
        updateScore()
    }
    // problem with currentScore2 updating right after player1 rolls a 1
    // changed to else if insted of nested if
    else if (isMyTurn === false && !isGameOver) {
        udpateScore2()
    }

})
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
})


holdValue.addEventListener('click', function () {
    if (isMyTurn && !isGameOver) {
        holdValue1()
    }
    if (!isMyTurn && !isGameOver) {
        holdValue2()
        isMyTurn = true
    }
})









// save this code
// rollDice.addEventListener('click', function () {
//     if (randomRoll() === 1) {
//         currentScore1.textContent = '0'
//         currentArr.push(0)
//     }
//     currentArr.push(randomRoll())
//     console.log(currentArr)
//     currentScore1.textContent = currentArr.reduce((first, second) => {
//         return first + second
//     })
// })
