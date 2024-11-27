import { waitFor } from "@testing-library/dom";
import { LeaveRequestStatus, LeaveTypes } from "@/constant/constant";
import { updateLeaveRequest } from "./updated-leave-request";

describe("Leave Request Update Test", async () => {
  const mockPayload = {
    memberId: 12,
    leaveType: LeaveTypes.Vacation,
    startDate: "2025/11/20",
    endDate: "2025/11/26",
    reason: "Due to some personal reason",
    status: LeaveRequestStatus.Pending,
  };
  const leaveRequestId = 2;
  it("calls updateLeaveRequest with mock form data on update", async () => {
    const submit = vi.fn().mockImplementation(updateLeaveRequest);
    await waitFor(() => {
      submit({
        ...mockPayload,
        leaveRequestId,
      });
    });
    expect(submit).toHaveBeenCalledTimes(1);
  });
});
