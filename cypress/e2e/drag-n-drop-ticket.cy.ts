import { keycode } from "cypress/util/keycodes";

describe("Drag and drop ticket", () => {
  beforeEach(() => {
    cy.task("resetDb");
    cy.visit("/");
  });

  describe("when dragged and dropped between different columns", () => {
    const ticketTitle = "Card created by cy";

    beforeEach(() => {
      cy.createTicket(ticketTitle);

      cy.get('[test-id="ticket-item"]')
        .first()
        .focus()
        .trigger("keydown", { keyCode: keycode.space })
        .trigger("keydown", { keyCode: keycode.arrowRight, force: true })
        .trigger("keydown", { keyCode: keycode.arrowRight, force: true })
        .wait(1000)
        .trigger("keydown", { keyCode: keycode.space, force: true });
    });

    it("should remove the ticket from the previous column", () => {
      cy.findColumnByName("Backlog").should("not.contain", ticketTitle);
    });

    it("should move the ticket to another column", () => {
      cy.findColumnByName("In review").should("contain", ticketTitle);
    });
  });

  afterEach(() => {
    cy.task("resetDb");
  });
});

export {};
