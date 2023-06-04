import "@testing-library/cypress/add-commands";
describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/home");
  });

  it("checks if the elements exist and scale on hover", () => {
    cy.get(".element-to-check").should("exist");

    // Перевірка збільшення масштабу при наведенні на елемент
    cy.get(".element-to-check")
      .invoke("css", "transform")
      .should("eq", "matrix(1, 0, 0, 1, 0, 0)"); // Перевірка початкового масштабу

    cy.get(".element-to-check")
      .trigger("mouseover")
      .invoke("css", "transform")
      .should("eq", "matrix(1.1, 0, 0, 1.1, 0, 0)"); // Перевірка збільшеного масштабу при наведенні

    cy.get(".element-to-check")
      .trigger("mouseout")
      .invoke("css", "transform")
      .should("eq", "matrix(1, 0, 0, 1, 0, 0)"); // Перевірка повернення до початкового масштабу
  });
});
