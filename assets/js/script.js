// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button"); // get all the buttons in the HTML
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }
    document.getElementById('answer-box').addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    runGame("addition");
});

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */

function runGame(gameType) {
    document.getElementById('answer-box').value = ""; // clear the value of the answer box
    document.getElementById('answer-box').focus(); // focus the cursor on the answer box

    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 *  */

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer-box').value); // get the value of the element with the ID of answer-box as an integer
    let calculatedAnswer = calculateCorrectAnswer(); // call the calculateCorrectAnswer function and store the result in a variable

    let isCorrect = userAnswer === calculatedAnswer[0]; // check if the user's answer is the same as the correct answer

    if (isCorrect) {
        incrementScore(); // call the incrementScore function
    } else {
        alert(`Awwww...you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer(); // call the incrementWrongAnswer function
    }

    runGame(calculatedAnswer[1]); // call the runGame function and pass the game type as an argument
}

/**
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the dom, and returns the correct answer. 
*/

function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText); // get the value of the element with the ID of operand1 as an integer
    let operand2 = parseInt(document.getElementById('operand2').innerText); // get the value of the element with the ID of operand2 as an integer
    let operator = document.getElementById('operator').innerText; // get the value of the element with the ID of operator   

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];    
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}
/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById('score').innerText); // get the value of the element with the ID of score as an integer
    document.getElementById('score').innerText = ++oldScore; // increment the value of the element with the ID of score by 1

}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */

function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('incorrect').innerText); // get the value of the element with the ID of incorrect as an integer
    document.getElementById('incorrect').innerText = ++oldScore; // increment the value of the element with the ID of incorrect by 1

}

function displayAdditionQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2; 
    document.getElementById('operator').textContent = "+"; // set the text content of the element to the value of "+"
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2; 
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1; 
    document.getElementById('operator').textContent = "-"; // set the text content of the element to the value of "-"

}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x"; // set the text content of the element to the value of "x"

}