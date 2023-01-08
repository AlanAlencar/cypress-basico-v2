it.only('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html');
    cy.contains('a aplicação é um exemplo')
        .should('be.be.visible');
});