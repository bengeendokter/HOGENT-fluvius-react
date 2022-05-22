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
  
      //klikken op template
      cy.get("[data-cy=label_rollen_beheren]").click();
      cy.wait(1000);
  
      //alle templates 'not visible' maken
      cy.get("[data-cy=template_rol]")
        .eq(0)
        .get("[data-cy=oog]")
        .eq(0)
        .click({ force: true });
  
      cy.get("[data-cy=template_rol]")
        .eq(1)
        .get("[data-cy=oog]")
        .eq(1)
        .click({ force: true });
  
      cy.get("[data-cy=template_rol]")
        .eq(2)
        .get("[data-cy=oog]")
        .eq(2)
        .click({ force: true });
  
      cy.get("[data-cy=template_rol]")
        .eq(3)
        .get("[data-cy=oog]")
        .eq(3)
        .click({ force: true });
  
      //dashboard controleren
      cy.get("[data-cy=label_dashboard]").click();
  
      cy.wait(1000);
  
      //templates zijn niet visible
      cy.get("[data-cy=dashboard_categorie]").get(0).should("not.exist");
    });
  });