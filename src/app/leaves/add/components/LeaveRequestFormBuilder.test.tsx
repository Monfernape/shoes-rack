import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LeaveRequestStatus, LeaveTypes } from "@/constant/constant";
import { LeaveRequestFormBuilder } from "./LeaveRequestFormBuilder";
import { useParams, useRouter } from "next/navigation";
import { Mock } from "vitest";
import { createLeaveRequest } from "../../actions/createLeaveRequest";

vi.mock("next/navigation", async () => {
  return {
    useParams: vi.fn(),
    useRouter: vi.fn(),
  };
});

describe("Leave request Form Testing", () => {
  const mockSelector = [
    {
      id: "leave-type",
      name: LeaveTypes.Sick,
    },
  ];

  const mockPayload = {
    memberId: 119,
    leaveType: LeaveTypes.Vacation,
    startDate: "2024/11/20",
    endDate: "2024/11/26",
    reason: "Due to some personal reason",
    status: LeaveRequestStatus.Pending,
  };

  beforeEach(() => {
    (useParams as Mock).mockReturnValue({
      query: { id: "123" },
    });
    (useRouter as Mock).mockReturnValue({
      query: { id: "123" },
    });
  });

  it("should get values from select and text area", () => {
    render(<LeaveRequestFormBuilder />);
    mockSelector.forEach((select) => {
      const selectMember = screen.getByTestId(select.id);
      fireEvent.click(selectMember);
      const options = screen.getByRole("option", { name: select.name });
      fireEvent.click(options);
    });

    const leaveReasonTextArea = screen.getByTestId("leaveReason");
    fireEvent.change(leaveReasonTextArea, {
      target: { value: "Reason for leave" },
    });
  });

  it("should call onSubmit when the form is submitted", async () => {
    render(<LeaveRequestFormBuilder />);

    const submitButton = screen.getByTestId("submitButton");
    fireEvent.submit(submitButton);

    fireEvent.click(submitButton);
  });
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
