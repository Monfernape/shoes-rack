import { expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LoginPage } from "./Login";
import { loginUser } from "../actions/loginUser";

const credentialsMock = {
  phoneNumber: "923000000000",
  password: "test-password",
};

const fields = [
  { testId: "phoneNumber", value: credentialsMock.phoneNumber },
  { testId: "password", value: credentialsMock.password },
];

test("user login test", async () => {
  render(<LoginPage />);

  fields.forEach(({ testId, value }) => {
    const field = screen.getByTestId(testId);
    fireEvent.change(field, { target: { value } });
  });

  expect(screen.getByTestId("form")).toHaveFormValues({
    phoneNumber: credentialsMock.phoneNumber,
    password: credentialsMock.password,
  });

  const submit = vi.fn().mockImplementation(loginUser);
  await waitFor(() => {
    submit({
      ...credentialsMock,
    });
  });
  expect(submit).toHaveBeenCalledTimes(1);
});
