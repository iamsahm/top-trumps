// Make sure the Game class has the necessary methods for adding players.
const Game = require("./game");

const addPlayerForm = document.getElementById("add-player-form");
const playerNameInput = document.getElementById("player-name");

const game = new Game();

function updatePlayerList() {
    const playerList = document.getElementById("player-list");
    playerList.innerHTML = "";

    // Create a new list item for each player and append it to the player list
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
    for (player of game.players) {
        console.log(player.name);
        showHand(player);
    }
});

function showHand(player) {
    const hand = document.getElementById("hand");
    hand.innerHTML = "";

    player.hand.forEach((card) => {
        const listItem = document.createElement("button");
        listItem.textContent = Object.values(card).join(", ");
        listItem.addEventListener("click", () => {
            console.log(card);
        });
        hand.appendChild(listItem);
    });
}
