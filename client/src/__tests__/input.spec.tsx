import { FieldVertical } from "../components/form/field";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "../test-utils/test-utils";
import { Input, InputType } from "../components/form/Input";

describe("<FieldVertical />", () => {
  it("CheckboxWithLabel changes the text after click", () => {
    const { queryByLabelText, getByLabelText } = render(
      <Input
        type="text"
        name="name"
        error="error"
        value={"value"}
        onChange={(name: string, value: InputType) => {}}
      />
    );

    expect(screen.getByRole("textbox")).toHaveValue("value");
  });
});
