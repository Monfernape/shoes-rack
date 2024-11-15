import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemberFormBuilder } from "../components/MemberFormBuilder";
import { Member } from "@/types";
import { MemberRole, Shift } from "@/constant/constant";
import { updateUser } from "./update-user";

afterEach(() => {
  vi.restoreAllMocks();
});

const member: Member = {
  id: 122,
  created_at: "2024-11-12T09:27:47.419165+00:00",
  name: "Balu ",
  phoneNumber: "923030000726",
  date_of_birth: "2024-09-15",
  cnic: "33333-3333333-3",
  address: "Multan\nmultan",
  ehad_duration: "2025-01-30",
  role: MemberRole.Member,
  status: "inactive",
  shift: Shift.ShiftB,
  invite_link: "http://localhost:3000?token=aypvudbc",
  temporary_password: true,
};
const mockValues = {
  name: "Balu",
  phoneNumber: "923030000726",
  date_of_birth: "2024-09-15",
  cnic: "33333-3333333-3",
  address: "Multan\nmultan",
  ehad_duration: "2025-01-30",
  role: MemberRole.Member,
  status: "inactive",
  shift: Shift.ShiftB,
};
describe("Integration Testing", () => {
  it("Check inputs Values", () => {
    render(<MemberFormBuilder member={member} />);
    expect(screen.getByTestId("name")).toBeInTheDocument();
    expect(screen.getByTestId("form-valid")).toBeInTheDocument();
    expect(screen.getByTestId("form-valid")).toHaveFormValues({
      name: "Balu ",
      cnic: "33333-3333333-3",
      role: MemberRole.Member,
      phoneNumber: "923030000726",
      shift: Shift.ShiftB,
      address: "Multan\nmultan",
    });
  });
  it("Check Update user implementation ", async () => {
    const mock = vi.fn().mockImplementation(updateUser);

    await waitFor(() => {
      mock(mockValues, {
        id: 122,
      });
    });
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
