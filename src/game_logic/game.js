const languages = require("../data/languages.json");
const Card = require("./card");
const Round = require("./round");

class Game {
    constructor() {
        this.deck = [];
        this.players = [];
        this.gameOver = false;
        this.leadPlayer = null;
        this.pot = [];
        this.roundHistory = [];
    }
    addPlayer(player) {
        const playerNames = this.players.map((player) => player.name);
        if (typeof player === "object" && !playerNames.includes(player.name)) {
            this.players.push(player);
        }
    }

    start() {
        this.populateDeck();
        this.shuffle();
        this.deal();
        this.leadPlayer = this.players[0].name;
    }
    deal() {
        const handLength = Math.floor(this.deck.length / this.players.length);
        this.players.forEach((player) => {
            player.hand = this.deck.splice(0, handLength);
        });
    }
    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
    populateDeck() {
        this.deck = languages.map(
            ({
                name,
                syntax,
                performance,
                portability,
                community,
                longevity,
                ecosystem,
                fact,
            }) =>
                new Card(
                    name,
                    syntax,
                    performance,
                    portability,
                    community,
                    longevity,
                    ecosystem,
                    fact
                )
        );
    }
    getDecisionCard() {
        const decisionMaker = this.players.find(
            (player) => player.name === this.leadPlayer
        );
        return decisionMaker.hand[0];
    }

    playRound(attribute) {
        const round = new Round();
        const activePlayers = this.getActivePlayers();
        activePlayers.forEach((player) => {
            const card = player.hand.shift();
            round.addTurn(player.name, card);
        });
        if (attribute) {
            round.setRoundAttribute(attribute);
        } else {
            throw new Error("must choose an attribute");
        }
        round.defineWinner();
        this.roundHistory.push(round.returnHistoryEntry());

        this.pot = this.pot.concat(round.returnRoundPot());
        if (round.roundWinner) {
            this.leadPlayer = round.roundWinner;
            const winnerIndex = this.players.findIndex(
                (player) => player.name === round.roundWinner
            );
            this.players[winnerIndex].hand = this.players[
                winnerIndex
            ].hand.concat(this.pot);
            this.pot = [];
        }
    }
    getActivePlayers() {
        return this.players.filter((player) => player.hand.length > 0);
    }
    isGameOver() {
        const activePlayers = this.players.filter(
            (player) => player.hand.length > 0
        ).length;
        this.gameOver = activePlayers < 2;
        return this.gameOver;
    }

    reset() {
        this.deck = [];
        this.players = [];
        this.gameOver = false;
        this.leadPlayer = null;
        this.pot = [];
        this.roundAttribute = null;
        this.roundHistory = [];
    }
}

module.exports = Game;
