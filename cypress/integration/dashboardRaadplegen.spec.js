describe("Dashboard raadplegen:", () => {
  beforeEach(() => {
    cy.login("JanJansens", "123456789");
  });

  afterEach(() => {
    cy.logout();
  });

  it("controleer categorienaam", () => {
    cy.intercept("GET", `http://localhost:9000/api/categories/1`, {
      fixture: "categorie.json",
    });
    cy.intercept("GET", `http://localhost:9000/api/categories/2`, {
      fixture: "categorie.json",
    });
    cy.intercept("GET", `http://localhost:9000/api/categories/3`, {
      fixture: "categorie.json",
    });

    //cy.visit("http://localhost:3000/");
    //cy.wait(2000);

    cy.get("[data-cy=categorieClick]").eq(0).contains("Economie");
    cy.get("[data-cy=categorieClick]").eq(1).contains("Sociaal");
    cy.get("[data-cy=categorieClick]").eq(2).contains("Omgeving");
    cy.get("[data-cy=categorieClick]").eq(3).contains("Ecologie");
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
    cy.get("[data-cy=doelstellingNaam]").eq(2).contains("CO2NeutraalVervoer");
    cy.get("[data-cy=doelstellingNaam]")
      .eq(3)
      .contains("CO2-uitstoot transport");
  });
});
