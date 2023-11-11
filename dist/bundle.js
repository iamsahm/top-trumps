/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/card.js":
/*!*********************!*\
  !*** ./src/card.js ***!
  \*********************/
/***/ ((module) => {

eval("class Card {\r\n    constructor(\r\n        name,\r\n        syntax = 0,\r\n        performance = 0,\r\n        portability = 0,\r\n        community = 0,\r\n        longevity = 0,\r\n        ecosystem = 0,\r\n        fact = \"\"\r\n    ) {\r\n        if (typeof name !== \"string\") {\r\n            throw new Error(\"Name must be a string\");\r\n        }\r\n        this.name = name;\r\n        this.syntax = syntax;\r\n        this.performance = performance;\r\n        this.portability = portability;\r\n        this.community = community;\r\n        this.longevity = longevity;\r\n        this.ecosystem = ecosystem;\r\n        this.fact = fact;\r\n    }\r\n}\r\n\r\nmodule.exports = Card;\r\n\n\n//# sourceURL=webpack:///./src/card.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const languages = __webpack_require__(/*! ./data/languages.json */ \"./src/data/languages.json\");\r\nconst Card = __webpack_require__(/*! ./card */ \"./src/card.js\");\r\nconst Round = __webpack_require__(/*! ./round */ \"./src/round.js\");\r\n\r\nclass Game {\r\n    constructor() {\r\n        this.deck = [];\r\n        this.players = [];\r\n        this.gameOver = false;\r\n        this.leadPlayer = null;\r\n        this.pot = [];\r\n        this.roundAttribute = null;\r\n    }\r\n    addPlayer(player) {\r\n        if (typeof player === \"object\" && !this.players.includes(player)) {\r\n            this.players.push(player);\r\n        }\r\n    }\r\n\r\n    start() {\r\n        this.populateDeck();\r\n        this.shuffle();\r\n        this.deal();\r\n        this.leadPlayer = this.players[0].name;\r\n    }\r\n    deal() {\r\n        const handLength = Math.floor(this.deck.length / this.players.length);\r\n        this.players.forEach((player) => {\r\n            player.hand = this.deck.splice(0, handLength);\r\n        });\r\n    }\r\n    shuffle() {\r\n        for (let i = this.deck.length - 1; i > 0; i--) {\r\n            const j = Math.floor(Math.random() * i);\r\n            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];\r\n        }\r\n    }\r\n    populateDeck() {\r\n        this.deck = languages.map(\r\n            ({\r\n                name,\r\n                syntax,\r\n                performance,\r\n                portability,\r\n                community,\r\n                longevity,\r\n                ecosystem,\r\n                fact,\r\n            }) =>\r\n                new Card(\r\n                    name,\r\n                    syntax,\r\n                    performance,\r\n                    portability,\r\n                    community,\r\n                    longevity,\r\n                    ecosystem,\r\n                    fact\r\n                )\r\n        );\r\n    }\r\n    getDecisionCard() {\r\n        const decisionMaker = this.players.find(\r\n            (player) => player.name === this.leadPlayer\r\n        );\r\n        return decisionMaker.hand[0];\r\n    }\r\n    chooseAttribute(attribute) {\r\n        if (typeof attribute == \"string\") {\r\n            this.roundAttribute = attribute;\r\n        } else {\r\n            throw new Error(\"Attribute must be a string\");\r\n        }\r\n    }\r\n\r\n    playRound() {\r\n        const round = new Round();\r\n\r\n        const activePlayers = this.players.filter(\r\n            (player) => player.hand.length > 0\r\n        );\r\n        activePlayers.forEach((player) => {\r\n            const card = player.hand.shift();\r\n            round.addTurn(player.name, card);\r\n        });\r\n        const roundWinner = round.defineWinner(this.roundAttribute);\r\n        this.pot = this.pot.concat(round.returnRoundPot());\r\n        if (roundWinner) {\r\n            this.leadPlayer = roundWinner;\r\n            const winnerIndex = this.players.findIndex(\r\n                (player) => player.name === roundWinner\r\n            );\r\n            this.players[winnerIndex].hand = this.players[\r\n                winnerIndex\r\n            ].hand.concat(this.pot);\r\n            this.pot = [];\r\n        }\r\n    }\r\n    isGameOver() {\r\n        const activePlayers = this.players.filter(\r\n            (player) => player.hand.length > 0\r\n        ).length;\r\n        this.gameOver = activePlayers < 2;\r\n        return this.gameOver;\r\n    }\r\n\r\n    reset() {\r\n        this.deck = [];\r\n        this.players = [];\r\n        this.gameOver = false;\r\n        this.leadPlayer = null;\r\n    }\r\n}\r\n\r\nmodule.exports = Game;\r\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/round.js":
/*!**********************!*\
  !*** ./src/round.js ***!
  \**********************/
/***/ ((module) => {

eval("class Round {\r\n    constructor() {\r\n        this.turns = [];\r\n    }\r\n    addTurn(player, card) {\r\n        if (typeof player !== \"string\" || typeof card !== \"object\") {\r\n            throw new Error(\"Turn must be a tuple of a string and an object\");\r\n        }\r\n        this.turns.push({ player, card });\r\n    }\r\n    defineWinner(attribute) {\r\n        if (typeof attribute !== \"string\") {\r\n            throw new Error(\"Attribute must be a string\");\r\n        }\r\n        const sortedTurns = this.turns.sort((a, b) => {\r\n            return b.card[attribute] - a.card[attribute];\r\n        });\r\n        if (sortedTurns[0].card[attribute] === sortedTurns[1].card[attribute]) {\r\n            return false;\r\n        } else {\r\n            return sortedTurns[0].player;\r\n        }\r\n    }\r\n    returnRoundPot() {\r\n        return this.turns.map((turn) => turn.card);\r\n    }\r\n}\r\n\r\nmodule.exports = Round;\r\n\n\n//# sourceURL=webpack:///./src/round.js?");

/***/ }),

/***/ "./src/run.js":
/*!********************!*\
  !*** ./src/run.js ***!
  \********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\r\n\r\nconst game = new Game();\r\n\r\nconst addPlayerForm = document.getElementById(\"add-player-form\");\r\nconst playerNameInput = document.getElementById(\"player-name\");\r\nfunction updatePlayerList() {\r\n    const playerList = document.getElementById(\"player-list\");\r\n    playerList.innerHTML = \"Player list:\";\r\n    game.players.forEach((player) => {\r\n        const listItem = document.createElement(\"li\");\r\n        listItem.textContent = player.name;\r\n        playerList.appendChild(listItem);\r\n    });\r\n}\r\n\r\naddPlayerForm.addEventListener(\"submit\", (event) => {\r\n    event.preventDefault();\r\n    const playerName = playerNameInput.value;\r\n    if (!playerName) {\r\n        return;\r\n    }\r\n    game.addPlayer({ name: playerName });\r\n    updatePlayerList();\r\n    playerNameInput.value = \"\";\r\n});\r\n\r\nconst endSetup = document.getElementById(\"end-game-setup\");\r\nconst gameSetup = document.getElementById(\"game-setup\");\r\nconst gameResultsDiv = document.getElementById(\"game-results\");\r\nconst gamePlayArea = document.getElementById(\"game-play-area\");\r\nconst gameOutput = document.getElementById(\"game-output\");\r\nconst turnStatus = document.getElementById(\"turn-status\");\r\nendSetup.addEventListener(\"click\", (event) => {\r\n    game.start();\r\n    gameSetup.style.display = \"none\";\r\n    gamePlayArea.style.display = \"block\";\r\n    runRound();\r\n});\r\n\r\nfunction runRound() {\r\n    game.gameOver = game.isGameOver();\r\n    if (!game.gameOver) {\r\n        showCard(game.leadPlayer);\r\n        showAttributeSelection(game.getDecisionCard());\r\n        turnStatus.textContent = `It's ${game.leadPlayer}'s turn, choose your attribute!`;\r\n    } else {\r\n        gameResultsDiv.textContent = `Game over! ${game.leadPlayer} wins!`;\r\n        gameOutput.style.display = \"none\";\r\n    }\r\n}\r\n\r\nfunction showCard() {\r\n    const hand = document.getElementById(\"hand\");\r\n    hand.innerHTML = \"\";\r\n    const card = game.getDecisionCard();\r\n    const cardDiv = document.createElement(\"div\");\r\n    cardDiv.classList.add(\"card\");\r\n    for (let i = 0; i < Object.keys(card).length; i++) {\r\n        const attribute = Object.keys(card)[i];\r\n        const content = document.createElement(\"p\");\r\n        content.textContent = `${attribute}: ${card[attribute]}`;\r\n        cardDiv.appendChild(content);\r\n    }\r\n    hand.appendChild(cardDiv);\r\n}\r\n\r\nconst resetGame = document.getElementById(\"reset-game\");\r\nresetGame.addEventListener(\"click\", () => {\r\n    game.reset();\r\n    gameSetup.style.display = \"block\";\r\n    gamePlayArea.style.display = \"none\";\r\n    updatePlayerList();\r\n    const hand = document.getElementById(\"hand\");\r\n    hand.innerHTML = \"\";\r\n});\r\n\r\nfunction showAttributeSelection(card) {\r\n    const attributeButtons = document.getElementById(\"attribute-buttons\");\r\n    attributeButtons.innerHTML = \"\";\r\n    const attributes = Object.keys(card);\r\n    attributes.slice(1, -1).forEach((attribute) => {\r\n        const button = document.createElement(\"button\");\r\n        button.textContent = attribute;\r\n        button.addEventListener(\"click\", () => {\r\n            game.chooseAttribute(attribute);\r\n            game.playRound();\r\n            runRound();\r\n        });\r\n        attributeButtons.appendChild(button);\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/run.js?");

/***/ }),

/***/ "./src/data/languages.json":
/*!*********************************!*\
  !*** ./src/data/languages.json ***!
  \*********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = JSON.parse('[{\"name\":\"Python\",\"syntax\":70,\"performance\":80,\"portability\":40,\"community\":40,\"longevity\":60,\"ecosystem\":70,\"fact\":\"Python was invented by a man\"},{\"name\":\"Javascript\",\"syntax\":70,\"performance\":30,\"portability\":80,\"community\":80,\"longevity\":70,\"ecosystem\":70,\"fact\":\"Javascript was written in two weeks\"},{\"name\":\"Java\",\"syntax\":60,\"performance\":70,\"portability\":90,\"community\":80,\"longevity\":80,\"ecosystem\":90,\"fact\":\"Java was originally designed for interactive television\"},{\"name\":\"C++\",\"syntax\":50,\"performance\":90,\"portability\":70,\"community\":70,\"longevity\":90,\"ecosystem\":80,\"fact\":\"C++ was developed by Bjarne Stroustrup at Bell Labs\"},{\"name\":\"Ruby\",\"syntax\":80,\"performance\":60,\"portability\":70,\"community\":70,\"longevity\":70,\"ecosystem\":80,\"fact\":\"Ruby was influenced by Perl, Smalltalk, Eiffel, Ada, and Lisp\"},{\"name\":\"Swift\",\"syntax\":80,\"performance\":80,\"portability\":70,\"community\":70,\"longevity\":60,\"ecosystem\":70,\"fact\":\"Swift was developed by Apple for iOS and Mac apps\"},{\"name\":\"Go\",\"syntax\":70,\"performance\":90,\"portability\":80,\"community\":70,\"longevity\":60,\"ecosystem\":70,\"fact\":\"Go was developed at Google in response to the company\\'s problems with concurrent programming\"},{\"name\":\"Rust\",\"syntax\":70,\"performance\":90,\"portability\":80,\"community\":70,\"longevity\":60,\"ecosystem\":70,\"fact\":\"Rust is designed to be memory safe without garbage collection\"},{\"name\":\"Kotlin\",\"syntax\":80,\"performance\":70,\"portability\":80,\"community\":70,\"longevity\":60,\"ecosystem\":70,\"fact\":\"Kotlin is officially supported by Google for Android development\"},{\"name\":\"TypeScript\",\"syntax\":80,\"performance\":70,\"portability\":80,\"community\":80,\"longevity\":70,\"ecosystem\":80,\"fact\":\"TypeScript is a strict syntactical superset of JavaScript\"},{\"name\":\"Scala\",\"syntax\":70,\"performance\":80,\"portability\":70,\"community\":70,\"longevity\":70,\"ecosystem\":70,\"fact\":\"Scala is designed to express common programming patterns in a concise, elegant, and type-safe way\"},{\"name\":\"Perl\",\"syntax\":60,\"performance\":70,\"portability\":80,\"community\":70,\"longevity\":80,\"ecosystem\":70,\"fact\":\"Perl was originally developed for text manipulation\"},{\"name\":\"PHP\",\"syntax\":60,\"performance\":70,\"portability\":80,\"community\":80,\"longevity\":80,\"ecosystem\":80,\"fact\":\"PHP originally stood for \\'Personal Home Page\\'\"},{\"name\":\"Lua\",\"syntax\":80,\"performance\":70,\"portability\":90,\"community\":60,\"longevity\":70,\"ecosystem\":60,\"fact\":\"Lua is commonly used in game development\"},{\"name\":\"R\",\"syntax\":70,\"performance\":60,\"portability\":70,\"community\":80,\"longevity\":70,\"ecosystem\":90,\"fact\":\"R is widely used for statistical computing and graphics\"},{\"name\":\"Elixir\",\"syntax\":70,\"performance\":80,\"portability\":70,\"community\":60,\"longevity\":60,\"ecosystem\":70,\"fact\":\"Elixir is a dynamic, functional language designed for building scalable and maintainable applications\"},{\"name\":\"Haskell\",\"syntax\":60,\"performance\":80,\"portability\":70,\"community\":60,\"longevity\":70,\"ecosystem\":60,\"fact\":\"Haskell is a statically typed, purely functional programming language\"},{\"name\":\"Groovy\",\"syntax\":70,\"performance\":60,\"portability\":70,\"community\":60,\"longevity\":60,\"ecosystem\":70,\"fact\":\"Groovy is a powerful, optionally typed and dynamic language, with static-typing and static compilation capabilities\"},{\"name\":\"Clojure\",\"syntax\":70,\"performance\":70,\"portability\":80,\"community\":60,\"longevity\":60,\"ecosystem\":70,\"fact\":\"Clojure is a robust, practical, and fast programming language with a set of useful features that together form a simple, coherent, and powerful tool\"},{\"name\":\"Erlang\",\"syntax\":60,\"performance\":80,\"portability\":70,\"community\":60,\"longevity\":70,\"ecosystem\":70,\"fact\":\"Erlang is a programming language used to build massively scalable soft real-time systems with requirements on high availability\"},{\"name\":\"F#\",\"syntax\":70,\"performance\":70,\"portability\":70,\"community\":60,\"longevity\":60,\"ecosystem\":70,\"fact\":\"F# is a mature, open source, cross-platform, functional-first programming language\"},{\"name\":\"Dart\",\"syntax\":70,\"performance\":70,\"portability\":80,\"community\":60,\"longevity\":60,\"ecosystem\":70,\"fact\":\"Dart is a client-optimized language for fast apps on any platform\"},{\"name\":\"Objective-C\",\"syntax\":60,\"performance\":70,\"portability\":60,\"community\":60,\"longevity\":70,\"ecosystem\":70,\"fact\":\"Objective-C was the main programming language used by Apple for macOS and iOS development before Swift\"},{\"name\":\"Shell\",\"syntax\":60,\"performance\":70,\"portability\":80,\"community\":70,\"longevity\":80,\"ecosystem\":70,\"fact\":\"Shell scripting is used for automating routine tasks in Unix-like operating systems\"},{\"name\":\"MATLAB\",\"syntax\":70,\"performance\":60,\"portability\":70,\"community\":70,\"longevity\":70,\"ecosystem\":80,\"fact\":\"MATLAB is widely used in academia and industry for mathematical modeling\"},{\"name\":\"Fortran\",\"syntax\":50,\"performance\":80,\"portability\":70,\"community\":60,\"longevity\":90,\"ecosystem\":60,\"fact\":\"Fortran is one of the oldest high-level programming languages, first developed in the 1950s\"},{\"name\":\"COBOL\",\"syntax\":50,\"performance\":60,\"portability\":70,\"community\":60,\"longevity\":90,\"ecosystem\":60,\"fact\":\"COBOL is widely used in legacy applications deployed on mainframe computers\"},{\"name\":\"Assembly\",\"syntax\":40,\"performance\":90,\"portability\":50,\"community\":50,\"longevity\":90,\"ecosystem\":60,\"fact\":\"Assembly language is a low-level programming language for a computer, or other programmable device\"},{\"name\":\"Prolog\",\"syntax\":60,\"performance\":60,\"portability\":70,\"community\":60,\"longevity\":70,\"ecosystem\":60,\"fact\":\"Prolog is a logic programming language associated with artificial intelligence and computational linguistics\"},{\"name\":\"Lisp\",\"syntax\":60,\"performance\":60,\"portability\":70,\"community\":60,\"longevity\":80,\"ecosystem\":60,\"fact\":\"Lisp (for \\'List Processing\\') is one of the oldest high-level programming languages, first conceived in 1958\"},{\"name\":\"Ada\",\"syntax\":70,\"performance\":70,\"portability\":70,\"community\":60,\"longevity\":70,\"ecosystem\":60,\"fact\":\"Ada is a structured, statically typed, imperative, and object-oriented high-level computer programming language\"},{\"name\":\"Julia\",\"syntax\":70,\"performance\":80,\"portability\":70,\"community\":60,\"longevity\":60,\"ecosystem\":70,\"fact\":\"Julia is a high-level, high-performance dynamic programming language for technical computing\"},{\"name\":\"C#\",\"syntax\":70,\"performance\":80,\"portability\":70,\"community\":80,\"longevity\":70,\"ecosystem\":80,\"fact\":\"C# is a modern, object-oriented programming language developed by Microsoft\"}]');\n\n//# sourceURL=webpack:///./src/data/languages.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/run.js");
/******/ 	
/******/ })()
;