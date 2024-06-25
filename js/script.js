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

// console.log(getComputerChoice());

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

// console.log(getHumanChoice());

function playRound(humanChoice, computerChoice) {

    let roundTxt = (winner) => {
        if (winner == "comp") {
            console.log(`Human: ${humanChoice} | Computer: ${computerChoice}`);
            console.log("Computer Wins Round");
            console.log(`Human Score: ${humanScore} | Computer Score: ${computerScore}`);
        }
        else if (winner == "human") {
            console.log(`Human: ${humanChoice} | Computer: ${computerChoice}`);
            console.log("Human Wins Round");
            console.log(`Human Score: ${humanScore} | Computer Score: ${computerScore}`);
        } else {
            console.log(`Human: ${humanChoice} | Computer: ${computerChoice}`);
            console.log("Tie")
            console.log(`Human Score: ${humanScore} | Computer Score: ${computerScore}`);
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
}

//  playRound(getHumanChoice(), getComputerChoice());

function playGame() {
    let rounds = 5;
    while (rounds > 0) {
        console.log(`Round : ${5 - (rounds - 1)}`);
        playRound(getHumanChoice(), getComputerChoice());
        rounds--;
    }
    if (humanScore == computerScore) {
        console.log("its a TIE! What are the chances? Here is an extra round!");
        playRound(getHumanChoice(), getComputerChoice());
    }
    else {
        (humanScore > computerScore) ? console.log("Human WINS") : console.log("Computer WINS");
    }
}

playGame();