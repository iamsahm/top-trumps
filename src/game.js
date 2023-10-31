const languages = require("./data/languages.json");

const Card = require("./Card");

class Game {
    constructor() {
        this.deck = [];
        this.players = [];
        this.gameOver = false;
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
    isGameOver() {
        let activePlayers = 0;
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].hand.length > 0) {
                activePlayers++;
            }
        }
        if (activePlayers < 2) {
            this.gameOver = true;
        }
        return this.gameOver;
    }
}

module.exports = Game;
