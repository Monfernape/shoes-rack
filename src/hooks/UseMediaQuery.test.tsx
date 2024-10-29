import { expect, it, describe } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import useMediaQuery from "./use-media-query";

describe("useMediaQuery", () => {
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

  const isMediumScreenSize = false;
  it("should return boolean value", () => {
    const { result } = renderHook(() => useMediaQuery("md"));
    expect(result.current.valueOf()).toEqual(isMediumScreenSize);
  });
});
