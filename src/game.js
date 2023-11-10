const languages = require("./data/languages.json");

const Card = require("./Card");

class Game {
    constructor() {
        this.deck = [];
        this.players = [];
        this.gameOver = false;
        this.leadPlayer = null;
        this.roundAttribute = null;
        this.pot = [];
    }

    addPlayer(player) {
        if (typeof player === "object" && !this.players.includes(player)) {
            this.players.push(player);
        }
    }
    setLeadPlayer(name) {
        this.leadPlayer = name;
    }
    setRoundAttribute(attribute) {
        this.roundAttribute = attribute;
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
    playCard(player, card) {
        const playedCard = this.players[player].hand.splice(card, 1)[0];
        this.pot.push(playedCard);
    }

    roundWinner(attribute, ...turns) {
        console.log(turns, "turns");
        const attributeValues = turns.map((turn) => {
            const [player, card] = turn;
            return [player, card[attribute]];
        });
        return attributeValues.reduce((highest, current) =>
            current[1] > highest[1] ? current : highest
        )[0];
    }
    reset() {
        this.deck = [];
        this.players = [];
        this.gameOver = false;
        this.leadPlayer = null;
    }
    assignWinnings(winner) {
        this.players[winner].hand = [...this.players[winner].hand, ...this.pot];
        this.pot = [];
    }
}

module.exports = Game;
