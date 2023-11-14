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
        if (typeof this.roundAttribute !== "string") {
            throw new Error("Attribute must be a string");
        }
        const sortedTurns = this.turns.sort((a, b) => {
            return b.card[this.roundAttribute] - a.card[this.roundAttribute];
        });
        if (
            sortedTurns[0].card[this.roundAttribute] ===
            sortedTurns[1].card[this.roundAttribute]
        ) {
            return;
        } else {
            this.roundWinner = sortedTurns[0].player;
        }
    }
    returnRoundPot() {
        return this.turns.map((turn) => turn.card);
    }

    returnHistoryEntry() {
        return {
            turns: this.turns,
            winner: this.roundWinner,
            roundAttribute: this.roundAttribute,
            resultString: this.roundWinner
                ? `${this.roundWinner} wins!`
                : "Tie! The cards are in the pot for the next round.",
        };
    }
}

module.exports = Round;
