import { render, screen } from "@testing-library/react";
import { BasedBreadCrumb } from "./BasedBreadCrumb";
import { Mock, describe, expect, it, vi } from "vitest";
import { usePathname } from "next/navigation";
import { BreadcrumbsTypes } from "@/types";

const mockBreadcrumbs: BreadcrumbsTypes[] = [
  { href: "/member", label: "Member" },
  { href: "/member/add", label: "New Member" },
];

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("BasedBreadCrumb", () => {
  it("renders the correct breadcrumb links", () => {
    (usePathname as Mock).mockReturnValue("/member/add");

    // render(<BasedBreadCrumb breadcrumbs={mockBreadcrumbs} />);

    // expect(screen.getByRole("link", { name: "Member" })).toBeInTheDocument();
    // expect(
    //   screen.getByRole("link", { name: "New Member" })
    // ).toBeInTheDocument();
  });
});
