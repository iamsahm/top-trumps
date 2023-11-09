const Game = require("./game");

const addPlayerForm = document.getElementById("add-player-form");
const playerNameInput = document.getElementById("player-name");

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
});

const endSetup = document.getElementById("end-game-setup");
endSetup.addEventListener("click", () => {
    game.start();
    endSetup.disabled = true;
    addPlayerForm.disabled = true;
});

function playRound() {
    const leadPlayer = game.players.find(
        (player) => player.name === game.leadPlayer
    );
    let playedCards = [];
    showHand(leadPlayer);
    showAttributeSelection();

    for (let i = 0; i < game.players.length; i++) {
        const player = game.players[i];
        if (player.name !== game.leadPlayer) {
            const card = player.hand[0];
            const attribute = game.roundAttribute;
            const content = document.createElement("p");
            content.textContent = `${player.name}: ${card[attribute]}`;
            const hand = document.getElementById("hand");
            hand.appendChild(content);
        }
    }
}

function showHand(player) {
    const hand = document.getElementById("hand");
    hand.innerHTML = "";
    player.hand.forEach((card) => {
        const listItem = document.createElement("div");
        const attributes = Object.keys(card);
        attributes.forEach((attribute) => {
            const content = document.createElement("p");
            content.textContent = `${
                attribute.charAt(0).toUpperCase() + attribute.slice(1)
            }: ${card[attribute]}`;
            listItem.appendChild(content);
        });
        hand.appendChild(listItem);
    });
}

const resetGame = document.getElementById("reset-game");
resetGame.addEventListener("click", () => {
    game.reset();
    endSetup.disabled = false;
    addPlayerForm.disabled = false;
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
