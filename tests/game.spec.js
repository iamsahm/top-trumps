const Game = require("../src/game");
const languages = require("../src/data/languages.json");

describe("Game", () => {
    it("should be defined", () => {
        expect(Game).toBeDefined();
    });
    it("should construct with an empty deck", () => {
        const game = new Game();
        expect(game.deck).toEqual([]);
    });
    it("should construct with an empty players array", () => {
        const game = new Game();
        expect(game.players).toEqual([]);
    });
    describe("populateDeck", () => {
        it("should have a populate deck method", () => {
            const game = new Game();
            expect(game.populateDeck).toBeDefined();
        });
        it("should populate the deck with cards from the languages.json file", () => {
            const game = new Game();
            game.populateDeck();
            expect(game.deck.length).toEqual(languages.length);
        });
        it("should add card objects to the deck", () => {
            const game = new Game();
            game.populateDeck();
            expect(game.deck[0]).toEqual(
                expect.objectContaining({
                    name: expect.any(String),
                    syntax: expect.any(Number),
                    performance: expect.any(Number),
                    portability: expect.any(Number),
                    community: expect.any(Number),
                    longevity: expect.any(Number),
                    ecosystem: expect.any(Number),
                    fact: expect.any(String),
                })
            );
        });
    });
    describe("shuffle", () => {
        it("should randomize the order of the deck", () => {
            const game = new Game();
            game.populateDeck();
            const originalDeck = [...game.deck];
            game.shuffle();
            expect(game.deck).not.toEqual(originalDeck);
        });
    });
    describe("deal", () => {
        it("should distribute cards to players", () => {
            const game = new Game();
            game.populateDeck();
            game.shuffle();
            game.addPlayer({ name: "test" });
            game.addPlayer({ name: "test2" });
            const handLength = Math.floor(
                game.deck.length / game.players.length
            );
            game.deal();
            expect(game.players[0].hand.length).toEqual(handLength);
            expect(game.players[1].hand.length).toEqual(handLength);
        });
    });
    describe("start", () => {
        it("should have a method to start the game", () => {
            const game = new Game();
            expect(game.start).toBeDefined();
        });
    });
    describe("addPlayer", () => {
        it("should have a method to add players", () => {
            const game = new Game();
            expect(game.addPlayer).toBeDefined();
        });
        it("should add players to the players array", () => {
            const game = new Game();
            const player = { name: "test" };
            game.addPlayer(player);
            expect(game.players).toEqual([player]);
        });
        it("should not add anything other than players to the players array", () => {
            const game = new Game();
            const player = { name: "test" };
            game.addPlayer(player);
            expect(game.players).toEqual([player]);
            game.addPlayer("test");
            expect(game.players).toEqual([player]);
            game.addPlayer(1);
            expect(game.players).toEqual([player]);
            game.addPlayer(true);
            expect(game.players).toEqual([player]);
        });
        it("should not allow duplicate players", () => {
            const game = new Game();
            const player = { name: "test" };
            game.addPlayer(player);
            expect(game.players).toEqual([player]);
            game.addPlayer(player);
            expect(game.players).toEqual([player]);
        });
    });
});
