/// <reference types="cypress" />
// support/commands.js

const COMMAND_DELAY = 2000;

for (const command of [
  "visit",
  "click",
  "trigger",
  "type",
  "clear",
  "reload",
  "contains",
]) {
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
    cy.visit("http://localhost:8080/login");
    cy.get("#username").type("admin2");
    cy.get("#password").type("1234");
    cy.get(".login__button").click();
    cy.get(".p-button").click();
    cy.get("#postTitle").type("Titulo de post con Cypress");
    cy.get(".p-inputtextarea").type("Contenido del post");
    cy.get(".p-button-success").click();
    cy.get(".p-datatable-tbody > :last-child").click();
    cy.get(".p-button-danger").click();
  });
});
