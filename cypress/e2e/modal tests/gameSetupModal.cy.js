describe("game setup modal", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8080/"); // replace with your app's url
    });

    it("loads the game setup", () => {
        cy.get("#add-player-form").should("exist");
        cy.get("#player-name").should("exist");
        cy.get("#player-list").should("exist");
        cy.get("#end-game-setup").should("exist");
    });

    it("adds a player", () => {
        cy.get("#player-name").type("Player 1");
        cy.get("#add-player-form").submit();
        cy.get("#player-list").should("contain", "Player list:");
        cy.get("#player-list").should("contain", "Player 1");
    });
    it("doesn't add a player if the name is blank", () => {
        cy.get("#add-player-form").submit();
        cy.get("#player-list").should("not.contain", "Player List:");
    });
    it("doesn't add a player if the name is the same as another player", () => {
        cy.get("#player-name").type("Player 1");
        cy.get("#add-player-form").submit();
        cy.get("#player-name").type("Player 1");
        cy.get("#add-player-form").submit();
        cy.get("#player-list").children().should("have.length", 1);
    });
    it("ends the game setup", () => {
        cy.get("#player-name").type("Player 1");
        cy.get("#add-player-form").submit();
        cy.get("#player-name").type("Player 2");
        cy.get("#add-player-form").submit();
        cy.get("#end-game-setup").click();
        cy.get("#game-setup").should("not.exist");
        cy.get("#game-play-area").should("exist");
    });
});
