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
    runGame("addition");
});

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */

function runGame(gameType) {

    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
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
        alert("Hey! You got it right! :D");
    } else {
        alert(`Awwww...you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
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
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2; 
    document.getElementById('operator').textContent = "+"; // set the text content of the element to the value of "+"
}

function displaySubtractQuestion() {

}