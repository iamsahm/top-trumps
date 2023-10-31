const languages = require("./data/languages.json");

const Card = require("./Card");

class Game {
    constructor() {
        this.deck = [];
        this.players = [];
    }
    addPlayer(player) {
        if (typeof player !== "object") {
            return;
        }
        if (this.players.includes(player)) {
            return;
        }
        this.players.push(player);
    }
    start() {
        this.populateDeck();
        this.shuffle();
        this.deal();
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
            const temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    }
    populateDeck() {
        languages.forEach((language) => {
            this.deck.push(
                new Card(
                    language.name,
                    language.syntax,
                    language.performance,
                    language.portability,
                    language.community,
                    language.longevity,
                    language.ecosystem,
                    language.fact
                )
            );
        });
    }
}

module.exports = Game;
