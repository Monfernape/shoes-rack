"use client"
import React from "react";
import { DataTabel } from "@/app/common/DataTabel/Tabel";
import { Button } from "@/components/ui/button";
import { Member, UserRole, UserStatus } from "@/types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";


export const columns: ColumnDef<Member>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="bg-gray-800 text-white hover:bg-gray-800 hover:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
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
          <Button
            variant="ghost"
            className="bg-gray-800 text-white hover:bg-gray-800 hover:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("phone")}</div>
      ),
    },
    {
      accessorKey: "shift_id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="bg-gray-800 text-white hover:bg-gray-800 hover:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Shift Id
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("shift_id")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="bg-gray-800 text-white hover:bg-gray-800 hover:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("role")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="bg-gray-800 text-white hover:bg-gray-800 hover:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("status")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => {
        const payment = row.original;
        return "Actions";
      },
    },
  ];

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
  {
    id: 5,
    name: "Ethan Hunt",
    phone: "555-2468",
    shift_id: 105,
    role: "incharge",
    status: "inactive",
  },
  {
    id: 6,
    name: "Fiona Gallagher",
    phone: "555-1357",
    shift_id: 106,
    role: "member",
    status: "active",
  },
  {
    id: 7,
    name: "George Banks",
    phone: "555-2469",
    shift_id: 107,
    role: "shift-incharge",
    status: "active",
  },
  {
    id: 8,
    name: "Hannah Baker",
    phone: "555-3698",
    shift_id: 108,
    role: "member",
    status: "inactive",
  },
  {
    id: 9,
    name: "Ian Malcolm",
    phone: "555-2580",
    shift_id: 109,
    role: "incharge",
    status: "active",
  },
  {
    id: 10,
    name: "Jack Sparrow",
    phone: "555-1597",
    shift_id: 110,
    role: "member",
    status: "active",
  },
  {
    id: 11,
    name: "Kara Danvers",
    phone: "555-7531",
    shift_id: 111,
    role: "shift-incharge",
    status: "inactive",
  },
  {
    id: 12,
    name: "Leo Messi",
    phone: "555-9876",
    shift_id: 112,
    role: "incharge",
    status: "active",
  },
  {
    id: 13,
    name: "Mia Wallace",
    phone: "555-4327",
    shift_id: 113,
    role: "member",
    status: "active",
  },
  {
    id: 14,
    name: "Nina Simone",
    phone: "555-8642",
    shift_id: 114,
    role: "shift-incharge",
    status: "inactive",
  },
  {
    id: 15,
    name: "Oscar Isaac",
    phone: "555-3214",
    shift_id: 115,
    role: "member",
    status: "active",
  },
];

export const MemberList = () => {


  return <div className="p-8">
    <DataTabel
      data={membersData}
      columns={columns}
    />
  </div>;
};
