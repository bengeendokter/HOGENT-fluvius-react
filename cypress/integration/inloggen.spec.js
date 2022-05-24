describe("Inloggen:", () => {
  it("met correcte gegevens", () => {
    cy.login("JanJansens", "123456789");

    cy.intercept("GET", `http://localhost:9000/api/categories/1`, {
      fixture: "categorie.json",
    });
    cy.intercept("GET", `http://localhost:9000/api/categories/2`, {
      fixture: "categorie.json",
    });
    cy.intercept("GET", `http://localhost:9000/api/categories/3`, {
      fixture: "categorie.json",
    });

    cy.logout();
  });

  it("met foutieve gegevens", () => {
    cy.login("Test", "1234");

    cy.intercept("GET", `http://localhost:9000/api/categories/1`, {
      fixture: "categorie.json",
    });
    cy.intercept("GET", `http://localhost:9000/api/categories/2`, {
      fixture: "categorie.json",
    });
    cy.intercept("GET", `http://localhost:9000/api/categories/3`, {
      fixture: "categorie.json",
    });

    cy.get("[data-cy=login-error]").should("be.visible");
  });
});
