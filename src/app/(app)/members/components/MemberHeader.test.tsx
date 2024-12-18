import { Routes } from "@/lib/routes";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { it, describe, vi } from "vitest";
import { MemberHeader } from "./MemberHeader";
import { Breadcrumbs, Member } from "@/types";
import { MemberRole, Shift, UserStatus } from "@/constant/constant";

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

const breadcrumbs: Breadcrumbs[] = [{ href: Routes.Members, label: "Members" }];
describe("Header Component", () => {
  beforeAll(() => {
    vi.mock("next/headers", () => {
      return {
        cookies: () => {
          return {
            get: vi.fn().mockReturnValue({
              name: "loginUser",
              value:
                '{"id":148,"created_at":"2024-11-15T11:17:10.486126+00:00","name":"Testing User","phoneNumber":"923057692655","date_of_birth":"2024-08-31","cnic":"33333-3333333-3","address":"test","ehad_duration":"2025-03-30","role":"shift_incharge","status":"active","shift":"A","invite_link":"","temporary_password":true}',
              path: "/",
            }),
          };
        },
      };
    });
    vi.mock("next/navigation", () => {
      const actual = vi.importActual("next/navigation");
      return {
        ...actual,
        useRouter: vi.fn(() => ({
          push: vi.fn(),
        })),
        usePathname: vi.fn().mockReturnValue(Routes.Members),
      };
    });
  });
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  it("Input Event Triggered", async () => {
    render(<MemberHeader breadcrumbs={breadcrumbs} user={loginUser} />);
    fireEvent.click(screen.getByTestId("searchInput"));
  });

  it("Input Event Triggered", async () => {
    render(<MemberHeader breadcrumbs={breadcrumbs} user={loginUser} />);
    const searchInput = screen.getByTestId("searchInput") as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: "test input" } });

    expect(searchInput.value).toBe("test input");
  });

  it("Button is clicked", async () => {
    render(<MemberHeader breadcrumbs={breadcrumbs} user={loginUser} />);
    fireEvent.click(screen.getByTestId("addMemberButton"));
  });
});
