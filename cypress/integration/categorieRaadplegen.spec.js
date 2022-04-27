describe('Categorie raadplegen:', () => {
  
  it('controleer categorienaam', () => {
		cy.intercept(
			"GET",
			`http://localhost:9000/api/categories/1`,
			{ fixture: 'categorie.json' }
		);

    cy.visit("http://localhost:3000/");
    cy.get("[data-cy=categorieClick]").eq(0).click();

    cy.get("[data-cy=naamCurrentCategorie]").contains("Economie");
	});

	it('toon bijbehorende doelstellingen', () => {
		cy.intercept(
			"GET",
			`http://localhost:9000/api/doelstellingen/categorie/1`,
			{ fixture: 'doelstellingenCategorie1.json' }
		);

    cy.visit("http://localhost:3000/");
    cy.get("[data-cy=categorieClick]").eq(0).click();

    cy.get("[data-cy=doelstellingNaam]").contains("Aantal kinderen");

	});
  
});