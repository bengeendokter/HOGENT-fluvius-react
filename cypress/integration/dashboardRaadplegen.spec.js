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

  it("toon bijbehorende doelstellingen", () => {
    cy.intercept(
      "GET",
      `http://localhost:9000/api/doelstellingen/categorie/1`,
      { fixture: "doelstellingenCategorie1.json" }
    );
    cy.intercept(
      "GET",
      `http://localhost:9000/api/doelstellingen/categorie/2`,
      { fixture: "doelstellingenCategorie2.json" }
    );
    cy.intercept(
      "GET",
      `http://localhost:9000/api/doelstellingen/categorie/3`,
      { fixture: "doelstellingenCategorie3.json" }
    );

    cy.get("[data-cy=doelstellingNaam]")
      .eq(0)
      .contains("Steun aan goede doelen");
    cy.get("[data-cy=doelstellingNaam]")
      .eq(1)
      .contains("Bijscholingen personeel");
    cy.get("[data-cy=doelstellingNaam]")
    .eq(2).contains("CO2NeutraalVervoer");
    cy.get("[data-cy=doelstellingNaam]")
      .eq(3)
      .contains("Aantal klanten");
  });
});
