import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { it, describe, vi } from "vitest";
import { MemberRole, Shift, UserStatus } from "@/constant/constant";
import { MemberList } from "./MemberList";

const member = {
  data: [
    {
      id: 2,
      created_at: "2023-11-12",
      name: "Ali",
      phoneNumber: "0300-3333333",
      date_of_birth: "2023-11-12",
      cnic: "32303-2943130-9",
      address: "abcdefghijklmnopqrstuvwxyz",
      ehad_duration: "2024-1-13",
      role: MemberRole.Member,
      status: UserStatus.Inactive,
      shift: Shift.ShiftD,
      invite_link: "",
      temporary_password: true,
    },
  ],
  success: true,
  message: "List successfully fetched",
};
beforeAll(() => {
  vi.mock("next/headers", () => {
    return {
      cookies: () => {
        return {
          get: vi.fn().mockReturnValue({
            name: "loginUser",
            value:
              '{"id":148,"created_at":"2024-11-15T11:17:10.486126+00:00","name":"Testing User","phoneNumber":"923057692655","date_of_birth":"2024-08-31","cnic":"33333-3333333-3","address":"test","ehad_duration":"2025-03-30","role":"shift_incharge","status":"active","shift":"D","invite_link":"","temporary_password":true}',
            path: "/",
          }),
        };
      },
    };
  });
  vi.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null,
      };
    },
  }));
});

describe("integration Testing", () => {
  it("Member List", async () => {
    await act(async () => render(<MemberList members={member} />));
    const selection = screen.getAllByTestId("actionButton");
    fireEvent.pointerDown(selection[0]);
    expect(screen.getByTestId("menus")).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(4);
  });
});
