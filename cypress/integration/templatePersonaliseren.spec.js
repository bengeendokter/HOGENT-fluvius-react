describe("Templates personaliseren:", () => {
  beforeEach(() => {
    cy.login("JanJansens", "123456789");
  });

  afterEach(() => {
    cy.logout();
  });

  it("should show correct templates for that role", () => {
    //inloggen als coordinator
    //ziet alleen templates van coordinator
    cy.get("[data-cy=label_personaliseren]").click();
    cy.wait(1000);
    cy.get("[data-cy=naam_rol_template]").should("contain", "Template MVO");
  });
});