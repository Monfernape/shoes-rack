import { fireEvent, render, screen } from "@testing-library/react";
import { it, describe, vi } from "vitest";
import { MemberHeader } from "./MemberHeader";

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
    render(<MemberHeader />);
    fireEvent.click(screen.getByTestId("searchInput"));
  });


  it("Input Event Triggered", async () => {
    render(<MemberHeader />);
    const searchInput = screen.getByTestId("searchInput") as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'test input' } });
    
    expect(searchInput.value).toBe('test input');
  });

  it("Button is clicked", async () => {
    render(<MemberHeader />);
    fireEvent.click(screen.getByTestId("addMemberButton"));
  });
});
