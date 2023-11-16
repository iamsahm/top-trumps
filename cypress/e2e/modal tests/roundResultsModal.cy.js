describe("round results modal", () => {
    describe("displays divs for the player cards", () => {
        beforeEach(() => {
            cy.visit("http://localhost:8080/"); // replace with your app's url
            cy.get("#player-name").type("Player-1");
            cy.get("#add-player-form").submit();
            cy.get("#player-name").type("Player-2");
            cy.get("#add-player-form").submit();
            cy.get("#end-game-setup").click();
        });
        it("loads the round results", () => {
            cy.get(".attributes").children().first().click();
            cy.get("#round-results").should("exist");
        });
        it("shows an h2 tag and the player names under each card", () => {
            cy.get(".attributes").children().first().click();
            cy.get("h2").should("exist");
            cy.get("#Player-1-card").should("contain", "Player-1");
            cy.get("#Player-2-card").should("contain", "Player-2");
        });
    });
});
