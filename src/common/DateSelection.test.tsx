import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { format } from "date-fns";
import { DateSelection } from "./DateSelection";

describe("Date Selection ", () => {
  it("should be able to select a date", () => {
    const onChange = vi.fn();
    const value = new Date(2025, 2, 3);

    render(<DateSelection onChange={onChange} value={value} />);

    const input = screen.getByTestId("ehad_start_date");
    fireEvent.click(input);
    const calendar = screen.getByTestId("calender");
    const calendarDay = screen.getByText(format(value, "PPP"));
    fireEvent.click(calendar);
    // expect(calendar).toHave;
  });
});
