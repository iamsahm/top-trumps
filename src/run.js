const Game = require("./game");
import { showCard } from "./cardRenders";
import "./styles.css";

const game = new Game();

const addPlayerForm = document.getElementById("add-player-form");
const playerNameInput = document.getElementById("player-name");
function updatePlayerList() {
    const playerList = document.getElementById("player-list");
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
        endSetup.style.display = "block";
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
        adjustFontSize();
        turnStatus.textContent = `It's ${game.leadPlayer}'s turn, choose your attribute!`;
    } else {
        gameResultsDiv.textContent = `Game over! ${game.leadPlayer} wins!`;
        gameOutput.style.display = "none";
    }
}

function adjustFontSize(containerID) {
    const container = document.getElementById(containerID);
    const maxHeight = container.offsetHeight;
    while (fact.scrollHeight > maxHeight) {
        let style = window
            .getComputedStyle(container, null)
            .getPropertyValue("font-size");
        let fontSize = parseFloat(style);
        container.style.fontSize = fontSize - 2 + "px";
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
    gameSetup.style.display = "block";
    gamePlayArea.style.display = "none";
    updatePlayerList();
    const hand = document.getElementById("hand");
    hand.innerHTML = "";
});
