describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("checks if the page loads successfully", () => {
    cy.get(".centering-wrapper").should("exist");
    cy.get(".custom-form-wrapper").should("exist");
  });

  it("fills out the form with valid email and password", () => {
    cy.get('input[name="email"]').type("vlad@gmail.com");
    cy.get('input[name="password"]').type("password123");
    cy.get(".btn.custom-button").click();
    cy.contains("Login successful").should("be.visible");
  });

  it("displays error message for invalid email format", () => {
    cy.get('input[name="email"]').type("invalidemail");
    cy.get('input[name="password"]').type("password123");
    cy.get(".btn.custom-button").click();
    cy.contains("Invalid email format").should("be.visible");
  });

  it("displays error message for empty password", () => {
    cy.get('input[name="email"]').type("vlad@gmail.com");
    cy.get(".btn.custom-button").click();
    cy.contains("Password is a required field").should("be.visible");
  });
});
