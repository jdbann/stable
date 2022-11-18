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

  it("links to individual posts", () => {
    cy.visit("/posts");

    const post = posts[0];

    cy.get(`article[data-slug='${post.slug}'] a`).click();

    cy.contains("h1", post.title);
    cy.get("time").contains(post.created_at);
    cy.contains("p", post.body.replace(/\s+/g, " "));
  });
});
