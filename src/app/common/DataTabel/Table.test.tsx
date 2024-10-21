import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { DataTabel } from "./Tabel";
import { columns } from "@/app/member/components/MemberList";

const membersData = [
  {
    id: 1,
    name: "Alice Johnson",
    phone: "555-1234",
    shift_id: 101,
    role: "incharge",
    status: "active",
  },
  {
    id: 2,
    name: "Bob Smith",
    phone: "555-5678",
    shift_id: 102,
    role: "member",
    status: "inactive",
  },
  {
    id: 3,
    name: "Charlie Brown",
    phone: "555-8765",
    shift_id: 103,
    role: "shift-incharge",
    status: "active",
  },
  {
    id: 4,
    name: "Diana Prince",
    phone: "555-4321",
    shift_id: 104,
    role: "member",
    status: "active",
  },
];

test("Page", () => {
  render(<DataTabel data={membersData} columns={columns} />);
  expect(screen.getByText("Alice Johnson")).toBeDefined();
});

test("Page", () => {
  render(<DataTabel data={[]} columns={columns} />);
  expect(screen.getByText("No results.")).toBeDefined();
});
