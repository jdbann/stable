describe("home page", () => {
  it("loads", () => {
    cy.visit("/");
    cy.get("h1").contains("emailaddress.horse");
  });
});
