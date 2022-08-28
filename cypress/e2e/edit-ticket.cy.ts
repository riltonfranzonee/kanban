describe("Edit Ticket", () => {
  beforeEach(() => {
    cy.task("resetDb");
    cy.visit("/");
  });

  describe("when the user hits save after changing the ticket name", () => {
    it("should update the ticket on the list", () => {
      cy.wait(1000).then(() => {
        const initialName = "Card created by cy";

        cy.createTicket(initialName);

        const updatedName = "Card updated by cy";

        cy.updateTicket(initialName, updatedName);

        cy.findTicketByName(updatedName);
      });
    });
  });

  afterEach(() => {
    cy.task("resetDb");
  });
});

export {};
