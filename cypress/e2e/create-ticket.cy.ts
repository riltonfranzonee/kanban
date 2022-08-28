describe("Create Ticket", () => {
  beforeEach(() => {
    cy.task("resetDb");
    cy.visit("/");
  });

  describe("when the user attempts to create a new ticket", () => {
    it("should add a new ticket to the list", () => {
      const newTicketTitle = "Card created by cy";

      cy.createTicket(newTicketTitle);

      cy.get('[test-id="ticket-title"]').contains(newTicketTitle);
    });
  });

  afterEach(() => {
    cy.task("resetDb");
  });
});

export {};
