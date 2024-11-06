import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AttendanceFormBuilder from "./AttendanceFormBuilder";

describe("AttendanceFormBuilder", () => {
  it("selection value", async () => {
    render(<AttendanceFormBuilder />);

    expect(screen.getByText("Attendance Form")).toBeDefined();

    const selectTrigger = screen.getByTestId("select");
    fireEvent.click(selectTrigger);
  });

  it("ensures end time is greater than start time", async () => {
    render(<AttendanceFormBuilder />);

    const startInput = screen.getByLabelText(/Start Time/i) as HTMLInputElement;
    fireEvent.change(startInput, { target: { value: "10:00" } });

    expect(startInput.value).toBe("10:00");

    const endInput = screen.getByLabelText(/End Time/i) as HTMLInputElement;
    fireEvent.change(endInput, { target: { value: "12:00" } });
  });
});
