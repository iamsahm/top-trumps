const Game = require("../src/game_logic/game");
const languages = require("../src/data/languages.json");
let game;
describe("Game", () => {
    beforeEach(() => {
        game = new Game();
    });
    it("should be defined", () => {
        expect(Game).toBeDefined();
    });
    it("should construct with an empty deck, players array, boolean isGameOver, null leadPlayer, null roundAttribute, round history array", () => {
        expect(game.deck).toEqual([]);
        expect(game.players).toEqual([]);
        expect(game.gameOver).toEqual(false);
        expect(game.leadPlayer).toEqual(null);
        expect(game.pot).toEqual([]);
        expect(game.roundHistory).toEqual([]);
    });
    describe("populateDeck", () => {
        it("should have a populate deck method", () => {
            expect(game.populateDeck).toBeDefined();
        });
        it("should populate the deck with cards from the languages.json file", () => {
            game.populateDeck();
            expect(game.deck.length).toEqual(languages.length);
        });
        it("should add card objects to the deck", () => {
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
            expect(game.reset).toBeDefined();
        });
        it("should reset the deck, players, gameover and lead player", () => {
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
            game.populateDeck();
            const originalDeck = [...game.deck];
            game.shuffle();
            expect(game.deck).not.toEqual(originalDeck);
        });
    });
    describe("deal", () => {
        it("should distribute cards to players", () => {
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
            expect(game.start).toBeDefined();
        });
        it("should call the populateDeck, shuffle, deal and set the lead player to the first player in the array", () => {
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
            expect(game.addPlayer).toBeDefined();
        });
        it("should add players to the players array", () => {
            const player = { name: "test" };
            game.addPlayer(player);
            expect(game.players).toEqual([player]);
        });
        it("should not add anything other than players to the players array", () => {
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
            const player = { name: "test" };
            const player2 = { name: "test", hand: [] };
            game.addPlayer(player);
            expect(game.players).toEqual([player]);
            game.addPlayer(player2);
            expect(game.players).toEqual([player]);
        });
    });
    describe("isGameOver", () => {
        it("should have a method to determine if the game is over", () => {
            expect(game.isGameOver).toBeDefined();
        });
        it("should return true if all but one player has no cards", () => {
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
            game.addPlayer({ name: "test" });
            game.addPlayer({ name: "test2" });
            game.start();
            game.players[0].hand[0].name = "JavaScript";
            expect(game.getDecisionCard()).toEqual(game.players[0].hand[0]);
        });
    });
    describe("getActivePlayers", () => {
        it("returns the players who have cards in their hand", () => {
            game.addPlayer({ name: "test" });
            game.addPlayer({ name: "test2" });
            game.start();
            game.players[0].hand = [];
            expect(game.getActivePlayers()).toEqual([game.players[1]]);
        });
    });
    describe("returnPreviousRoundResults", () => {
        it("returns the previous round results", () => {
            game.addPlayer({ name: "test" });
            game.addPlayer({ name: "test2" });
            game.start();
            game.players[0].hand[0].syntax = 2;
            game.players[1].hand[0].syntax = 1;
            game.playRound("syntax");
            expect(game.roundHistory.length).toEqual(1);
            expect(game.roundHistory[0].turns.length).toEqual(2);
            expect(game.roundHistory[0].resultString).toEqual(`test wins!`);
        });
    });

    describe("playRound", () => {
        it("takes the first card from each player's hand and attributes them to the winner", () => {
            game.addPlayer({ name: "test" });
            game.addPlayer({ name: "test2" });
            game.start();
            player1HandLength = game.players[0].hand.length;
            player2HandLength = game.players[1].hand.length;
            game.players[0].hand[0].syntax = 2;
            game.players[1].hand[0].syntax = 1;
            game.playRound("syntax");

            expect(game.players[0].hand.length).toEqual(player1HandLength + 1);
            expect(game.players[1].hand.length).toEqual(player2HandLength - 1);
        });
        it("adds the cards to the pot in the case of a draw", () => {
            game.addPlayer({ name: "test" });
            game.addPlayer({ name: "test2" });
            game.start();
            game.players[0].hand[0].syntax = 1;
            game.players[1].hand[0].syntax = 1;
            player1Card = game.players[0].hand[0];
            player2Card = game.players[1].hand[0];
            game.playRound("syntax");
            expect(game.pot).toEqual([player1Card, player2Card]);
        });
        it("an element to the roundHistory array", () => {
            game.addPlayer({ name: "test" });
            game.addPlayer({ name: "test2" });
            game.start();
            game.players[0].hand[0].syntax = 2;
            game.players[1].hand[0].syntax = 1;
            game.playRound("syntax");
            expect(game.roundHistory.length).toEqual(1);
        });
        it("throws an error if no attribute is passed", () => {
            game.addPlayer({ name: "test" });
            game.addPlayer({ name: "test2" });
            game.start();
            expect(() => game.playRound()).toThrow("must choose an attribute");
        });
        it("clears the pot if there's a winner", () => {
            game.addPlayer({ name: "test" });
            game.addPlayer({ name: "test2" });
            game.start();
            game.players[0].hand[0].syntax = 2;
            game.players[1].hand[0].syntax = 1;
            game.playRound("syntax");
            expect(game.pot).toEqual([]);
        });
    });
});
