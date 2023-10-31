// Make sure the Game class has the necessary methods for adding players.
const Game = require("./game");

const addPlayerForm = document.getElementById("add-player-form");
const playerNameInput = document.getElementById("player-name");

const game = new Game();

function updatePlayerList() {
    // Get the player list element from the DOM
    const playerList = document.getElementById("player-list");

    // Clear the existing list before adding players to prevent duplicates
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

    game.addPlayer({ name: playerName });
    updatePlayerList();

    playerNameInput.value = "";
});
