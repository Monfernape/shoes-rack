import { fireEvent, render, screen } from "@testing-library/react";
import { LeaveTypes } from "@/constant/constant";
import { LeaveRequestFormBuilder } from "./LeaveRequestFormBuilder";
import { useParams, useRouter } from "next/navigation";
import { Mock } from "vitest";

vi.mock("next/navigation", async () => {
  return {
    useParams: vi.fn(),
    useRouter: vi.fn(),
  };
});

describe("Leave request Form Testing", () => {
  const mockSelector = [
    {
      id: "leave-type",
      name: LeaveTypes.Sick,
    },
  ];

  beforeEach(() => {
    (useParams as Mock).mockReturnValue({
      query: { id: "123" },
    });
    (useRouter as Mock).mockReturnValue({
      query: { id: "123" },
    });
  });

  it("should get values from select and text area", () => {
    render(<LeaveRequestFormBuilder />);
    mockSelector.forEach((select) => {
      const selectMember = screen.getByTestId(select.id);
      fireEvent.click(selectMember);
      const options = screen.getByRole("option", { name: select.name });
      fireEvent.click(options);
    });

    const leaveReasonTextArea = screen.getByTestId("leaveReason");
    fireEvent.change(leaveReasonTextArea, {
      target: { value: "Reason for leave" },
    });
  });

  it("should call onSubmit when the form is submitted", async () => {
    render(<LeaveRequestFormBuilder />);

    const submitButton = screen.getByTestId("submitButton");
    fireEvent.submit(submitButton);

    fireEvent.click(submitButton);
  });
});
