import { expect, test, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserForm } from "./MemberEditPage";
test("Add User", async () => {
  const mockHandleClick = vi.fn();
  render(<UserForm />);
  userEvent.type(screen.getByTestId("name"), "John Doe");
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
  // userEvent.type(screen.getByLabelText("start_date"), "");
  // userEvent.type(screen.getByLabelText("role"), "member");
  // userEvent.selectOptions(screen.getByPlaceholderText("select role"), "member");
  // userEvent.type(screen.getByLabelText("shift"), "shift_a");

  await userEvent.click(screen.getByText("Submit"));
  await waitFor(() => {
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
