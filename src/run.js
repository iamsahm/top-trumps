const Game = require("./game");

const addPlayerForm = document.getElementById("add-player-form");
const playerNameInput = document.getElementById("player-name");
1;

const game = new Game();

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
    console.log(game);
});

const endSetup = document.getElementById("end-game-setup");
const gameSetup = document.getElementById("game-setup");
const gameResultsDiv = document.getElementById("game-results");
const gamePlayArea = document.getElementById("game-play-area");
endSetup.addEventListener("click", () => {
    game.start();
    gameSetup.style.display = "none";
    gamePlayArea.style.display = "block";
    playRound();
});

function playRound() {
    if (game.isGameOver()) {
        const winner = game.players.find((player) => player.hand.length > 0);
        gameResultsDiv.innerHTML = `<h2>${winner.name} wins!</h2>`;
    } else {
        const leadPlayer = game.players.find(
            (player) => player.name === game.leadPlayer
        );

        showCard(leadPlayer);
        showAttributeSelection();

        for (let i = 0; i < game.players.length; i++) {
            const player = game.players[i];
            if (player.name !== game.leadPlayer) {
                const card = player.hand[0];
                const attribute = game.roundAttribute;
                const content = document.createElement("p");
                content.textContent = `${player.name}, it's your turn, choose the attribute you'd like to play!`;
                const hand = document.getElementById("hand");
                hand.appendChild(content);
            }
        }
    }
}

function showCard(player) {
    const hand = document.getElementById("hand");
    hand.innerHTML = "";
    const card = player.hand[0];
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

function showAttributeSelection() {
    const attributeButtons = document.getElementById("attribute-buttons");
    attributeButtons.innerHTML = "";
    const attributes = Object.keys(game.players[0].hand[0]);
    attributes.slice(1, -1).forEach((attribute) => {
        const button = document.createElement("button");
        button.textContent = attribute;
        button.addEventListener("click", () => {
            game.setRoundAttribute(attribute);
        });
        attributeButtons.appendChild(button);
    });
}
