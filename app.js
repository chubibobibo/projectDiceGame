
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
let score = 0
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

    currentArr1.push(randomRoll())
    console.log(currentArr1)
    currentScore1.textContent = currentArr1.reduce((first, second) => {
        return first + second
    })
    if (randomRoll() === 1) {
        // randomRoll() = 0
        currentArr1 = []
        currentScore1.textContent = '0'
        isMyTurn = false



    }

}

function udpateScore2() {

    currentArr2.push(randomRoll())
    console.log(currentArr2)
    currentScore2.textContent = currentArr2.reduce((first, second) => {
        return first + second
    })
    if (randomRoll() === 1) {
        // randomRoll() = 0
        currentArr2 = []
        currentScore2.textContent = '0'
        isMyTurn = true
    }

}

function holdValue1() {
    currentScore1.textContent = 0
    totalScore1.textContent = currentArr1.reduce((first, second) => {
        return first + second
    })
    totalArr1.push(currentArr1.reduce((first, second) => {
        return first + second
    }))
    // prevent from continuing to play after hold is pressed
    isMyTurn = false
}
function holdValue2() {
    currentScore2.textContent = 0
    totalScore2.textContent = currentArr2.reduce((first, second) => {
        return first + second
    })
    totalArr2.push(currentArr2.reduce((first, second) => {
        return first + second
    }))
    // prevent from continuing to play after hold is pressed
    isMyTurn = false
}


rollDice.addEventListener('click', function () {
    if (isMyTurn && !isGameOver) {
        updateScore()
    }
    if (!isMyTurn && !isGameOver) {
        udpateScore2()
    }

})


holdValue.addEventListener('click', function () {
    if (isMyTurn && !isGameOver) {
        holdValue1()
    }
    if (!isMyTurn && !isGameOver) {
        holdValue2()
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
