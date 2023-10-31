class Card {
    constructor(
        name,
        syntax = 0,
        performance = 0,
        portability = 0,
        community = 0,
        longevity = 0,
        ecosystem = 0,
        fact = ""
    ) {
        if (typeof name !== "string") {
            throw new Error("Name must be a string");
        }
        this.name = name;
        this.syntax = syntax;
        this.performance = performance;
        this.portability = portability;
        this.community = community;
        this.longevity = longevity;
        this.ecosystem = ecosystem;
        this.fact = fact;
    }
}

module.exports = Card;
