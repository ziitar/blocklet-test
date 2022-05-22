/// <reference types="cypress" />
const port = process.env.BLOCKLET_PORT || process.env.PORT || 3000;
// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('test home', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:${port}/`);
  });

  it('display log and input', () => {
    cy.get('input')
      .type('00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa')
      .should('have.value', '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa');
    cy.get('a.app-link').should('be.visible').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/detail');
    });
  });
});
