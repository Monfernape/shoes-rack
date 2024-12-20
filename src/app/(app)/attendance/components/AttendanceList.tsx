"use client";

import React, { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { StandardPage } from "@/common/StandardPage/StandardPage";
import { Plus } from "lucide-react";
import AttendanceActionRender from "./AttendanceActionRender";
import { Attendance } from "@/types";
import { StatusBadge } from "@/common/StatusBadge/StatusBadge";

export interface AttendanceProps {
  attendance: Attendance[];
}

export const AttendanceList = ({ attendance }: AttendanceProps) => {
  const columns: ColumnDef<Attendance>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("name")}</div>
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
        accessorKey: "startTime",
        header: "Start Time",
        cell: ({ row }) => <div>{row.getValue("startTime")}</div>,
      },
      {
        accessorKey: "endTime",
        header: "End Time",
        cell: ({ row }) => <div>{row.getValue("endTime")}</div>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
      },
      {
        accessorKey: "id",
        header: () => {
          return <div>Action</div>;
        },
        cell: ({ row }) => {
          return (
            <AttendanceActionRender
              key={row.getValue("id")}
              attendance={row.original}
            />
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: attendance,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const addAttendance = () => {
    alert("Navigation function triggered");
  };

  const StandardPageProps = {
    hasContent: !!attendance.length,
    title: "Add attendance",
    description: "This is where you can see all attendance",
    buttonIcon: <Plus />,
    actionButton: true,
    onAction: addAttendance,
    labelForActionButton: "Add attendance",
  };

  return (
    <StandardPage {...StandardPageProps}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StandardPage>
  );
};
