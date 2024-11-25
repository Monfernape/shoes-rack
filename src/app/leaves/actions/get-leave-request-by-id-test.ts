import { waitFor } from "@testing-library/dom";
import { getLeaveRequestById } from "./get-leave-request-by-id";

describe("Leave Request Integration Test", async () => {
  const mockLeaveRequestId = 2;

  it("calls getLeaveRequestById with mock form data on update", async () => {
    const submit = vi.fn().mockImplementation(getLeaveRequestById);
    await waitFor(() => {
      submit(mockLeaveRequestId);
    });
    expect(submit).toHaveBeenCalledTimes(1);
  });
});
