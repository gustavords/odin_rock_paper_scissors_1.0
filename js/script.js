// Global Variables
let humanScore = 0;
let computerScore = 0;

//referencing elements in index.html
const buttonCollection = document.querySelectorAll(`.playerSelectionButton`);
const roundNum = document.querySelector("h3.round-num");
const roundSelection = document.querySelector("p.round-selection");
const roundWinner = document.querySelector("p.round-winner");
const playerChoiceImg = document.querySelector(`#versusContainer>div:nth-child(1)`);
const compChoiceImg = document.querySelector(`#versusContainer>div:nth-child(2)`);

let currentPlayerChoice = ``;
let rounds = 4;

const getComputerChoice = () => {
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

function getHumanChoiceBtn(elem) {
    return elem.target.value.toLowerCase();
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

    const clearBoard = () => {
        roundSelection.querySelector(`span:nth-child(1)`).textContent = ``;
        roundSelection.querySelector(`span:nth-child(2)`).textContent = ``;
        roundSelection.querySelector(`span:nth-child(3)`).textContent = ``;
        roundSelection.querySelector(`span:nth-child(4)`).textContent = ``;
        roundWinner.textContent = ``;
    };

    let roundTxt = (winner) => {
        roundSelection.querySelector(`span:nth-child(1)`).textContent = `${5 - rounds}`;
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
    changeVersusDisplay(humanChoice, computerChoice);
    setRoundHistory();
    clearBoard();
}

function changeVersusDisplay(humanChoice, computerChoice) {
    const displayEmoji = (elemRef, choice) => {
        switch (choice) {
            case `rock`:
                elemRef.textContent = `🪨Rock`;
                break;
            case `paper`:
                elemRef.textContent = `📜Paper`;
                break;
            case `scissors`:
                elemRef.textContent = `✂️Scissors`;
                break;
        }
    }

    displayEmoji(playerChoiceImg, humanChoice);
    displayEmoji(compChoiceImg, computerChoice);

}

function playFiveRounds() {
    console.log(rounds);

    if (rounds <= 0) {
        let winner = (humanScore > computerScore) ? `HUMAN WINS GAME` : `COMP WINS GAME`;
        let tie = false;
        //in case of a tie
        if (rounds === 0 && computerScore === humanScore) {
            roundWinner.textContent = `ITS a TIE! One more round!`;
            tie = true;
            roundNum.textContent = `Round : TIE ROUND`;
        }
        else {
            //resets game-rounds
            rounds = 4;
            humanScore = 0;
            computerScore = 0;
        }
        if (tie === false) {
            roundWinner.textContent = winner;
            roundNum.textContent = winner;
            roundSelection.textContent = ``;
            //why does this work?
            window.location.reload();
            setTimeout((() => alert(`page will fresh`)), 1);
        }
    }
    else {
        roundNum.textContent = `Round : ${5 - (rounds - 1)}`;
        rounds--;
    }
}

//not used currently
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

buttonCollection.forEach((button) => {
    button.addEventListener(`click`, (e) => {

        //these lines can be made into a function if the rounds are an object with a getter and setter for rounds
        currentPlayerChoice = getHumanChoiceBtn(e);
        console.log(currentPlayerChoice);
        playRound(currentPlayerChoice, getComputerChoice());
        playFiveRounds();
    });
});


