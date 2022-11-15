import posts from "../fixtures/posts.json";

describe("posts page", () => {
  it("loads the list of posts", () => {
    cy.visit("/posts");

    cy.get("h1").should("contain.text", "Posts");

    posts.forEach((post) => {
      cy.get(`article[data-slug='${post.slug}']`).should(($article) => {
        expect($article.find("h2")).to.contain(post.title);
        expect($article.find("time")).to.contain(post.created_at);
        expect($article.find("p")).to.contain(post.summary);
      });
    });
  });
});
