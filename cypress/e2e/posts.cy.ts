describe("posts page", () => {
  it("loads", () => {
    cy.visit("/posts");
    cy.get("h1").contains("Posts");
  });
});
