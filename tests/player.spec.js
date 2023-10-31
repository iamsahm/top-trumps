const Player = require("../src/player");

describe("Player", () => {
    it("should be defined", () => {
        expect(Player).toBeDefined();
    });
    it("should construct with a name", () => {
        const player = new Player("test");
        expect(player.name).toBe("test");
    });
    it("should construct with an empty hand", () => {
        const player = new Player("test");
        expect(player.hand).toEqual([]);
    });
    it("should throw an error if name is not a string", () => {
        expect(() => {
            new Player(1);
        }).toThrow();
    });
});
