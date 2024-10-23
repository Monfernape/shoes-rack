"use client"
import React from "react";
import { DataTabel } from "@/app/common/DataTabel/Tabel";
import { Member} from "@/types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import MemberTableActionRender from "./MemberActionRender";

const membersData: Member[] = [
  {
    id: 1,
    name: "Alice Johnson",
    phone: "555-1234",
    shift: "A",
    role: "incharge",
    status: "active",
  },
  {
    id: 2,
    name: "Bob Smith",
    phone: "555-5678",
    shift: "B",
    role: "member",
    status: "invited",
  },
  {
    id: 3,
    name: "Charlie Brown",
    phone: "555-8765",
    shift: "C",
    role: "shift-incharge",
    status: "active",
  },
  {
    id: 4,
    name: "Diana Prince",
    phone: "555-4321",
    shift: "D",
    role: "member",
    status: "active",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    phone: "555-2468",
    shift: "A",
    role: "incharge",
    status: "invited",
  },
  {
    id: 6,
    name: "Fiona Gallagher",
    phone: "555-1357",
    shift: "B",
    role: "member",
    status: "active",
  },
  {
    id: 7,
    name: "George Banks",
    phone: "555-2469",
    shift: "B",
    role: "shift-incharge",
    status: "active",
  },
  {
    id: 8,
    name: "Hannah Baker",
    phone: "555-3698",
    shift: "B",
    role: "member",
    status: "invited",
  },
  {
    id: 9,
    name: "Ian Malcolm",
    phone: "555-2580",
    shift: "C",
    role: "incharge",
    status: "active",
  },
  {
    id: 10,
    name: "Jack Sparrow",
    phone: "555-1597",
    shift: "C",
    role: "member",
    status: "active",
  },
  {
    id: 11,
    name: "Kara Danvers",
    phone: "555-7531",
    shift: "D",
    role: "shift-incharge",
    status: "invited",
  },
  {
    id: 12,
    name: "Leo Messi",
    phone: "555-9876",
    shift: "A",
    role: "incharge",
    status: "active",
  },
  {
    id: 13,
    name: "Mia Wallace",
    phone: "555-4327",
    shift: "B",
    role: "member",
    status: "active",
  },
  {
    id: 14,
    name: "Nina Simone",
    phone: "555-8642",
    shift: "B",
    role: "shift-incharge",
    status: "invited",
  },
  {
    id: 15,
    name: "Oscar Isaac",
    phone: "555-3214",
    shift: "A",
    role: "member",
    status: "active",
  },
];

export const MemberList = () => {
  
  const columns: ColumnDef<Member>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <div>{row.getValue("phone")}</div>
      ),
    },
    {
      accessorKey: "shift",
      header: "Shift",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("shift")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("role")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
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
      cell: ({ row }) => {
        return <MemberTableActionRender
        memberData={row.original}
        />;
      },
    },
  ];
  
  return <div>
    <DataTabel
      data={membersData}
      columns={columns}
      isGroupData={true}
    />
  </div>;
};
