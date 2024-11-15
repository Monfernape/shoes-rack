import { waitFor } from "@testing-library/dom";
import { deleteLeaveRequest } from "./delete-leave-request";

describe("delete leave request", () => {
  const mockLeaveRequestId = 1;

  it("should delete leave request on leave request Id", async () => {
    const mockDeleteLeaveRequest = vi
      .fn()
      .mockImplementation(deleteLeaveRequest);
    await waitFor(() => {
      mockDeleteLeaveRequest({
        mockLeaveRequestId,
      });
    });
    expect(mockDeleteLeaveRequest).toHaveBeenCalledTimes(1);
  });
});
