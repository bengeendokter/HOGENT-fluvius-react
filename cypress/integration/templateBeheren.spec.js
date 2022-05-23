describe("Rollen beheren:", () => {
  beforeEach(() => {
    cy.login("JanJansens", "123456789");
  });

  afterEach(() => {
    cy.logout();
  });

  it("should give template of MVO Coordinator with the options for visibility", () => {
    cy.intercept(
      "GET",
      `http://localhost:9000//api/templates/rol/MVO Coördinator`,
      {
        fixture: "templatesMVO.json",
      }
    );

    cy.intercept(
      "GET",
      `http://localhost:9000/api/templates/rol/MVO%20co%C3%B6rdinator`,
      {
        fixture: "templatesMVO.json",
      }
    );

    //klikken om te navigeren naar template pagina
    cy.get("[data-cy=label_rollen_beheren]").click();
    cy.wait(1000);

    //automatisch templates van de rol van ingelogde gebruiker (hier MVO Coordinator)
    cy.get("[data-cy=template_select]").should("contain", "MVO");
    cy.get("[data-cy=template_weergave]").should("contain", "Weergave MVO");

    //alle templates zijn 'visible' zodat ze beheerd kunnen worden
    cy.get("[data-cy=template_rol]")
      .eq(0)
      .get("[data-cy=oog]")
      .eq(0)
      .should("be.visible");

    cy.get("[data-cy=template_rol]")
      .eq(1)
      .get("[data-cy=oog]")
      .eq(1)
      .should("be.visible");

    cy.get("[data-cy=template_rol]")
      .eq(2)
      .get("[data-cy=oog]")
      .eq(2)
      .should("be.visible");

    cy.get("[data-cy=template_rol]")
      .eq(3)
      .get("[data-cy=oog]")
      .eq(3)
      .should("be.visible");
  });
});