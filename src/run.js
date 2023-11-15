const Game = require("./game_logic/game");
import { showCard, adjustFontSize } from "./DOM_logic/cardRenders";
import {
    createGameSetupDialogue,
    createGamePlayArea,
} from "./DOM_logic/gameSetup";
import "./styles.css";

let game = new Game();

createGameSetupDialogue();
createGamePlayArea();

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
        playerList.style.display = "flex";
        const listItem = document.createElement("li");
        listItem.textContent = player.name;
        playerList.appendChild(listItem);
    });
}
const endSetupButton = document.getElementById("end-game-setup");

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
        endSetupButton.style.display = "flex";
        resetGame.style.display = "block";
    }
});

const gameSetup = document.getElementById("game-setup");
const gameResultsDiv = document.getElementById("game-results");
const gamePlayAreaDiv = document.getElementById("game-play-area");
const turnStatus = document.getElementById("turn-status");

endSetupButton.addEventListener("click", () => {
    game.start();
    gameSetup.remove();
    gamePlayAreaDiv.style.display = "flex";
    runRound();
});

function runRound() {
    game.gameOver = game.isGameOver();
    updatePlayerScoreResults();
    if (!game.gameOver) {
        showCard(game.getDecisionCard(), "hand");
        adjustFontSize("hand-fact");
        activateAttributeButtons(game.getDecisionCard(), "hand");

        turnStatus.textContent = `It's ${game.leadPlayer}'s turn, choose an attribute! If it's higher than the attribute on the other player's first cards, you win the round`;
    } else {
        document.body.innerHTML = "";
        const gameOverDiv = document.createElement("div");
        gameOverDiv.classList.add("game-over");
        const gameOverHeader = document.createElement("h1");
        gameOverHeader.textContent = `Game Over! ${game.players[0].name} wins!`;
        gameOverDiv.appendChild(gameOverHeader);
        document.body.appendChild(gameOverDiv);
    }
}

function activateAttributeButtons(card, divID) {
    const attributesDiv = document.querySelector(`#${divID} .attributes`);
    attributesDiv.innerHTML = "";
    for (let i = 1; i < Object.keys(card).length - 1; i++) {
        const attribute = Object.keys(card)[i];
        const attributeButton = document.createElement("button");
        attributeButton.classList.add("attribute-button", "sheen");
        attributeButton.addEventListener("click", () => {
            game.playRound(attribute);
            showRoundResults();
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
    location.reload();
});

function showRoundResults() {
    const existingRoundResultsDiv = document.getElementById("round-results");
    if (existingRoundResultsDiv) {
        existingRoundResultsDiv.innerHTML = "";
    }
    const roundResultsDiv = document.createElement("dialog");
    roundResultsDiv.id = "round-results";
    document.body.appendChild(roundResultsDiv);

    const roundResultsHeader = document.createElement("h2");
    roundResultsHeader.textContent = game.roundHistory[0].resultString;
    roundResultsDiv.appendChild(roundResultsHeader);

    const previousRoundCardsDiv = document.createElement("div");
    previousRoundCardsDiv.classList.add("previous-round-cards");
    roundResultsDiv.appendChild(previousRoundCardsDiv);

    game.roundHistory[0].turns.forEach((turn) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("previous-round-card");
        cardDiv.id = `${turn.player}-card`;
        previousRoundCardsDiv.appendChild(cardDiv);
        const previousRoundCardHeader = document.createElement("h3");
        previousRoundCardHeader.textContent = `${turn.player}'s card`;
        showCard(turn.card, `${turn.player}-card`);
        cardDiv.appendChild(previousRoundCardHeader);
    });
    roundResultsDiv.addEventListener("click", () => {
        roundResultsDiv.remove();
    });
    roundResultsDiv.showModal();
}
