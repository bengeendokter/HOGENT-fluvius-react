describe("Categorie raadplegen:", () => {
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

    cy.get("[data-cy=categorieClick]").eq(0).click();

    cy.get("[data-cy=naamCurrentCategorie]").contains("Sociaal");
  });

  it("toon bijbehorende doelstellingen", () => {

    cy.intercept("GET", `http://localhost:9000/api/categories/1`, {
      fixture: "categorie.json",
    });
    cy.intercept("GET", `http://localhost:9000/api/categories/2`, {
      fixture: "categorie.json",
    });
    cy.intercept("GET", `http://localhost:9000/api/categories/3`, {
      fixture: "categorie.json",
    });

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

    cy.get("[data-cy=categorieClick]").eq(0).click();

    cy.get("[data-cy=doelstellingNaam]").contains("Bijscholingen personeel");
  });
});
