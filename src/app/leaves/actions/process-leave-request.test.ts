import { waitFor } from "@testing-library/dom";
import { processLeaveRequest } from "./process-leave-request";
import { LeaveRequestStatus } from "@/constant/constant";

describe("delete leave request", () => {
  const mockPlayload = {
    requestId: 1,
    requestStatus: LeaveRequestStatus.Reject,
  };

  it("should Process leave request as approved or rejected", async () => {
    const mockDeleteLeaveRequest = vi
      .fn()
      .mockImplementation(processLeaveRequest);
    await waitFor(() => {
      mockDeleteLeaveRequest(mockPlayload);
    });
    expect(mockDeleteLeaveRequest).toHaveBeenCalledTimes(1);
  });
});
