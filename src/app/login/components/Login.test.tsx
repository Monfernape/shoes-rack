import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoginPage } from "./Login";

test("Page", () => {
  render(<LoginPage />);
  expect(screen.getByText("Welcome Back")).toBeDefined();
});
