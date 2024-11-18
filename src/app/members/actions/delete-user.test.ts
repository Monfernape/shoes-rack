import { waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { deleteMember } from "./delete-user";

describe("Test Delete User Function", () => {
  it("Delete Function should be called", () => {
    const mock = vi.fn().mockImplementation(deleteMember);
    waitFor(() => {
      mock(3);
    });
    expect(mock).toBeCalledTimes(1);
  });
});
