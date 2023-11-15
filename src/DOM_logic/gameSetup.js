export function createGameSetupDialogue() {
    const dialogue = document.createElement("dialog");
    const welcomeDiv = document.createElement("div");
    const h1 = document.createElement("h1");
    const welcomeP = document.createElement("p");
    const instructionP = document.createElement("p");
    const form = document.createElement("form");
    const input = document.createElement("input");
    const addButton = document.createElement("button");
    const playerListDiv = document.createElement("div");
    const ul = document.createElement("ul");
    const goButton = document.createElement("button");

    dialogue.open = true;
    dialogue.className = "div";
    dialogue.id = "game-setup";
    welcomeDiv.className = "welcome-div";
    h1.textContent = "Top Trumps: Languages";
    welcomeP.textContent = "Welcome to Top Trumps";
    instructionP.textContent = "Add two or more players to begin!";
    form.id = "add-player-form";
    input.type = "text";
    input.id = "player-name";
    input.placeholder = "Enter player's name";
    addButton.type = "submit";
    addButton.textContent = "Add Player";
    playerListDiv.id = "player-list";
    ul.id = "player-list";
    goButton.type = "button";
    goButton.id = "end-game-setup";
    goButton.textContent = "GO!";

    welcomeDiv.appendChild(h1);
    welcomeDiv.appendChild(welcomeP);
    dialogue.appendChild(welcomeDiv);
    dialogue.appendChild(instructionP);
    form.appendChild(input);
    form.appendChild(addButton);
    playerListDiv.appendChild(ul);
    form.appendChild(playerListDiv);
    dialogue.appendChild(form);
    dialogue.appendChild(goButton);

    return dialogue;
}

document.body.appendChild(createGameSetupDialogue());

export function createGamePlayArea() {
    // Create elements
    const gamePlayArea = document.createElement("div");
    const leadPlayerOutput = document.createElement("div");
    const handDiv = document.createElement("div");
    const turnStatusDiv = document.createElement("div");
    const resetAndPlayerStatusContainer = document.createElement("div");
    const playerStatusDiv = document.createElement("div");
    const resetGameButton = document.createElement("button");
    const gameResultsDiv = document.createElement("div");
    const nonLeaderCardsDiv = document.createElement("div");

    // Set attributes
    gamePlayArea.id = "game-play-area";
    leadPlayerOutput.id = "lead-player-output";
    handDiv.id = "hand";
    turnStatusDiv.id = "turn-status";
    resetAndPlayerStatusContainer.id = "reset-and-player-status-container";
    resetGameButton.id = "reset-game";
    resetGameButton.textContent = "Reset Game";
    gameResultsDiv.id = "game-results";
    nonLeaderCardsDiv.id = "non-leader-cards";

    // Append elements
    leadPlayerOutput.appendChild(handDiv);
    leadPlayerOutput.appendChild(turnStatusDiv);
    gamePlayArea.appendChild(leadPlayerOutput);

    resetAndPlayerStatusContainer.appendChild(resetGameButton);
    resetAndPlayerStatusContainer.appendChild(gameResultsDiv);
    gamePlayArea.appendChild(resetAndPlayerStatusContainer);

    gameResultsDiv.appendChild(nonLeaderCardsDiv);

    return gamePlayArea;
}

// Usage:
document.body.appendChild(createGamePlayArea());
