describe('Latest Events Tests', () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000/Dashboard/zKnH8JZtg7VY27A0pMastZkb4Zo2"); 
    });

    it('should have latest events', () => {
        cy.get('h1').contains('Latest Events').should('be.visible');
    });

});
