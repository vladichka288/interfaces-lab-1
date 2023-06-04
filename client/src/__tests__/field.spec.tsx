import { FieldVertical } from "../components/form/field";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "../test-utils/test-utils";
describe("<FieldVertical />", () => {
  it("CheckboxWithLabel changes the text after click", () => {
    const { queryByLabelText, getByLabelText } = render(
      <FieldVertical label="exist" error={undefined}>
        <div></div>
      </FieldVertical>
    );

    const labelElement = screen.getByText("exist");

    expect(labelElement).toBeInTheDocument();
  });
});


