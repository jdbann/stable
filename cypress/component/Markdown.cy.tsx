import { Markdown } from "../../components/Markdown";

const source = `
Lead paragraph.

Following paragraph.
`;

describe("Markdown.cy.ts", () => {
  it("applies classes to the first paragraph", () => {
    cy.mount(<Markdown source={source} />);

    cy.get("p:nth-child(1)")
      .should("have.text", "Lead paragraph.")
      .should("have.class", "lead");

    cy.get("p:nth-child(2)").should("have.text", "Following paragraph.");
  });
});
