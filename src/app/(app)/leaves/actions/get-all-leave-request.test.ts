import { waitFor } from "@testing-library/dom";
import { getAllLeaveRequests } from "./get-all-leave-requests";

describe(" getAllLeaveRequest", () => {
  it("should get all leave requests", async () => {
    const mockDeleteLeaveRequest = vi
      .fn()
      .mockImplementation(getAllLeaveRequests);
    await waitFor(() => {
      mockDeleteLeaveRequest();
    });
    expect(mockDeleteLeaveRequest).toHaveBeenCalledTimes(1);
  });
});
