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
        showCard(game.leadPlayer);
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
    const title = document.createElement("h3");
    title.textContent = card.name;
    title.classList.add("card-title");
    cardDiv.appendChild(title);
    const attributeButtons = document.createElement("div");
    attributeButtons.classList.add("attribute-buttons");
    for (let i = 1; i < Object.keys(card).length - 1; i++) {
        const attribute = Object.keys(card)[i];
        const button = document.createElement("button");
        button.addEventListener("click", () => {
            game.chooseAttribute(attribute);
            game.playRound();
            runRound();
        });
        const attributeNameDiv = document.createElement("div");
        attributeNameDiv.textContent = attribute;
        attributeNameDiv.classList.add("attribute-name");
        button.appendChild(attributeNameDiv);
        const attributeValueDiv = document.createElement("div");
        attributeValueDiv.textContent = card[attribute];
        attributeValueDiv.classList.add("attribute-value");
        button.appendChild(attributeValueDiv);
        button.classList.add("attribute-button");
        attributeButtons.appendChild(button);
    }
    cardDiv.appendChild(attributeButtons);
    const fact = document.createElement("p");
    fact.textContent = card.fact;
    fact.classList.add("fact");
    cardDiv.appendChild(fact);
    hand.appendChild(cardDiv);
    const maxHeight = fact.offsetHeight;
    adjustFontSize(fact, maxHeight);
}

function adjustFontSize(container, maxHeight) {
    while (container.scrollHeight > maxHeight) {
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
