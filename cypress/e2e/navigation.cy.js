describe('Navbar Navigation Tests', () => {

    beforeEach(() => {
        cy.login();
        cy.visit("http://localhost:3000/Dashboard/zKnH8JZtg7VY27A0pMastZkb4Zo2"); 
    });

    it('should have a Log out button', () => {
        cy.get('button').contains('Log out').should('be.visible');
    });

    it('should navigate to Create Event on clicking the Create Event link', () => {
        cy.get('a').contains('Create Event').click();
        cy.url().should('include', '/CreateEvent/');
    });

});
