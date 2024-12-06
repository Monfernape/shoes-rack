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
  id: string;
  attendancePercentage: string;
  attendanceStatus: AttendanceProgress;
  createdAt: string;
};

export const AttendanceReportList = ({ data }: { data: AttendanceProps[] }) => {
  const { toast } = useToast();

  const getMonth = (createdAt: string): string => {
    const date = new Date(createdAt);
    return date.toLocaleString("en-US", { month: "long" });
  }

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
        accessorKey: "createdAt",
        header: "Month",
        cell: ({ row }) => (
          <div className="capitalize">
            {getMonth(row.getValue("createdAt"))}
          </div>
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
        accessorKey: "attendanceStatus",
        header: "Status",
        cell: ({ row }) => (
          <AttendanceStatusBadge status={row.getValue("attendanceStatus")} />
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
