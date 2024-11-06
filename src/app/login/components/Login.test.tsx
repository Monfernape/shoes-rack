import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "./Login";
import { userEvent } from "@testing-library/user-event";

const credentialsMock = {
  phoneNumber: "923000000000",
  password: Math.random().toString(),
};

const fields = [
  { testId: "phoneNumber", value: credentialsMock.phoneNumber },
  { testId: "password", value: credentialsMock.password },
];

test("user login test", async () => {

  render(<LoginPage />);
  expect(screen.getByText("Welcome Back")).toBeDefined();

  fields.forEach(({ testId, value }) => {
    const field = screen.getByTestId(testId);
    fireEvent.change(field, { target: { value } });
  });

  expect(screen.getByTestId("form")).toHaveFormValues({
    phoneNumber: credentialsMock.phoneNumber,
    password: credentialsMock.password,
  });

});
