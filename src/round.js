class Round {
    constructor() {
        this.turns = [];
        this.roundWinner = null;
        this.roundAttribute = null;
    }
    addTurn(player, card) {
        if (typeof player !== "string" || typeof card !== "object") {
            throw new Error("Turn must be a tuple of a string and an object");
        }
        this.turns.push({ player, card });
    }
    setRoundAttribute(attribute) {
        if (typeof attribute !== "string") {
            throw new Error("Attribute must be a string");
        }
        this.roundAttribute = attribute;
    }
    defineWinner() {
        if (typeof attribute !== "string") {
            throw new Error("Attribute must be a string");
        }
        const sortedTurns = this.turns.sort((a, b) => {
            return b.card[attribute] - a.card[attribute];
        });
        if (sortedTurns[0].card[attribute] === sortedTurns[1].card[attribute]) {
            return false;
        } else {
            return sortedTurns[0].player;
        }
    }
    returnRoundPot() {
        return this.turns.map((turn) => turn.card);
    }
}

module.exports = Round;
