import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { DataTabel } from "./Tabel";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Badge } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Member } from "@/types";

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

const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <span
          className="flex cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <span
          className="flex cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => (
      <div>{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "shift",
    header: ({ column }) => {
      return (
        <span
          className="flex cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Shift
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("shift")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <span
          className="flex cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("role")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <span
          className="flex cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => (
      <Badge className={`capitalize ${row.getValue("status") === "active"?  
      "bg-status-active-background text-status-active hover:bg-status-active-background hover:text-status-active" :   
      "bg-status-invited-background text-status-invited hover:bg-status-invited-background hover:text-status-invited"}`}>{row.getValue("status")}</Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => {
      return (
        <span>
          Action
        </span>
      );
    },
    cell: () => {
      return "Actions";
    },
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
