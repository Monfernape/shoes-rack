import { waitFor } from "@testing-library/dom";
import { onCreateLeaveRequest } from "./actions";
import { LeaveRequestStatus, LeaveTypes } from "@/constant/constant";

describe("Leave Request Integration Test", async () => {
  const mockPayload = {
    memberId: 119,
    leaveType: LeaveTypes.Vacation,
    startDate: "2024/11/20",
    endDate: "2024/11/26",
    reasonForLeave: "Due to some personal reason",
    status: LeaveRequestStatus.Pending,
  };

  it("calls onCreateLeaveRequest with mock form data on submit", async () => {
    const submit = vi.fn().mockImplementation(onCreateLeaveRequest);
    await waitFor(() => {
      submit({
        ...mockPayload,
      });
    });
    expect(submit).toHaveBeenCalledTimes(1);
  });
});
