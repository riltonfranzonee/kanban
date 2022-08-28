/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

Cypress.Commands.add("createTicket", (ticketName: string) => {
  cy.get('[test-id="add-ticket-btn"]').first().click();
  cy.get('[test-id="title-input"]').type(ticketName);
  cy.get('[test-id="save-ticket-btn"]').first().click();
});

Cypress.Commands.add(
  "updateTicket",
  (oldTicketName: string, ticketName: string) => {
    cy.get('[test-id="ticket-title"]').contains(oldTicketName).first().click();
    cy.get('[test-id="title-input"]').clear().type(ticketName);
    cy.get('[test-id="save-ticket-btn"]').first().click();
  }
);

Cypress.Commands.add("findTicketByName", (ticketName: string) => {
  return cy.get('[test-id="ticket-title"]').contains(ticketName);
});

Cypress.Commands.add("findColumnByName", (columnName: string) => {
  return cy.get('[test-id="status-column"]').contains(columnName).parent();
});

declare global {
  namespace Cypress {
    interface Chainable {
      createTicket(ticketName: string): Chainable<void>;
      updateTicket(
        oldTicketName: string,
        newTicketName: string
      ): Chainable<void>;
      findTicketByName(ticketName: string): Chainable;
      findColumnByName(columnName: string): Chainable;
    }
  }
}

export {};
