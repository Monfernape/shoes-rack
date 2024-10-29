import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, describe, vi } from "vitest";
import { MemeberHeader } from "./MemeberHeader";

describe("Header Component", () => {
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
  it("Input Event Triggered", async () => {
    render(<MemeberHeader />);
    userEvent.click(screen.getByTestId("searchInput"));
  });

  it("Button is clicked", async () => {
    render(<MemeberHeader />);
    userEvent.click(screen.getByTestId("addMemberButton"));
  });
});
