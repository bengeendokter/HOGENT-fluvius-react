describe("Dashboard raadplegen:", () => {
  beforeEach(() => {
    cy.login("JanJansens", "123456789");
  });

  afterEach(() => {
    cy.logout();
  });

  it("er is minstens 1 categorie beschikbaar", () => {

    cy.get("[data-cy=categorieClick]").should("exist");
    
  });

  
});
