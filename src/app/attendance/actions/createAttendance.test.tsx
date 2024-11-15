import { describe, it, vi, expect } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import AttendanceFormBuilder from "../components/AttendanceFormBuilder";
import { createAttendance } from "./create-attendance";

const attendanceMock = {
  memberId: 1,
  startTime: "2:00",
  endTime: "4:00",
};
describe("AttendanceFormBuilder Integration Test", async () => {
  it("calls onAttendanceRequest with correct form data on submit", async () => {
    // Render the form
    render(<AttendanceFormBuilder />);

    fireEvent.change(screen.getByTestId("memberId"), {
      target: { value: attendanceMock.memberId },
    });

    fireEvent.change(screen.getByTestId("startTime"), {
      target: { value: attendanceMock.startTime },
    });
    fireEvent.change(screen.getByTestId("endTime"), {
      target: { value: attendanceMock.endTime },
    });

    fireEvent.click(screen.getByText("Submit"));

    const submit = vi.fn().mockImplementation(createAttendance);
    await waitFor(() => {
      submit({
        ...attendanceMock,
      });
    });
    expect(submit).toHaveBeenCalledTimes(1);
  });
});
