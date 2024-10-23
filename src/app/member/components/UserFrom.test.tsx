import { expect, test, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserForm } from "./UserForm";
test("Add User", async () => {
  const mockHandleClick = vi.fn();
  render(<UserForm />);
  // expect(screen.getByText("Personal Information")).toBeDefined();
  // expect(screen.getByPlaceholderText("Enter Your Name")).toBeDefined();
  // expect(screen.getByPlaceholderText("0300-0000000")).toBeDefined();
  // expect(screen.getByPlaceholderText("30000-0000000-0")).toBeDefined();
  // expect(screen.getAllByLabelText("date_of_birth")).toBeDefined();
  // expect(screen.getByPlaceholderText("Enter Your Address")).toBeDefined();
  // expect(screen.getAllByRole("textbox").length).toBe(4);

  userEvent.type(screen.getByPlaceholderText("Enter Your Name"), "John Doe");
  userEvent.type(screen.getByPlaceholderText("0300-0000000"), "0300-1234567");
  userEvent.type(
    screen.getByPlaceholderText("30000-0000000-0"),
    "32303-2943130-9"
  );
  userEvent.type(screen.getByLabelText("date_of_birth"), "2000-02-04");
  userEvent.type(
    screen.getByPlaceholderText("Enter Your Address"),
    "123 Main St"
  );
  userEvent.type(screen.getByLabelText("start_date"), "2000-02");
  userEvent.type(screen.getByLabelText("role"), "member");
  userEvent.selectOptions(screen.getByPlaceholderText("select role"), "member");
  userEvent.selectOptions(screen.getByLabelText("shift"), "shift_a");

  await userEvent.click(screen.getByText("Submit"));
  await userEvent.type(
    screen.getByPlaceholderText("Enter Your Name"),
    "Enter Your Name"
  );
  //   const shift = screen.getByRole("menu");
  //   console.log("Shift", shift);
  //   const { getAllByLabelText } = within(shift);
  //   const allshift = getAllByLabelText("shift");
  //   console.log("shift", allshift, shift);
  //   expect(allshift.length).toBe(4);
});
