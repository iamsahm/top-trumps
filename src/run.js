const Game = require("./game");
import { showCard, adjustFontSize } from "./cardRenders";
import "./styles.css";

const game = new Game();

const addPlayerForm = document.getElementById("add-player-form");
const playerNameInput = document.getElementById("player-name");
function updatePlayerList() {
    const playerList = document.getElementById("player-list");
    if (game.players.length === 0) {
        playerList.innerHTML = "";
        return;
    }
    playerList.innerHTML = "Player list:";
    game.players.forEach((player) => {
        const listItem = document.createElement("li");
        listItem.textContent = player.name;
        playerList.appendChild(listItem);
    });
}
const endSetup = document.getElementById("end-game-setup");

addPlayerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const playerName = playerNameInput.value;
    if (!playerName) {
        return;
    }
    game.addPlayer({ name: playerName });
    updatePlayerList();
    playerNameInput.value = "";
    if (game.players.length > 1) {
        endSetup.style.display = "flex";
        resetGame.style.display = "block";
    }
});

const gameSetup = document.getElementById("game-setup");
const gameResultsDiv = document.getElementById("game-results");
const gamePlayArea = document.getElementById("game-play-area");
const gameOutput = document.getElementById("game-output");
const turnStatus = document.getElementById("turn-status");
endSetup.addEventListener("click", () => {
    game.start();
    gameSetup.style.display = "none";
    gamePlayArea.style.display = "block";
    runRound();
});

function runRound() {
    game.gameOver = game.isGameOver();
    updatePlayerScoreResults();
    if (!game.gameOver) {
        showCard(game.getDecisionCard(), "hand");
        adjustFontSize("hand-fact");
        activateAttributeButtons(game.getDecisionCard(), "hand");

        turnStatus.textContent = `It's ${game.leadPlayer}'s turn, choose your attribute!`;
    } else {
        gameResultsDiv.textContent = `Game over! ${game.leadPlayer} wins!`;
        gameOutput.style.display = "none";
    }
}

function activateAttributeButtons(card, divID) {
    const attributesDiv = document.querySelector(`#${divID} .attributes`);
    attributesDiv.innerHTML = "";
    for (let i = 1; i < Object.keys(card).length - 1; i++) {
        const attribute = Object.keys(card)[i];
        const attributeButton = document.createElement("button");
        attributeButton.classList.add("attribute-button");
        attributeButton.addEventListener("click", () => {
            game.chooseAttribute(attribute);
            game.playRound();
            runRound();
        });
        const attributeNameDiv = document.createElement("div");
        attributeNameDiv.textContent = attribute;
        attributeNameDiv.classList.add("attribute-name");
        attributeButton.appendChild(attributeNameDiv);
        const attributeValueDiv = document.createElement("div");
        attributeValueDiv.textContent = card[attribute];
        attributeValueDiv.classList.add("attribute-value");
        attributeButton.appendChild(attributeValueDiv);
        attributesDiv.appendChild(attributeButton);
    }
}

function updatePlayerScoreResults() {
    gameResultsDiv.innerHTML = "";
    const playerScoresDiv = document.createElement("div");
    playerScoresDiv.classList.add("player-scores");
    playerScoresDiv.innerHTML = "Player scores:";
    game.players.forEach((player) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${player.name}: ${player.hand.length}`;
        if (player.hand.length === 0) {
            listItem.classList.add("lost");
        }
        playerScoresDiv.appendChild(listItem);
    });
    gameResultsDiv.appendChild(playerScoresDiv);
}

const resetGame = document.getElementById("reset-game");
resetGame.addEventListener("click", () => {
    game.reset();
    gameSetup.style.display = "flex";
    document.getElementById("end-game-setup").style.display = "none";
    gamePlayArea.style.display = "none";
    updatePlayerList();
    const hand = document.getElementById("hand");
    hand.innerHTML = "";
});
