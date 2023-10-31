const languages = require("./data/languages.json");

const Card = require("./Card");

class Game {
    constructor() {
        this.deck = [];
        this.players = [];
        this.gameOver = false;
        this.leadPlayer = null;
    }
    addPlayer(player) {
        if (typeof player === "object" && !this.players.includes(player)) {
            this.players.push(player);
        }
    }
    setLeadPlayer(name) {
        this.leadPlayer = name;
    }
    start() {
        this.populateDeck();
        this.shuffle();
        this.deal();
        this.setLeadPlayer(this.players[0].name);
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
    isGameOver() {
        const activePlayers = this.players.filter(
            (player) => player.hand.length > 0
        ).length;
        this.gameOver = activePlayers < 2;
        return this.gameOver;
    }
    roundWinner(attribute, ...turns) {
        let winningTurn = turns[1];
        for (let turn of turns) {
            const player = this.players[turn[0]];
            const card = player.hand[turn[1]];
            if (card[attribute] > winningTurn[1][attribute]) {
                winningTurn = turn;
            }
        }
        return winningTurn[0];
    }
}

module.exports = Game;
