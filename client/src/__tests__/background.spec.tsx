import { FieldVertical } from "../components/form/field";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "../test-utils/test-utils";
import { Input, InputType } from "../components/form/Input";
import { ModalBackground } from "../components/form/modal-backgroudn.component";

describe("<ModalBackgroudn />", () => {
  it("CheckboxWithLabel changes the text after click", () => {
    render(
      <ModalBackground onBackgroundClick={() => {}}>
        <div>value</div>
      </ModalBackground>
    );

    const labelElement = screen.getByText("value");

    expect(labelElement).toBeInTheDocument();
  });
});
