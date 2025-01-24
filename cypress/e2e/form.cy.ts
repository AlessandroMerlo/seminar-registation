describe('Form Flow Integration Test', () => {
    beforeEach(() =>
        cy.visit('http://localhost:9090/')
    );

    it('should complete the form flow successfully and reset the form', () => {
        cy.get('[data-cy="attendee-number-select"]').select('3');
        cy.get('[data-cy="attendee-name-input-1"]').type('John Doe');
        cy.get('[data-cy="attendee-name-input-2"]').type('Jane Smith');
        cy.get('[data-cy="attendee-name-input-3"]').type('Alice Brown');

        cy.get('[data-cy="badges-radio-on"]').check();
        cy.get('[data-cy="company-name-input"]').type('Subito.it');
        cy.get('[data-cy="accommodation-radio-off"]').check();

        cy.get('[data-cy="is-rock-checkbox"]').check();
        cy.get('[data-cy="complete-registration"]').click();

        cy.get('[data-cy="attendee-number-select"]').should('have.value', '');
        cy.get('[data-cy="attendee-name-input-1"]').should('not.exist');
        cy.get('[data-cy="attendee-name-input-2"]').should('not.exist');
        cy.get('[data-cy="attendee-name-input-3"]').should('not.exist');

        cy.get('[data-cy="badges-radio-on"]').should('not.be.checked');
        cy.get('[data-cy="company-name-input"]').should('have.css', 'visibility', 'hidden');
        cy.get('[data-cy="company-name-input"]').should('have.value', '');
        cy.get('[data-cy="accommodation-radio-off"]').should('not.be.checked');

        cy.get('[data-cy="is-rock-checkbox"]').should('not.be.checked');
        cy.get('[data-cy="complete-registration"]').should('be.disabled');
    });

    it('should validate that Step 2 cannot be accessed without Step 1 completed', () => {
        cy.get('[data-cy="badges-radio-on"]').should('have.css', 'pointer-events', 'none');
    });

});