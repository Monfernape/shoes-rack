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
import { Plus, CalendarIcon } from "lucide-react";
import AttendanceActionRender from "./AttendanceActionRender";
import { Attendance, UserDetails } from "@/types";
import { StatusBadge } from "@/common/StatusBadge/StatusBadge";
import { useRouter, useSearchParams } from "next/navigation";
import { Routes } from "@/lib/routes";
import { NoDataFound } from "@/common/NoDataFound";

export interface AttendanceProps {
  attendance: Attendance[];
  loginUser: UserDetails;
}

export const AttendanceList = ({ attendance, loginUser }: AttendanceProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.toString();
  const columns: ColumnDef<Attendance>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="capitalize overflow-hidden text-ellipsis">
            {row.getValue("name")}
          </div>
        ),
      },
      {
        accessorKey: "shift",
        header: "Shift",
        cell: ({ row }) => (
          <div className="capitalize ml-2">{row.getValue("shift")}</div>
        ),
      },
      {
        accessorKey: "startTime",
        header: "Start Time",
        cell: ({ row }) => (
          <div className="ml-2">{row.getValue("startTime")}</div>
        ),
      },
      {
        accessorKey: "endTime",
        header: "End Time",
        cell: ({ row }) => (
          <div className="ml-2">{row.getValue("endTime")}</div>
        ),
      },
      {
        accessorKey: "created_at",
        header: () => <h4 className="ml-4">Date</h4>,
        cell: ({ row }) => (
          <div className="ml-2">{new Intl.DateTimeFormat().format(new Date(row.getValue("created_at")))}</div>
        ),
      },
      {
        accessorKey: "status",
        header: () => <h4 className="ml-4">Status</h4>,
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
              loginUser={loginUser}
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
    router.push(`${Routes.AddAttendance}`);
  };

  const StandardPageProps = {
    hasContent: !!attendance.length,
    title: "Add attendance",
    description: "This is where you can see all attendance",
    buttonIcon: <Plus />,
    icon: <CalendarIcon />,
    actionButton: true,
    onAction: addAttendance,
    labelForActionButton: "Add attendance",
  };

  if (id && !attendance?.length) {
    return <NoDataFound />;
  }

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
                <TableCell
                  key={cell.id}
                  className="max-w-28 overflow-hidden whitespace-nowrap text-ellipsis "
                >
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
