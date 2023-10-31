class Player {
    constructor(name) {
        if (typeof name !== "string") {
            throw new Error("Name must be a string");
        }
        this.name = name;
        this.hand = [];
    }
}

module.exports = Player;
