import "@testing-library/cypress/add-commands";
describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("checks if the elements exist and scale on hover", () => {
    cy.get(".home-wrapper").should("exist");

    // Перевірка збільшення масштабу при наведенні на елемент
    cy.get(".home-wrapper")
      .invoke("css", "transform")
      .should("eq", "matrix(1, 0, 0, 1, 0, 0)"); // Перевірка початкового масштабу

    cy.get(".home-wrapper")
      .trigger("mouseover")
      .invoke("css", "transform")
      .should("eq", "matrix(1.1, 0, 0, 1.1, 0, 0)"); // Перевірка збільшеного масштабу при наведенні

    cy.get(".home-wrapper")
      .trigger("mouseout")
      .invoke("css", "transform")
      .should("eq", "matrix(1, 0, 0, 1, 0, 0)"); // Перевірка повернення до початкового масштабу
  });
});

