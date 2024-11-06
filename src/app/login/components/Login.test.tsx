import { expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LoginPage } from "./Login";
import { loginUser } from "@/app/members/actions/action";

const credentialsMock = {
  phoneNumber: "923000000000",
  password: 'test-password',
};

const fields = [
  { testId: "phoneNumber", value: credentialsMock.phoneNumber },
  { testId: "password", value: credentialsMock.password },
];

test("user login test", async () => {
  const mockSubmit = vi.fn();

  render(<LoginPage />);

  fields.forEach(({ testId, value }) => {
    const field = screen.getByTestId(testId);
    fireEvent.change(field, { target: { value } });
  });

  expect(screen.getByTestId("form")).toHaveFormValues({
    phoneNumber: credentialsMock.phoneNumber,
    password: credentialsMock.password,
  });

  const submitButton = screen.getByTestId('submitButton');
  fireEvent.click(submitButton);
   const submit = vi.fn().mockImplementation(loginUser);
   await waitFor(()=>{
    submit({
      ...credentialsMock
    })
   })
   expect(submit).toHaveBeenCalledTimes(1)
});
