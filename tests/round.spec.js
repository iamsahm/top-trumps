const Round = require("../src/round");

let round;

describe("Round", () => {
    beforeEach(() => {
        round = new Round();
    });
    it("constructs with an empty array of turns, a null roundWinner and a round attribute value", () => {
        expect(round.turns).toEqual([]);
        expect(round.roundAttribute).toEqual(null);
        expect(round.roundWinner).toEqual(null);
    });
    describe("addTurn", () => {
        it("should add a turn to the turns array", () => {
            round.addTurn("test", { name: "test", syntax: 1 });
            expect(round.turns.length).toEqual(1);
        });
        it("should throw an error if the turn is not a tuple with a string and an object", () => {
            expect(() => round.addTurn("test", "test")).toThrow(
                "Turn must be a tuple"
            );
        });
    });
    describe("defineWinner", () => {
        it("should set the round winner to the name of the player with the highest attribute value set in roundAttribute", () => {
            round.addTurn("test", { name: "test", syntax: 1 });
            round.addTurn("test2", { name: "test2", syntax: 2 });
            round.setRoundAttribute("syntax");
            round.defineWinner();
            expect(round.roundWinner).toEqual("test2");
        });
        it("should set the round winner to null if there is no winner", () => {
            round.addTurn("test", { name: "test", syntax: 1 });
            round.addTurn("test2", { name: "test2", syntax: 1 });
            round.setRoundAttribute("syntax");
            round.defineWinner();
            expect(round.roundWinner).toEqual(null);
        });
    });

    describe("setRoundAttribute", () => {
        it("should set the round attribute to the given attribute", () => {
            round.setRoundAttribute("syntax");
            expect(round.roundAttribute).toEqual("syntax");
        });
        it("should throw an error if the attribute is not a string", () => {
            expect(() => round.setRoundAttribute(1)).toThrow(
                "Attribute must be a string"
            );
        });
    });
    // describe("returnHistoryEntry", () => {
    //     it("should return the turns in the turns array and the round winnerr", () => {
    //         round.addTurn("test", { name: "test", syntax: 1 });
    //         round.addTurn("test2", { name: "test2", syntax: 2 });
    //         expect(round.returnHistoryEntry()).toEqual({
    //             turns: [
    //                 { player: "test", card: { name: "test", syntax: 1 } },
    //                 { player: "test2", card: { name: "test2", syntax: 2 } },
    //             ],
    //             winner: "test2",
    //         });
    //     });
    //     it("should return the turns in the turns array and null if there is no winner", () => {
    //         round.addTurn("test", { name: "test", syntax: 2 });
    //         round.addTurn("test2", { name: "test2", syntax: 2 });
    //         expect(round.returnHistoryEntry("syntax")).toEqual({
    //             turns: [
    //                 { player: "test", card: { name: "test", syntax: 1 } },
    //                 { player: "test2", card: { name: "test2", syntax: 2 } },
    //             ],
    //             winner: null,
    //         });
    //     });
    // });
    describe("returnRoundPot", () => {
        it("should return the cards in the turns array", () => {
            round.addTurn("test", { name: "test", syntax: 1 });
            round.addTurn("test2", { name: "test2", syntax: 2 });
            expect(round.returnRoundPot()).toEqual([
                { name: "test", syntax: 1 },
                { name: "test2", syntax: 2 },
            ]);
        });
    });
});
