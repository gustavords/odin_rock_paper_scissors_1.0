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

const roundPara = document.querySelector(`#round`);
roundPara.style.cssText = `white-space: pre`


function playRound(humanChoice, computerChoice) {

    let roundTxt = (winner) => {
        if (winner == "comp") {
            roundPara.textContent = `Human: ${humanChoice} | Computer: ${computerChoice}\n`
            roundPara.textContent += `Computer Wins Round \n`
            roundPara.textContent += `Human Score: ${humanScore} | Computer Score: ${computerScore}`;
            
        }
        else if (winner == "human") {
            roundPara.textContent =`Human: ${humanChoice} | Computer: ${computerChoice}\n`;
            roundPara.textContent +=`Human Wins Round")\n`;
            roundPara.textContent +=`Human Score: ${humanScore} | Computer Score: ${computerScore}`;
        } else {
            roundPara.textContent =`Human: ${humanChoice} | Computer: ${computerChoice}\n`;
            roundPara.textContent +=`Tie\n`;
            roundPara.textContent +=`Human Score: ${humanScore} | Computer Score: ${computerScore}`;
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


//find buttons in page
const buttonCollection = document.querySelectorAll(`.playerSelectionButton`);

let currentPlayerChoice = ``;

function getHumanChoiceBtn(elem) {
    return elem.target.textContent;
}

buttonCollection.forEach((button) => {
    button.addEventListener(`click`, (e) => {
        currentPlayerChoice = getHumanChoiceBtn(e).toLowerCase();
        console.log(currentPlayerChoice);
        playRound(currentPlayerChoice, getComputerChoice());
        // playGame();
    });
});
