
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "../test-utils/test-utils";
import { CheckBox } from "../components/form/checkbox";
describe("<FieldVertical />", () => {
  it("CheckboxWithLabel changes the text after click", () => {
 render(
      <CheckBox
        values={[{ label: "my-label", value: "my-value-1" }]}
        name="name"
        error="error"
        value={"value"}
        onChange={(name: string, value: string | undefined) => {}}
      ></CheckBox>
    );

    const labelElement = screen.getByText("my-label");

    expect(labelElement).toBeInTheDocument();
  });
});
