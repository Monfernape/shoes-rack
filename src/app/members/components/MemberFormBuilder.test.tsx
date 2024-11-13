import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemberFormBuilder } from "./MemberFormBuilder";
import { createUser } from "../actions/createUser";



type TestElement = Document | Element | Window | Node;

function hasInputValue(e: TestElement, inputValue: string) {
  return screen.getByDisplayValue(inputValue) === e;
}
// Unit testing
const formTargets = [
  {
    testId: "name",
    value: "Mubasher",
  },
  {
    testId: "phone",
    value: "0305-6812063",
  },
  {
    testId: "cnic",
    value: "31303-2943130-9",
  },
  {
    testId: "address",
    value: "123 Main St",
  },
];
const selection = [
  {
    testId: "shift",
    value: "A",
    text: "Shift 12:00am to 00:06am",
  },
  {
    testId: "role",
    value: "member",
    text: "Member",
  },
];
describe("UserForm", async () => {
  it("validates the form fields", async () => {
    render(<MemberFormBuilder />);
    // Inputs
    formTargets.map((target) => {
      const input = screen.getByTestId(target.testId);
      fireEvent.change(input, { target: { value: target.value } });
      expect(hasInputValue(input, target.value)).toBe(true);
    });
    // Selection;
    selection.map((target) => {
      const selectTrigger = screen.getByTestId(target.testId);
      fireEvent.click(selectTrigger);
      const option = screen.getByRole("option", { name: target.text });
      fireEvent.click(option);
    });
    // Submitting the form
    expect(screen.getByTestId("form-valid")).toHaveFormValues({
      name: "Mubasher",
      phoneNumber: "0305-6812063",
      role: "member",
      cnic: "31303-2943130-9",
      address: "123 Main St",
      shift: "A",
    });
    fireEvent.click(screen.getByTestId("submit"));
    // mock function selection
    const mock = vi.fn().mockImplementation(createUser);
    const user = {
      name: "Mubasher",
      phoneNumber: "0305-6812063",
      dateOfBirth: new Date(2024, 9, 3),
      role: "member",
      cnic: "31303-2943130-9",
      address: "123 Main St",
      shift: "A",
    };
    await waitFor(() => {
      expect(mock(user));
    });
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
