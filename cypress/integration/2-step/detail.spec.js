/// <reference types="cypress" />
const port = process.env.BLOCKLET_PORT || process.env.PORT || 3000;

context('test detail', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:${port}/`);
  });

  // https://on.cypress.io/interacting-with-elements

  it('dom show', () => {
    cy.get('input')
      .type('00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa')
      .should('have.value', '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa')
      .type('{enter}');

    cy.get('article.ant-typography').should('be.visible');
    cy.get('ul.ant-pagination').should((el) => {
      expect(el.children()).have.length.above(3);
      if (el.children().length > 3) {
        el.children().last().click();
        expect(el.children('.ant-pagination-item-2')).have.class('ant-pagination-item-active');
      }
    });
  });
});
