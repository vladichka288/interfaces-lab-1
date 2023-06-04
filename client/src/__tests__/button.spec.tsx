import { FieldVertical } from "../components/form/field";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "../test-utils/test-utils";
import { Input, InputType } from "../components/form/Input";
import { SubmitButton } from "../components/form/submit-button.component";

describe("<FieldVertical />", () => {
  it("CheckboxWithLabel changes the text after click", () => {
    const { queryByLabelText, getByLabelText } = render(
      <SubmitButton title={"label"} />
    );

    const labelElement = screen.getByText("label");

    expect(labelElement).toBeInTheDocument();
  });
});
