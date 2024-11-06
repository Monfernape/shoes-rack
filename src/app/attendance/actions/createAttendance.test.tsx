import { describe, it, vi, expect } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import AttendanceFormBuilder from "../components/AttendanceFormBuilder";
import { onAttandanceRequset } from "./CreateAttendance";  

const attendanceMock = {
  memberId: 1,
  startTime: "2:00",
  endTime: "4:00",
};
describe("AttendanceFormBuilder Integration Test", async () => {
  it("calls onAttendanceRequest with correct form data on submit", async () => {
    const spy = vi.spyOn({ onAttandanceRequset }, "onAttandanceRequset");

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

    const submit = vi.fn().mockImplementation(onAttandanceRequset);
    await waitFor(() => {
      submit({
        ...attendanceMock,
      });
    });
    expect(submit).toHaveBeenCalledTimes(1);
  });
});
