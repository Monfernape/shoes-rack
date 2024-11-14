import { waitFor } from "@testing-library/dom";
import { LeaveRequestStatus, LeaveTypes } from "@/constant/constant";
import { createLeaveRequest } from "./createLeaveRequest";

describe("Leave Request Integration Test", async () => {
  const mockPayload = {
    memberId: 119,
    leaveType: LeaveTypes.Vacation,
    startDate: "2024/11/20",
    endDate: "2024/11/26",
    reasonForLeave: "Due to some personal reason",
    status: LeaveRequestStatus.Pending,
  };

  it("calls createLeaveRequest with mock form data on submit", async () => {
    const submit = vi.fn().mockImplementation(createLeaveRequest);
    await waitFor(() => {
      submit({
        ...mockPayload,
      });
    });
    expect(submit).toHaveBeenCalledTimes(1);
  });
});

