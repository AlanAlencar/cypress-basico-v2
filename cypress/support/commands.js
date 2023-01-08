// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    const LONGTEXT = 'Como ligar a TV e atualizar o WebOS para ter novas funcionalidades?';

    cy.get('#firstName').type('Alan');
    cy.get('#lastName').type('Alencar');
    cy.get('#email').type('alan.alencar@exemplo.com');
    cy.get('#open-text-area').type(LONGTEXT, { delay: 0 });
    cy.contains('button', 'Enviar').click();
});