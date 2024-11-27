"use client";

import React, { useEffect, useMemo } from "react";
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

import { useToast } from "@/hooks/use-toast";
import { UserStatusBadge } from "@/common/StatusBadge/UserStatusBadge";
import { StandardPage } from "@/common/StandardPage/StandardPage";
import { Plus } from "lucide-react";
import { AttendanceStatus, Shift } from "@/constant/constant";

import AttendanceActionRender from "./AttendanceActionRender";

export interface Attendance {
  member: string;
  id: number;
  startTime: string;
  endTime: string;
  status: AttendanceStatus;
  created_at: string;
  memberId: number;
  name: string;
  shift: Shift;
}
interface AttendanceProps {
  attendance: Attendance[];
}

export const AttendanceList = ({ attendance }: AttendanceProps) => {
  const { toast } = useToast();

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
        cell: ({ row }) => <UserStatusBadge status={row.getValue("status")} />,
      },
      {
        id: "actions",
        enableHiding: false,
        header: () => {
          return <div>Action</div>;
        },
        cell: ({ row }) => {
          return <AttendanceActionRender attendanceData={row.original} />;
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

  useEffect(() => {
    if (!attendance) {
      toast({
        title: "No Attendance Found",
        description: "There are no members available at this time.",
      });
    } else {
      toast({
        title: "Attendances loaded successfully",
        description: "You can now see all attendance.",
      });
    }
  }, [attendance, toast]);

  const addAttendance = () => {
    alert("Navigation function triggered");
  };

  const StandardPageProps = {
    hasContent: !!attendance.length,
    title: "Add Attendance",
    description: "This is where you can see all attendance",
    buttonIcon: <Plus />,
    actionButton: true,
    onAction: addAttendance,
    labelForActionButton: "Add Attendance",
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
