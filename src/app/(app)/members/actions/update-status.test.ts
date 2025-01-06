import { waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { updateMemberStatus } from "./update-status";
import { UserStatus } from "@/constant/constant";
describe("Test Delete User Function", () => {
  it("Delete Function should be called", () => {
    const mock = vi.fn().mockImplementation(updateMemberStatus);
    waitFor(() => {
      mock(3,UserStatus.Deactivated);
    });
    expect(mock).toBeCalledTimes(1);
  });
});
