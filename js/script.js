// console.log("im here!");

// Global Variables
let humanScore = 0;
let computerScore = 0;

let getComputerChoice = () => {
    let computerChoice = Math.floor(Math.random() * 3) + 1;
    switch (computerChoice) {
        case 1:
            computerChoice = "rock";
            break;
        case 2:
            computerChoice = "paper";
            break;
        case 3:
            computerChoice = "scissors";
            break;
    }
    return computerChoice;
};

let getHumanChoice = () => {
    let possibleChoices = ["rock", "paper", "scissors"];
    let humanChoice = prompt("rock, paper or scissors?", "").toLowerCase().trim();
    if (humanChoice == "" || !isNaN(+humanChoice)) {
        console.log(`"${humanChoice}" CANNOT be empty or a number. Please type: rock, paper or scissors.`);
        return getHumanChoice();
    }
    else if (!possibleChoices.includes(humanChoice)) {
        console.log(`"${humanChoice}" is NOT rock paper or scissors. Please type: rock, paper or scissors`);
        return getHumanChoice();
    }
    else {
        return humanChoice;
    }
};

//find buttons in page
const buttonCollection = document.querySelectorAll(`.playerSelectionButton`);
const roundPara = document.querySelector(`#round`);
let currentPlayerChoice = ``;
let rounds = 4;

buttonCollection.forEach((button) => {
    button.addEventListener(`click`, (e) => {
        currentPlayerChoice = getHumanChoiceBtn(e).toLowerCase();
        console.log(currentPlayerChoice);
        playRound(currentPlayerChoice, getComputerChoice());
        playFiveRounds();
    });
});

function getHumanChoiceBtn(elem) {
    return elem.target.value;
}

const roundNum = document.querySelector("h3.round-num");
const roundSelection = document.querySelector("p.round-selection");
const roundWinner = document.querySelector("p.round-winner");


function playFiveRounds() {
    console.log(rounds);
    if (rounds <= 0) {
        (humanScore > computerScore) ? roundWinner.textContent = `HUMAN WINS GAME` : roundWinner.textContent = `COMP WINS GAME`;
        //in case of a tie
        if (rounds === 1 && computerScore === humanScore) {
            roundWinner.textContent = `ITS a TIE! One more round!`;
            rounds++;
            if (humanScore > computerScore) {
                roundWinner.textContent = `HUMAN WINS`
            }
            if (humanScore > computerScore) {
                roundWinner.textContent = `COMP WINS`
            };
        }
        else {

            //resets game-rounds
            rounds = 4;
            humanScore = 0;
            computerScore = 0;
        }
    }
    else {
        //issue with amount
        //change layout for less confusing round timing
        roundNum.textContent = `Round : ${5 - (rounds - 1)}`;
        rounds--;
    }
}

function playRound(humanChoice, computerChoice) {

    const setRoundHistory = () => {
        const roundHist = document.querySelector(`.round-hist`);
        const roundContainer = document.querySelector(`.round-container`);
        const clone = roundContainer.cloneNode(true);
        if ((5 - (rounds - 4)) > 1) {
            roundHist.insertBefore(clone, roundContainer.nextSibling);
        }
        else {
            roundHist.appendChild(clone); 

        }
    };

    let roundTxt = (winner) => {
        roundSelection.querySelector(`span:nth-child(1)`).textContent = `${5 - (rounds)}`;
        roundSelection.querySelector(`span:nth-child(2)`).textContent = `${humanChoice}`;
        roundSelection.querySelector(`span:nth-child(3)`).textContent = `${computerChoice}`;
        roundSelection.querySelector(`span:nth-child(4)`).textContent = `${humanScore} : ${computerScore}`;

        if (winner == "comp") {
            roundWinner.textContent = `Computer Wins Round`;
        }
        else if (winner == "human") {
            roundWinner.textContent = `Human Wins Round`;
        } else {
            roundWinner.textContent = `Tie`;
        }

    };

    if (humanChoice == undefined) {
        console.log("error")
    }

    if (humanChoice == "rock" && computerChoice == "paper") {
        computerScore++;
        roundTxt("comp");
    }
    else if (humanChoice == "rock" && computerChoice == "scissors") {
        humanScore++;
        roundTxt("human");
    }
    else if (humanChoice == "paper" && computerChoice == "rock") {
        humanScore++;
        roundTxt("human");
    }
    else if (humanChoice == "paper" && computerChoice == "scissors") {
        computerScore++;
        roundTxt("comp");
    }
    else if (humanChoice == "scissors" && computerChoice == "paper") {
        humanScore++;
        roundTxt("human");
    }
    else if (humanChoice == "scissors" && computerChoice == "rock") {
        computerScore++;
        roundTxt("comp");
    }
    else {
        humanScore++;
        computerScore++;
        roundTxt();
    }
    setRoundHistory();
}
//  playRound(getHumanChoice(), getComputerChoice());

function playGame() {
    let rounds = 5;
    while (rounds > 0) {
        console.log(`Round : ${5 - (rounds - 1)}`);
        playRound(currentPlayerChoice, getComputerChoice());
        rounds--;
    }
    if (humanScore == computerScore) {
        console.log("its a TIE! What are the chances? Here is an extra round!");
        playRound(currentPlayerChoice, getComputerChoice());
    }
    else {
        (humanScore > computerScore) ? console.log("Human WINS") : console.log("Computer WINS");
    }




}
// playGame();