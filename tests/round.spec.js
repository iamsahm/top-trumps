/*
Class
constructs with an empty array of turns
methods
add turn
takes a player object and a card object and adds them to the turns array
define winner
takes an attribute
returns the player object for the turn with the highest value for that attribute
return round pot
returns an array of the cards in the turns array

*/

const Round = require("../src/round");

describe("Round", () => {
    it("constructs with an empty array of turns", () => {
        const round = new Round();
        expect(round.turns).toEqual([]);
    });
    describe("addTurn", () => {
        it("should add a turn to the turns array", () => {
            const round = new Round();
            round.addTurn("test", { name: "test", syntax: 1 });
            expect(round.turns.length).toEqual(1);
        });
        it("should throw an error if the turn is not a tuple with a string and an object", () => {
            const round = new Round();
            expect(() => round.addTurn("test", "test")).toThrow(
                "Turn must be a tuple"
            );
        });
    });
    describe("defineWinner", () => {
        it("should return the player with the highest value for the given attribute", () => {
            const round = new Round();
            round.addTurn("test", { name: "test", syntax: 1 });
            round.addTurn("test2", { name: "test2", syntax: 2 });
            expect(round.defineWinner("syntax")).toEqual("test2");
        });
        it("should return null if there is no winner", () => {
            const round = new Round();
            round.addTurn("test", { name: "test", syntax: 2 });
            round.addTurn("test2", { name: "test2", syntax: 2 });
            expect(round.defineWinner("syntax")).toEqual(false);
        });
        it("should throw an error if the attribute is not a string", () => {
            const round = new Round();
            expect(() => round.defineWinner(1)).toThrow(
                "Attribute must be a string"
            );
        });
    });
    describe("returnRoundPot", () => {
        it("should return the cards in the turns array", () => {
            const round = new Round();
            round.addTurn("test", { name: "test", syntax: 1 });
            round.addTurn("test2", { name: "test2", syntax: 2 });
            expect(round.returnRoundPot()).toEqual([
                { name: "test", syntax: 1 },
                { name: "test2", syntax: 2 },
            ]);
        });
    });
});
