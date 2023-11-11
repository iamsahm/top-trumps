const Game = require("./game");

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

addPlayerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const playerName = playerNameInput.value;
    if (!playerName) {
        return;
    }
    game.addPlayer({ name: playerName });
    updatePlayerList();
    playerNameInput.value = "";
});

const endSetup = document.getElementById("end-game-setup");
const gameSetup = document.getElementById("game-setup");
const gameResultsDiv = document.getElementById("game-results");
const gamePlayArea = document.getElementById("game-play-area");
const gameOutput = document.getElementById("game-output");
const turnStatus = document.getElementById("turn-status");
endSetup.addEventListener("click", (event) => {
    game.start();
    gameSetup.style.display = "none";
    gamePlayArea.style.display = "block";
    runRound();
});

function runRound() {
    game.gameOver = game.isGameOver();
    if (!game.gameOver) {
        showCard(game.leadPlayer);
        showAttributeSelection(game.getDecisionCard());
        turnStatus.textContent = `It's ${game.leadPlayer}'s turn, choose your attribute!`;
    } else {
        gameResultsDiv.textContent = `Game over! ${game.leadPlayer} wins!`;
        gameOutput.style.display = "none";
    }
}

function showCard() {
    const hand = document.getElementById("hand");
    hand.innerHTML = "";
    const card = game.getDecisionCard();
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    for (let i = 0; i < Object.keys(card).length; i++) {
        const attribute = Object.keys(card)[i];
        const content = document.createElement("p");
        content.textContent = `${attribute}: ${card[attribute]}`;
        cardDiv.appendChild(content);
    }
    hand.appendChild(cardDiv);
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

function showAttributeSelection(card) {
    const attributeButtons = document.getElementById("attribute-buttons");
    attributeButtons.innerHTML = "";
    const attributes = Object.keys(card);
    attributes.slice(1, -1).forEach((attribute) => {
        const button = document.createElement("button");
        button.textContent = attribute;
        button.addEventListener("click", () => {
            game.chooseAttribute(attribute);
            game.playRound();
            runRound();
        });
        attributeButtons.appendChild(button);
    });
}
