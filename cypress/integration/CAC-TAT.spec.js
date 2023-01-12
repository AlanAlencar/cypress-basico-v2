// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const TREE_SECONDS_IN_MS = 3000;
    beforeEach(function() {
        cy.visit('./src/index.html');
    });

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it('Preencha os campos obrigatórios e envia o formulário', function() {
        const LONGTEXT = 'Como ligar a TV e atualizar o WebOS para ter novas funcionalidades?';

        // congelar o relógio do navegador.
        cy.clock();
        cy.get('#firstName').type('Alan');
        cy.get('#lastName').type('Alencar');
        cy.get('#email').type('alan.alencar@exemplo.com');
        cy.get('#open-text-area').type(LONGTEXT, { delay: 0 });
        cy.get('button[type="submit"]').click();
        
        cy.get('.success').should('be.visible');
        
        // Avança 3 segundos no relógio, porque o JS da página conta 3 segundos antes de sumir.
        cy.tick(TREE_SECONDS_IN_MS);
        cy.get('.success').should('not.be.visible');

    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.clock();
        cy.get('#firstName').type('Alan');
        cy.get('#lastName').type('Alencar');
        cy.get('#email').type('alan.alencar@exemplo,com');
        cy.get('#open-text-area').type('Preciso de ajuda para cadastrar um produto.');
        cy.get('button[type="submit"]').click();
        
        cy.get('.error').should('be.visible');
        cy.tick(TREE_SECONDS_IN_MS);
        cy.get('.error').should('not.be.visible');
    });

    Cypress._.times(5, () => { 
        it('campo telefone continua vazio quando preenchido com caracteres não-numéricos', function() {
            cy.get('#phone')
                .type('abcdef ghi')
                .should('have.value','');
        });
    });
    

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock();
        cy.get('#firstName').type('Alan');
        cy.get('#lastName').type('Alencar');
        cy.get('#email').type('alan.alencar@exemplo.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('Preciso de ajuda para cadastrar um produto.');
        cy.get('button[type="submit"]').click();
        
        cy.get('.error').should('be.visible');
        cy.tick(TREE_SECONDS_IN_MS);
        cy.get('.error').should('not.be.visible');
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
        cy.clock();
        cy.get('button[type="submit"]').click();
        
        cy.get('.error').should('be.visible');
        cy.tick(TREE_SECONDS_IN_MS);
        cy.get('.error').should('not.be.visible');
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.clock();
        cy.fillMandatoryFieldsAndSubmit();

        cy.get('.success').should('be.visible');
        cy.tick(TREE_SECONDS_IN_MS);
        cy.get('.success').should('not.be.visible');
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

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible');
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible');
    });

    it('preenche a area de texto usando o comando invoke', () => {
        const TEXT = Cypress._.repeat('Alan ', 100);
        cy.get('#open-text-area')
            .invoke('val', TEXT)
            .should('have.value', TEXT);
    });

    it('faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(response => {
                const { status, statusText, body } = response;
                expect(status).to.equal(200);
                expect(statusText).to.equal('OK');
                //expect(body).to.include('CAC TAT');
                expect(body).contain('CAC TAT');
            });
    });

    it.only('encontre e exiba o gato', () => {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible');
        cy.get('#title')
            .invoke('text', 'CAT TAT');

    });

  });
