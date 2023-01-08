// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html');
    });

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it('Preencha os campos obrigatórios e envia o formulário', function() {
        const LONGTEXT = 'Como ligar a TV e atualizar o WebOS para ter novas funcionalidades?';

        cy.get('#firstName').type('Alan');
        cy.get('#lastName').type('Alencar');
        cy.get('#email').type('alan.alencar@exemplo.com');
        cy.get('#open-text-area').type(LONGTEXT, { delay: 0 });
        cy.get('button[type="submit"]').click();
        
        cy.get('.success').should('be.visible');

    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Alan');
        cy.get('#lastName').type('Alencar');
        cy.get('#email').type('alan.alencar@exemplo,com');
        cy.get('#open-text-area').type('Preciso de ajuda para cadastrar um produto.');
        cy.get('button[type="submit"]').click();
        
        cy.get('.error').should('be.visible');
    });

    it('campo telefone continua vazio quando preenchido com caracteres não-numéricos', function() {
        cy.get('#phone')
            .type('abcdef ghi')
            .should('have.value','');
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Alan');
        cy.get('#lastName').type('Alencar');
        cy.get('#email').type('alan.alencar@exemplo.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('Preciso de ajuda para cadastrar um produto.');
        cy.get('button[type="submit"]').click();
        
        cy.get('.error').should('be.visible');
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Alan')
            .should('have.value', 'Alan')
            .clear()
            .should('have.value', '');
        cy.get('#lastName')
            .type('Alencar')
            .should('have.value', 'Alencar')
            .clear()
            .should('have.value', '');
        cy.get('#email')
            .type('alan.alencar@exemplo.com')
            .should('have.value', 'alan.alencar@exemplo.com')
            .clear()
            .should('have.value', '');
        cy.get('#phone')
            .type('11977653453')
            .should('have.value', '11977653453')
            .clear()
            .should('have.value', '');

    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click();
        
        cy.get('.error').should('be.visible');
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit();

        cy.get('.success').should('be.visible');
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube');
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria');
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog');
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback');
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', '3')
            .each(op => {
                cy.wrap(op).check();
                cy.wrap(op).should('be.checked');   
            });
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked');
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json');
            });
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json');
            });
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json')
            .as('arquivo');
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@arquivo')
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json');
            });
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank');
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click();
        cy.contains('a aplicação é um exemplo')
            .should('be.be.visible');
    });

  })
   