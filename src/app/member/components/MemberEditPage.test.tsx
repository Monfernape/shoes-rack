import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  findByText,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemberEditPage } from "./MemberEditPage";
import { onSubmit } from "./memberActions";
import { Duties, User, UserRole } from "@/constant/constant";
import userEvent from "@testing-library/user-event";
import { format } from "date-fns";
// vi.mock("../../../actions/memberActions", () => ({
//   onSubmit: vi.fn(),
// }));
class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
    this.pointerType = props.pointerType || "mouse";
  }
}
window.PointerEvent = MockPointerEvent as any;
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
type TestElement = Document | Element | Window | Node;

// function for testing input values
function hasInputValue(e: TestElement, inputValue: string) {
  console.log("hasInputValue", e, inputValue);
  return screen.getByDisplayValue(inputValue) === e;
}
// Mock Function for testing
vi.mock("./memberActions.ts", { spy: true });
vi.mock("date-fns", { spy: true });

// Unit testing
describe("UserForm", () => {
  it("validates the form fields", async () => {
    render(<MemberEditPage />);
    // Inputs
    const input = screen.getByTestId("name");
    fireEvent.change(input, { target: { value: "123" } });
    expect(hasInputValue(input, "123")).toBe(true);
    const phone = screen.getByTestId("phone");
    fireEvent.change(phone, { target: { value: "03056872063" } });
    expect(hasInputValue(phone, "03056872063")).toBe(true);
    const cnic = screen.getByTestId("cnic");
    fireEvent.change(cnic, { target: { value: "32303-2943130-9" } });
    expect(hasInputValue(cnic, "32303-2943130-9")).toBe(true);
    // Dates
    const date = new Date(2024, 9, 28, 13);
    vi.setSystemTime(date);
    const expectedDate = format(date.toISOString(), "PPP");
    const date_of_birth = screen.getByTestId("date_of_birth");
    fireEvent.click(date_of_birth);
    const calender = screen.getByRole("button", { name: expectedDate });
    fireEvent.click(calender);
    expect(date_of_birth).toHaveTextContent(expectedDate);
    const selectTrigger = screen.getByTestId("role");
    fireEvent.click(selectTrigger);

    const option = screen.getByRole("option", { name: "Member" });
    fireEvent.click(option);
    expect(screen.getByTestId("role")).toHaveTextContent("Member");
    expect(screen.getByTestId("form-valid")).toHaveFormValues({
      name: "123",
      phone: "03056872063",
      date_of_birth: new Date(2024, 9, 28, 13),
      role: "member",
      cnic: "32303-2943130-9",
    });
    // Handle Submit Button
    fireEvent.click(screen.getByTestId("submit"));
  });
});
//   describe("MemberEditPage Select Field", () => {
//     it("renders select input with placeholder", () => {
//       render(<MemberEditPage />);
//       const selectTrigger = screen.getByLabelText("selection");
//       expect(selectTrigger).toBeInTheDocument();
//     });

//     it("opens dropdown and shows options on click", async () => {
//       render(<MemberEditPage />);

//       const selectTrigger = screen.getByTestId("role");
//       fireEvent.click(selectTrigger);

//       const options = await screen.findAllByTestId("role-option");
//       console.log(
//         "options: ",
//         options.map((option) => option.textContent)
//       );
//       expect(options.length).toBeGreaterThan(0);
//       expect(options[0]).toHaveTextContent("Member");
//     });

//     // it("selects an option and updates value", async () => {
//     //   render(<MemberEditPage />);

//     // });
//   });
// })
