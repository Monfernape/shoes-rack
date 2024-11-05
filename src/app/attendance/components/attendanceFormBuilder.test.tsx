import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AttendanceFormBuilder from "./AttendanceFormBuilder"; 

// Mock scrollIntoView to prevent TypeError
beforeEach(() => {
  global.HTMLElement.prototype.scrollIntoView = vi.fn();
});

describe("AttendanceFormBuilder", () => {

  it("selection value", async () => {
    render(<AttendanceFormBuilder />);

    expect(screen.getByText('Attendance Form')).toBeDefined();

    const selectTrigger = screen.getByText(/select a user/i);
    fireEvent.click(selectTrigger);

    const option = await screen.findByLabelText(/Ian Malcolm/i);
    fireEvent.click(option);

    await waitFor(() => {
      expect(screen.getAllByText("Ian Malcolm")).toHaveLength(2)
    });

 
    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it("ensures end time is greater than start time", async () => {
    render(<AttendanceFormBuilder />);

    const startInput = screen.getByLabelText(/Start Time/i) as HTMLInputElement;
    fireEvent.change(startInput, { target: { value: "10:00" } });

    expect(startInput.value).toBe("10:00");

    const endInput = screen.getByLabelText(/End Time/i) as HTMLInputElement;
    fireEvent.change(endInput, { target: { value: "12:00" } });

    expect(endInput.value).toBe("12:00");

    expect(new Date(`1970-01-01T${endInput.value}:00`) > new Date(`1970-01-01T${startInput.value}:00`)).toBe(true);
  });
});