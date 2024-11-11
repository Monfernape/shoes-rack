import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MembersProps } from "@/types";
import { LeaveTypes, UserRole, UserStatus } from "@/constant/constant";
import { LeaveRequestFormBuilder } from "./LeaveRequestFormBuilder";

describe("Leave request Form Testing", () => {
  const mockMembers: MembersProps = {
    data: [
      {
        shift: "Morning",
        id: 1,
        name: "Alice Johnson",
        phone: "555-1234",
        role: UserRole.Member,
        status: UserStatus.Active,
      },
      {
        shift: "Afternoon",
        id: 2,
        name: "Bob Smith",
        phone: "555-5678",
        role: UserRole.Member,
        status: UserStatus.Inactive,
      },
      {
        shift: "Night",
        id: 3,
        name: "Charlie Brown",
        phone: "555-8765",
        role: UserRole.Member,
        status: UserStatus.Inactive,
      },
    ],
    success: true,
    message: "Members loaded successfully.",
  };

  const mockSelector = [
    {
      id: "leave-type",
      name: LeaveTypes.Sick,
    },
  ];

  it("should get values from select and text area", () => {
    render(<LeaveRequestFormBuilder members={mockMembers} />);
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

  it("should display the calendar popover when the button is clicked", () => {
    render(<LeaveRequestFormBuilder members={mockMembers} />);

    const calendarButton = screen.getByTestId("calendarButton");
    expect(calendarButton).toBeInTheDocument();
    expect(calendarButton).toHaveTextContent("Pick a date");

    fireEvent.click(calendarButton);
  });

  it("should call onSubmit when the form is submitted", async () => {
    render(<LeaveRequestFormBuilder members={mockMembers} />);

    const submitButton = screen.getByTestId("submitButton");
    fireEvent.submit(submitButton);

    fireEvent.click(submitButton);
  });
});
