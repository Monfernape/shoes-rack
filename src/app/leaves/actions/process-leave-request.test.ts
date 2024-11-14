import { waitFor } from "@testing-library/dom";
import { deleteLeaveRequest } from "./delete-leave-request";
import { processLeaveRequest } from "./process-leave-request";

describe("delete leave request", () => {
  const mockPlayload = {
    requestId: 1,
    requestStatus: "rejected",
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
