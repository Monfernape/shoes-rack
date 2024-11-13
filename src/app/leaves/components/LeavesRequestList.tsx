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
import useGroupedData from "@/hooks/useGroupedData";
import { LeaveRequestsTypes, LeavesRequestStatus } from "@/types";
import { StandardPage } from "@/common/StandardPage/StandardPage";
import { Plus as PlusIcon } from "lucide-react";
import { LeavesStatusBadge } from "@/common/StatusBadge/LeavesStatusBadge";
import LeaveTableActionRender from "./LeaveActionRender";

const leaveRequests = [
  {
    id: 1,
    leaveType: "Sick Leave",
    startDate: "2024-11-01",
    endDate: "2024-11-03",
    status: "accepted",
    reasonForLeave: "Flu",
    requestedBy: "John Doe",
  },
  {
    id: 2,
    leaveType: "Vacation",
    startDate: "2024-12-10",
    endDate: "2024-12-20",
    status: "pending",
    reasonForLeave: "Family vacation",
    requestedBy: "Jane Smith",
  },
  {
    id: 3,
    leaveType: "Personal Leave",
    startDate: "2024-11-15",
    endDate: "2024-11-16",
    status: "accepted",
    reasonForLeave: "Personal matter",
    requestedBy: "Emily Johnson",
  },
  {
    id: 4,
    leaveType: "Maternity Leave",
    startDate: "2024-12-01",
    endDate: "2025-05-31",
    status: "pending",
    reasonForLeave: "Childbirth",
    requestedBy: "Sarah Brown",
  },
  {
    id: 5,
    leaveType: "Unpaid Leave",
    startDate: "2024-11-20",
    endDate: "2024-11-25",
    status: "rejected",
    reasonForLeave: "Travel",
    requestedBy: "Michael Lee",
  },
];

export const LeavesRequestList = () => {
  const columns: ColumnDef<LeaveRequestsTypes>[] = useMemo(
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
          return (
            <LeaveTableActionRender
              leaveRequestId={row?.original?.id as number}
              leaveRequestStatus={row?.original?.status as LeavesRequestStatus}
            />
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: leaveRequests,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const groupedData = useGroupedData(leaveRequests, "shift");
  const toNavigate = () => {
    alert("nativgation function trigger");
  };

  const StandardPageProps = {
    hasContent: !!leaveRequests.length,
    title: "Add member",
    description: "This is where you can see all shoes rack members",
    buttonIcon: <PlusIcon />,
    actionButton: true,
    onAction: toNavigate,
    labelForActionButton: "Add member",
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
          {leaveRequests.map((row: LeaveRequestsTypes) => (
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
          {!groupedData.length && (
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
