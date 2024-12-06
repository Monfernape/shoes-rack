import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemberFormBuilder } from "./MemberFormBuilder";
import { createUser } from "../actions/createUser";
import { Member } from "@/types";
import { MemberRole, Shift, UserStatus } from "@/constant/constant";

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


describe("UserForm", async () => {
  it("validates the form fields", async () => {
    const loginUser: Member = {
      id: 232,
      created_at: "2024-11-26T13:38:23.700892+00:00",
      name: "Mubashir",
      phoneNumber: "923056872063",
      date_of_birth: "2024-11-01",
      cnic: "",
      address: "",
      ehad_duration: "2025-01-02",
      role: MemberRole.ShiftIncharge,
      shift: Shift.ShiftC,
      invite_link: "",
      temporary_password: false,
      status: UserStatus.Active,
    };
    render(<MemberFormBuilder user={loginUser} />);
    // Inputs
    formTargets.map((target) => {
      const input = screen.getByTestId(target.testId);
      fireEvent.change(input, { target: { value: target.value } });
      expect(hasInputValue(input, target.value)).toBe(true);
    });

    expect(screen.getByTestId("form")).toHaveFormValues({
      name: "Mubasher",
      phoneNumber: "0305-6812063",
      role: "member",
      cnic: "31303-2943130-9",
      address: "123 Main St",
      shift: "C",
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
      shift: "C",
    };
    await waitFor(() => {
      expect(mock(user));
    });
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
