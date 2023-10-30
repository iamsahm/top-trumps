// jest test the card component

const Card = require("../src/card");

describe("Card", () => {
    it("should be defined", () => {
        expect(Card).toBeDefined();
    });
    it("should construct with a name", () => {
        const card = new Card("test");
        expect(card.name).toBe("test");
    });
    it("should construct with values of 0-100 for syntax, performance, portability, community, longevity and ecosystem", () => {
        const card = new Card("test");
        expect(card.syntax).toBeGreaterThanOrEqual(0);
        expect(card.syntax).toBeLessThanOrEqual(100);
        expect(card.performance).toBeGreaterThanOrEqual(0);
        expect(card.performance).toBeLessThanOrEqual(100);
        expect(card.portability).toBeGreaterThanOrEqual(0);
        expect(card.portability).toBeLessThanOrEqual(100);
        expect(card.community).toBeGreaterThanOrEqual(0);
        expect(card.community).toBeLessThanOrEqual(100);
        expect(card.longevity).toBeGreaterThanOrEqual(0);
        expect(card.longevity).toBeLessThanOrEqual(100);
        expect(card.ecosystem).toBeGreaterThanOrEqual(0);
        expect(card.ecosystem).toBeLessThanOrEqual(100);
    });
    it("should throw an error if name is not a string", () => {
        expect(() => {
            new Card(1);
        }).toThrow();
    });
});
