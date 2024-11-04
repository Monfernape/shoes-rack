import { fireEvent, render } from "@testing-library/react";
import { Plus as PlusIcon } from "lucide-react";
import { StandardPage } from "./StandardPage";

const StandardPageProps = {
  showContent: false,
  title: "Add member",
  description: "This is where you can see all shoes rack members",
  buttonIcon: <PlusIcon />,
  onAction: vi.fn(),
  labelForActionButton: "Add member",
};

test(" description must be exist  and Add member button should be trigger", async () => {
  const screen = render(<StandardPage {...StandardPageProps} />);

  expect(screen.getByTestId("standardPage")).toBeDefined();

  const navigationButton = screen.getByTestId("button");

  fireEvent.click(navigationButton);

  expect(
    screen.getByText("This is where you can see all shoes rack members")
  ).toBeDefined();
  
});
