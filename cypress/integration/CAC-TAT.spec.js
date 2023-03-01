///<reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html');
    })    
    it.skip('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName').type('João')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('joao');
        cy.get('#lastName').type('santos');
        cy.get('#email').type('joaovictor93@outlook.com.br');
        cy.get('#open-text-area').type('dúvidas');
        cy.contains('button','Enviar').click();

        cy.get('.success').should('be.visible');
    })
    it('Exercício extra 1', function(){
        cy.get('#open-text-area').type('testando como fazer o teste com delay automatizado e curtir uma vitoria simbolica pois a vida e curta e merece ser curtida',({delay:0}));
        cy.contains('button','Enviar').click();
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#email').type('joaovictor93outlook.com.br');
        cy.get('.button').click();
        cy.get('.error').should('be.visible');
    })
    it('Exercício extra 3 verificando campo vazio',function(){
        cy.get('#phone')
         .type('abcdfgh').should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#phone-checkbox').click()
        cy.get('.button').click();
        cy.get('.error').should('be.visible');
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName').type('joao').should('have.value','joao').clear().should('have.value','')
        cy.get('#lastName').type('santos').should('have.value','santos').clear().should('have.value','')
        cy.get('#email').type('joaovictor93@outlook.com.br').should('have.value','joaovictor93@outlook.com.br').clear().should('have.value','')
        cy.get('#phone').type('81996186344').should('have.value','81996186344').clear().should('have.value','')
        
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible');
    })
    it('envia o formuário com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible');
    })
    it('Exercício extra 8',function(){
        cy.contains('button','Enviar').click()
    })
    it('select random',function(){
        cy.get('select option')
        .its('length',{log: false}).then(n=> {
            cy.get('select').select(Cypress._.random(n-1))
        })
    })
    it('seleciona um produto (YouTube) por seu texto',function(){
        cy.get('#product').select('YouTube');
        cy.get('#product').should('have.value','youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)',function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria');
    })
    it('seleciona um produto (Blog) por seu índice',function(){
        cy.get('#product').select(1).should('have.value', 'blog');;
    })
    it('marca o tipo de atendimento "Feedback"',function(){
        cy.get(':nth-child(4) > input').check().should('have.value','feedback');
    })
    it.only('marca cada tipo de atendimento',function(){
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
  })
  