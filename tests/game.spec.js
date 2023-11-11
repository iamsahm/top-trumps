const Game = require("../src/game");
const languages = require("../src/data/languages.json");

describe("Game", () => {
    it("should be defined", () => {
        expect(Game).toBeDefined();
    });
    it("should construct with an empty deck, players array, boolean isGameOver, null leadPlayer, null roundAttribute", () => {
        const game = new Game();
        expect(game.deck).toEqual([]);
        expect(game.players).toEqual([]);
        expect(game.gameOver).toEqual(false);
        expect(game.leadPlayer).toEqual(null);
        expect(game.pot).toEqual([]);
        expect(game.roundAttribute).toEqual(null);
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
    describe("reset", () => {
        it("should have a method to reset the game", () => {
            const game = new Game();
            expect(game.reset).toBeDefined();
        });
        it("should reset the deck, players, gameover and lead player", () => {
            const game = new Game();
            game.populateDeck();
            game.addPlayer({ name: "test" });
            game.addPlayer({ name: "test2" });
            game.start();
            game.reset();
            expect(game.deck).toEqual([]);
            expect(game.players).toEqual([]);
            expect(game.gameOver).toEqual(false);
            expect(game.leadPlayer).toEqual(null);
            expect(game.pot).toEqual([]);
            expect(game.roundAttribute).toEqual(null);
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
        it("should call the populateDeck, shuffle, deal and set the lead player to the first player in the array", () => {
            const game = new Game();
            game.addPlayer({ name: "test" });
            game.populateDeck = jest.fn();
            game.shuffle = jest.fn();
            game.deal = jest.fn();
            game.start();
            expect(game.populateDeck).toHaveBeenCalled();
            expect(game.shuffle).toHaveBeenCalled();
            expect(game.deal).toHaveBeenCalled();
            expect(game.leadPlayer).toEqual("test");
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
    describe("isGameOver", () => {
        it("should have a method to determine if the game is over", () => {
            const game = new Game();
            expect(game.isGameOver).toBeDefined();
        });
        it("should return true if all but one player has no cards", () => {
            const game = new Game();
            game.addPlayer({ name: "test" });
            game.addPlayer({ name: "test2" });
            game.addPlayer({ name: "test3" });
            game.addPlayer({ name: "test4" });
            game.start();
            game.players[0].hand = [];
            game.players[1].hand = [];
            game.players[2].hand = [];
            expect(game.isGameOver()).toEqual(true);
        });
    });
    describe("getDecisionCard", () => {
        it("should return the first card of the lead player's hand", () => {
            const game = new Game();
            game.addPlayer({ name: "test" });
            game.addPlayer({ name: "test2" });
            game.start();
            game.players[0].hand[0].name = "JavaScript";
            expect(game.getDecisionCard()).toEqual(game.players[0].hand[0]);
        });
    });
    describe("chooseAttribute", () => {
        it("takes the attribute name and sets the round attribute to that attribute", () => {
            const game = new Game();
            game.chooseAttribute("syntax");
            expect(game.roundAttribute).toEqual("syntax");
        });
        it("should throw an error if the attribute is not a string", () => {
            const game = new Game();
            expect(() => game.chooseAttribute(1)).toThrow(
                "Attribute must be a string"
            );
        });
    });
    describe("playRound", () => {
        it("adds the cards to a winner's hand and empties the pot", () => {
            const game = new Game();
            game.addPlayer({ name: "test" });
            game.addPlayer({ name: "test2" });
            game.start();
            const player1HandLengthBefore = game.players[0].hand.length;
            const player2HandLengthBefore = game.players[1].hand.length;
            game.players[0].hand[0].syntax = 2;
            game.players[1].hand[0].syntax = 1;
            game.chooseAttribute("syntax");
            game.playRound();
            const player1HandLengthAfter = game.players[0].hand.length;
            const player2HandLengthAfter = game.players[1].hand.length;
            expect(player1HandLengthAfter).toEqual(player1HandLengthBefore + 1);
            expect(player2HandLengthAfter).toEqual(player2HandLengthBefore - 1);
            expect(game.pot).toEqual([]);
        });
        describe("in the case of a draw", () => {
            let game;
            let player1HandLengthBefore;
            let player1HandLengthAfter;
            let player2HandLengthBefore;
            let player2HandLengthAfter;
            beforeEach(() => {
                game = new Game();
                game.addPlayer({ name: "test" });
                game.addPlayer({ name: "test2" });
                game.start();
                player1HandLengthBefore = game.players[0].hand.length;
                player2HandLengthBefore = game.players[1].hand.length;
                game.players[0].hand[0].syntax = 1;
                game.players[1].hand[0].syntax = 1;
                game.chooseAttribute("syntax");
                game.playRound();
                player1HandLengthAfter = game.players[0].hand.length;
                player2HandLengthAfter = game.players[1].hand.length;
            });
            it("adds the cards to the game pot", () => {
                expect(player1HandLengthAfter).toEqual(
                    player1HandLengthBefore - 1
                );
                expect(player2HandLengthAfter).toEqual(
                    player2HandLengthBefore - 1
                );
                expect(game.pot.length).toEqual(2);
            });
            it("attributes the pot plus the new round to the winner", () => {
                game.players[0].hand[0].syntax = 2;
                game.players[1].hand[0].syntax = 1;
                game.chooseAttribute("syntax");
                game.playRound();
                expect(game.players[0].hand.length).toEqual(
                    player1HandLengthBefore + 2
                );
                expect(game.players[1].hand.length).toEqual(
                    player2HandLengthBefore - 2
                );
                expect(game.pot).toEqual([]);
            });
        });
    });
});
