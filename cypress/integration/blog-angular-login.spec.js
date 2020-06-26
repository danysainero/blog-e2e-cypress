/// <reference types="cypress" />
// support/commands.js

const COMMAND_DELAY = 500;

for (const command of ["visit", "click", "get", "type", "clear", "scrollTo"]) {
  Cypress.Commands.overwrite(command, (originalFn, ...args) => {
    const origVal = originalFn(...args);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(origVal);
      }, COMMAND_DELAY);
    });
  });
}

describe("Login", () => {
  before(() => {
    localStorage.clear();
  });

  it("login success", () => {
    cy.visit("http://localhost:4200/backoffice/login");
    cy.get("#userName").type("admin2");
    cy.get("#pass").type("1234");
    cy.get(".btn").click();
    cy.get(".btn-new-post").click();
    cy.get("#postTitle").type("Titulo de post con Cypress");
    cy.get("#postContent").type("Contenido del post");
    cy.get(".ui-button-success > .ui-button-text").click();
    cy.wait(1000);
    cy.get(
      '#post3 > p-card > .ui-card-shadow > .ui-card-header > .header > .header__header > div.ng-star-inserted > [icon="pi pi-trash"] > .ui-button-danger'
    ).click();
    cy.wait(1000);
    cy.scrollTo("bottom");
    cy.wait(1000);
    cy.get(
      'p-dialog.ng-tns-c7-4 > .ui-dialog-mask > .ng-trigger > .ui-dialog-footer > p-footer > [label="Delete"] > .ui-button-danger > .ui-button-text'
    ).click();
  });
});
