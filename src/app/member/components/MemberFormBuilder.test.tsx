import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { format } from "date-fns";
import { MemberFormBuilder } from "./MemberFormBuilder";

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

const formTargets = [
  {
    testId: "name",
    value: "John Doe",
  },
  {
    testId: "phone",
    value: "0305-6812063",
  },
  {
    testId: "cnic",
    value: "31303-2943130-9",
  },
  // {
  //   testId: "date_of_birth",
  //   value: format(new Date(2004, 9, 28, 13), "yyyy-MM-dd"),
  // },
  {
    testId: "address",
    value: "123 Main St",
  },
];
describe("UserForm", () => {
  it("validates the form fields", async () => {
    render(<MemberFormBuilder />);
    // Inputs
    formTargets.map((target) => {
      const input = screen.getByTestId(target.testId);
      fireEvent.change(input, { target: { value: target.value } });
      expect(hasInputValue(input, target.value)).toBe(true);
    });
    // Dates
    const nowDateObject = new Date("2004-02-26T20:42:16.652Z");
    const spy = vi
      .spyOn(Date, "now")
      .mockImplementation(() => nowDateObject.getTime());

    const date = new Date(2004, 9, 28, 13);
    vi.setSystemTime(date);
    const date_of_birth = screen.getByTestId("date_of_birth");
    fireEvent.click(date_of_birth);
    const datePicker = screen.getByTestId("date-picker");
    fireEvent.pointerEnter(datePicker);
    expect(date_of_birth).toHaveTextContent(
      format(new Date(2004, 9, 28, 13), "PPP")
    );
    console.log("datePicker", format(new Date(2004, 9, 28, 13), "PPP"));
    const selectTrigger = screen.getByTestId("role");
    fireEvent.click(selectTrigger);
    const option = screen.getByRole("option", { name: "Member" });
    fireEvent.click(option);

    expect(screen.getByTestId("role")).toHaveTextContent("Member");
    expect(screen.getByTestId("form-valid")).toHaveFormValues({
      name: "John Doe",
      phoneNumber: "0305-6812063",
      date_of_birth: new Date(2004, 9, 28, 13).toUTCString(),
      role: "member",
      cnic: "31303-2943130-9",
    });

    fireEvent.click(screen.getByTestId("submit"));
  });
});
