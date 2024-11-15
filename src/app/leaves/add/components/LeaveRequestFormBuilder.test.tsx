import { fireEvent, render, screen } from "@testing-library/react";
import { LeaveTypes } from "@/constant/constant";
import { LeaveRequestFormBuilder } from "./LeaveRequestFormBuilder";

describe("Leave request Form Testing", () => {
  const mockSelector = [
    {
      id: "leave-type",
      name: LeaveTypes.Sick,
    },
  ];

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
