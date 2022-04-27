describe('Dashboard raadplegen:', () => {
  
  it('controleer categorienaam', () => {
		cy.intercept(
			"GET",
			`http://localhost:9000/api/categories/1`,
			{ fixture: 'categorie.json' }
		);
		cy.intercept(
			"GET",
			`http://localhost:9000/api/categories/2`,
			{ fixture: 'categorie.json' }
		);
		cy.intercept(
			"GET",
			`http://localhost:9000/api/categories/3`,
			{ fixture: 'categorie.json' }
		);

    cy.visit("http://localhost:3000/");

    cy.get("[data-cy=categorieClick]").eq(0).contains("Economie");
		cy.get("[data-cy=categorieClick]").eq(1).contains("Sociaal");
		cy.get("[data-cy=categorieClick]").eq(2).contains("Omgeving");
	});

	it('toon bijbehorende doelstellingen', () => {
		cy.intercept(
			"GET",
			`http://localhost:9000/api/doelstellingen/categorie/1`,
			{ fixture: 'doelstellingenCategorie1.json' }
		);
		cy.intercept(
			"GET",
			`http://localhost:9000/api/doelstellingen/categorie/2`,
			{ fixture: 'doelstellingenCategorie2.json' }
		);
		cy.intercept(
			"GET",
			`http://localhost:9000/api/doelstellingen/categorie/3`,
			{ fixture: 'doelstellingenCategorie3.json' }
		);

    cy.visit("http://localhost:3000/");

    cy.get("[data-cy=doelstellingNaam]").eq(0).contains("Aantal kinderen");
		cy.get("[data-cy=doelstellingNaam]").eq(1).contains("doel sociaal");
		cy.get("[data-cy=doelstellingNaam]").eq(2).contains("CO2NeutraalVervoer");

	});
  
});