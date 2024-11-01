import { render, screen } from "@testing-library/react";
import { BasedBreadCrumb } from "./BasedBreadCrumb";
import { Mock, describe, expect, it, vi } from "vitest";
import { usePathname } from "next/navigation";
import { Breadcrumbs } from "@/types";
import { Routes } from "@/lib/routes";

const mockBreadcrumbs: Breadcrumbs[] = [
  { href: Routes.Member, label: "Member" },
  { href: Routes.AddMember, label: "New Member" },
];

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

beforeAll(() => {
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
    })),
  });
});

describe("BasedBreadCrumb", () => {
  it("renders the correct breadcrumb links", () => {
    (usePathname as Mock).mockReturnValue(Routes.AddMember);
    render(<BasedBreadCrumb breadcrumbs={mockBreadcrumbs} />);
  });
});
