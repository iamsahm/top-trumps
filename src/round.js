class Round {
    constructor() {
        this.turns = [];
    }
    addTurn(player, card) {
        if (typeof player !== "object" || typeof card !== "object") {
            throw new Error("Turn must be a tuple of two objects");
        }
        this.turns.push({ player, card });
    }
    defineWinner(attribute) {
        if (typeof attribute !== "string") {
            throw new Error("Attribute must be a string");
        }
        const sortedTurns = this.turns.sort((a, b) => {
            return b.card[attribute] - a.card[attribute];
        });
        if (sortedTurns[0].card[attribute] === sortedTurns[1].card[attribute]) {
            return null;
        } else {
            return sortedTurns[0].player;
        }
    }
    returnRoundPot() {
        return this.turns.map((turn) => turn.card);
    }
}

module.exports = Round;
