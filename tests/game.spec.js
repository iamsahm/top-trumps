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
        it("should call the populateDeck, shuffle, deal and setLeadPlayer methods", () => {
            const game = new Game();
            game.addPlayer({ name: "test" });
            game.populateDeck = jest.fn();
            game.shuffle = jest.fn();
            game.deal = jest.fn();
            game.setLeadPlayer = jest.fn();
            game.start();
            expect(game.populateDeck).toHaveBeenCalled();
            expect(game.shuffle).toHaveBeenCalled();
            expect(game.deal).toHaveBeenCalled();
            expect(game.setLeadPlayer).toHaveBeenCalled();
        });
    });

    describe("setRoundAttribute", () => {
        it("should have a method to set the round attribute", () => {
            const game = new Game();
            expect(game.setRoundAttribute).toBeDefined();
        });
        it("should set the round attribute to the argument passed in", () => {
            const game = new Game();
            game.setRoundAttribute("syntax");
            expect(game.roundAttribute).toEqual("syntax");
        });
    });
    describe("playCard", () => {
        it("should have a method to play a card", () => {
            const game = new Game();
            expect(game.playCard).toBeDefined();
        });
        it("should remove the card from the player's hand", () => {
            const game = new Game();
            game.addPlayer({ name: "test" });
            game.start();
            const card = game.players[0].hand[0];
            game.playCard(0, 0);
            expect(game.players[0].hand).not.toContain(card);
        });
        it("should add the card to the pot", () => {
            const game = new Game();
            game.addPlayer({ name: "test" });
            game.start();
            expect(game.pot).toEqual([]);
            const card = game.players[0].hand[0];
            game.playCard(0, 0);
            expect(game.pot).toContain(card);
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
    describe("setLeadPlayer", () => {
        it("sets the lead player to the argument passed in", () => {
            const game = new Game();
            const player = { name: "test" };
            const player2 = { name: "test2" };
            game.addPlayer(player);
            game.addPlayer(player2);
            game.setLeadPlayer("test2");
            expect(game.leadPlayer).toEqual("test2");
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
    describe("round winner", () => {
        it("should have a method to determine the round winner", () => {
            const game = new Game();
            expect(game.roundWinner).toBeDefined();
        });
        it("should take arguments for the player's index and the index of the card they chose", () => {
            const game = new Game();
            game.addPlayer({ name: "test" });
            game.addPlayer({ name: "test2" });
            game.start();
            expect(typeof game.roundWinner("syntax", [0, 0], [1, 0])).toBe(
                "number"
            );
        });
        it("should return the index of the winning player", () => {
            const game = new Game();
            game.addPlayer({ name: "test" });
            game.addPlayer({ name: "test2" });
            game.start();
            game.players[0].hand[0]["syntax"] = 10;
            game.players[1].hand[0]["syntax"] = 1;
            expect(
                game.roundWinner(
                    "syntax",
                    [0, game.players[0].hand[0]],
                    [1, game.players[1].hand[0]]
                )
            ).toEqual(0);
        });
    });
    describe("assign winnings", () => {
        it("should have a method to assign the winnings to the winning player", () => {
            const game = new Game();
            expect(game.assignWinnings).toBeDefined();
        });
        it("should take argument for the winning player and add the pot to their hand", () => {
            const game = new Game();
            game.addPlayer({ name: "test" });
            game.addPlayer({ name: "test1" });
            game.start();
            const beforeWinningsHandLength = game.players[0].hand.length;
            const card = game.players[0].hand[0];
            game.playCard(0, 0);
            game.playCard(1, 0);
            game.assignWinnings(0);
            const afterWinningsHandLength = game.players[0].hand.length;
            expect(afterWinningsHandLength).toEqual(
                beforeWinningsHandLength + 1
            );
        });
    });
});
