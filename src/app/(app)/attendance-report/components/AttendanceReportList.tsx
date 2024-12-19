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
import { AttendanceStatusBadge } from "@/common/StatusBadge/AttendanceStatusBadge";
import { AttendanceProgress } from "@/constant/constant";

type AttendanceProps = {
  name: string;
  attendancePercentage: string;
  status: AttendanceProgress;
  present: number;
  absent: number;
  leave: number;
  createdAt: string;
};

export const AttendanceReportList = ({ data }: { data: AttendanceProps[] }) => {
  const { toast } = useToast();


  const columns: ColumnDef<AttendanceProps>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "present",
        header: "Present",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("present")}</div>
        ),
      },
      {
        accessorKey: "leave",
        header: "Leave",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("leave")}</div>
        ),
      },
      {
        accessorKey: "absent",
        header: "Absent",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("absent")}</div>
        ),
      },

      {
        accessorKey: "attendancePercentage",
        header: "Percentage",
        cell: ({ row }) => (
          <div className="capitalize">
            {row.getValue("attendancePercentage")}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <AttendanceStatusBadge status={row.getValue("status")} />
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (!data) {
      toast({
        title: "No attendance report found",
        description: "No attendance report is available at this time",
      });
    } else {
      toast({
        title: "Attendance report loaded successfully",
        description: "You can see attendance report.",
      });
    }
  }, [data]);

  return (
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
  );
};
