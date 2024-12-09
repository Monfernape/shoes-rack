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
import { LeaveRequestsTypes } from "@/types";
import { StandardPage } from "@/common/StandardPage/StandardPage";
import { Plus as PlusIcon } from "lucide-react";
import { LeavesStatusBadge } from "@/common/StatusBadge/LeavesStatusBadge";
import LeaveTableActionRender from "./LeaveActionRender";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";

interface LeaveRequest extends LeaveRequestsTypes {
  requestedBy: string;
}
interface LeavesRequestList {
  leaves: LeaveRequest[];
}
export const LeavesRequestList = ({ leaves }: LeavesRequestList) => {
  const route = useRouter();
  const columns: ColumnDef<LeaveRequest>[] = useMemo(
    () => [
      {
        accessorKey: "requestedBy",
        header: "Requested By",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("requestedBy")}</div>
        ),
      },
      {
        accessorKey: "leaveType",
        header: "Leave Type",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("leaveType")}</div>
        ),
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => <div>{row.getValue("startDate")}</div>,
      },
      {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) => <div>{row.getValue("endDate")}</div>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <LeavesStatusBadge status={row.getValue("status")} />
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        header: () => {
          return <span>Action</span>;
        },
        cell: ({ row }) => {
          return <LeaveTableActionRender leaveRequestDetails={row.original} />;
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: leaves,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleNavigate = () => {
    route.push(Routes.AddLeaveRequest);
  };

  const StandardPageProps = {
    hasContent: !!leaves?.length,
    title: "Add Leave",
    description: "This is where you can see leave requests",
    buttonIcon: <PlusIcon />,
    actionButton: true,
    onAction: handleNavigate,
    labelForActionButton: "Add Leave",
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
          {leaves?.map((row: LeaveRequest) => (
            <TableRow key={row.id}>
              {table
                .getRowModel()
                .rows.find((r) => r.original === row)
                ?.getVisibleCells()
                .map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
            </TableRow>
          ))}
          {!leaves?.length && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No Leave Request Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </StandardPage>
  );
};
