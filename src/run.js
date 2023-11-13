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
const leadPlayerOutputDiv = document.getElementById("lead-player-output");
const turnStatus = document.getElementById("turn-status");
endSetupButton.addEventListener("click", () => {
    game.start();
    gameSetup.style.display = "none";
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

        turnStatus.textContent = `It's ${game.leadPlayer}'s turn, choose your attribute!`;
    } else {
        gameResultsDiv.textContent = `Game over! ${game.leadPlayer} wins!`;
        leadPlayerOutputDiv.style.display = "none";
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
            game.chooseAttribute(attribute);
            showOtherCards();
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
    gamePlayAreaDiv.style.display = "none";
    updatePlayerList();
    const hand = document.getElementById("hand");
    hand.innerHTML = "";
});

function showOtherCards() {
    if (!document.getElementById("non-leader-cards")) {
        const nonLeaderCardsDiv = document.createElement("div");
        nonLeaderCardsDiv.classList.add("non-leader-cards");
        nonLeaderCardsDiv.id = "non-leader-cards";
        gamePlayAreaDiv.appendChild(nonLeaderCardsDiv);
    }
    const nonLeaderCardsDiv = document.getElementById("non-leader-cards");
    const activePlayers = game.players.filter(
        (player) => player.hand.length > 0
    );
    const nonLeaderPlayers = activePlayers.filter(
        (player) => player.name !== game.leadPlayer
    );
    const nonLeaderCards = nonLeaderPlayers.map((player) => player.hand[0]);
    nonLeaderCardsDiv.innerHTML = "";

    nonLeaderCards.forEach((card, index) => {
        const cardDiv = document.createElement("div");
        cardDiv.id = `non-leader-card-${index}`;
        nonLeaderCardsDiv.appendChild(cardDiv);
        showCard(card, `non-leader-card-${index}`);
        adjustFontSize(`non-leader-card-${index}-fact`);
    });
}
