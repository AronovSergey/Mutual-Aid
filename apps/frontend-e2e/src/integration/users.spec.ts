describe('Users Page', () => {
  it('should load user table', () => {
    cy.get('[ng-reflect-router-link="users"]').click();
    cy.get('.mat-table');
  });

  it('should display right column names', () => {
    cy.contains('Id');
    cy.contains('Name');
    cy.contains('Username');
    cy.contains('Email');
    cy.contains('Role');
  });

  it('should navigate to next page', () => {
    cy.get('[aria-label="Next page"]').click();
  });

  it('should filter users by Username', () => {
    cy.get('[data-placeholder="Search Username"]').type('Sergey');
    cy.get('.mat-table').find('.mat-row').should('have.length', 1);
  });
});
