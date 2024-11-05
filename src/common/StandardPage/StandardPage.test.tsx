import { fireEvent, render } from "@testing-library/react";
import { Plus as PlusIcon } from "lucide-react";
import { StandardPage } from "./StandardPage";

const MockStandardPageProps = {
  hasContent: false,
  title: "Add member",
  description: "This is where you can see all shoes rack members",
  actionButton: true,
  buttonIcon: <PlusIcon />,
  onAction: vi.fn(),
  labelForActionButton: "Add member",
};

test(" description must be exist  and Add member button should be trigger", async () => {
  const screen = render(<StandardPage {...MockStandardPageProps} />);

  expect(screen.getByTestId("standardPage")).toBeDefined();

  const navigationButton = screen.getByTestId("button");

  fireEvent.click(navigationButton);

  expect(
    screen.getByTestId("description")
  ).toBeDefined();

});
