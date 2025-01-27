"use client";

import React from "react";
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
import { LeaveRequestsTypes, UserDetails } from "@/types";
import { StandardPage } from "@/common/StandardPage/StandardPage";
import { Plus as PlusIcon, ClipboardIcon } from "lucide-react";
import { StatusBadge } from "@/common/StatusBadge/StatusBadge";
import LeaveTableActionRender from "./LeaveActionRender";
import { useRouter, useSearchParams } from "next/navigation";
import { Routes } from "@/lib/routes";
import { NoDataFound } from "@/common/NoDataFound";

interface LeaveRequest extends LeaveRequestsTypes {
  requestedBy: string;
}
interface LeavesRequestList {
  leaves: LeaveRequest[];
  loginUser: UserDetails;
}
export const LeavesRequestList = ({ leaves, loginUser }: LeavesRequestList) => {
  const searchParams = useSearchParams();
  const id = searchParams.toString();

  const route = useRouter();
  const handleNavigate = () => {
    route.push(Routes.AddLeaveRequest);
  };

  const StandardPageProps = {
    hasContent: !!leaves?.length,
    title: "Add Leave",
    description: "This is where you can see leave requests",
    buttonIcon: <PlusIcon />,
    icon: <ClipboardIcon />,
    actionButton: true,
    onAction: handleNavigate,
    labelForActionButton: "Add Leave",
  };

  const columns: ColumnDef<LeaveRequest>[] = [
    {
      accessorKey: "requestedBy",
      header: "Requested by",
      cell: ({ row }) => (
        <div className="capitalize overflow-hidden text-ellipsis ">
          {row.getValue("requestedBy")}
        </div>
      ),
    },
    {
      accessorKey: "leaveType",
      header: "Leave type",
      cell: ({ row }) => (
        <div className="capitalize ml-2">{row.getValue("leaveType")}</div>
      ),
    },
    {
      accessorKey: "startDate",
      header: () => <h4 className=" ml-1">Start date</h4>,
      cell: ({ row }) =>  <div className="ml-2">{new Intl.DateTimeFormat().format(new Date(row.getValue("startDate")))}</div>
     

    },
    {
      accessorKey: "endDate",
      header: () => <h4 className="ml-1">End date</h4>,
      cell: ({ row }) =>  <div className="ml-2">{new Intl.DateTimeFormat().format(new Date(row.getValue("endDate")))}</div>,
    },
    {
      accessorKey: "status",
      header: () => <h4 className="ml-4">Status</h4>,
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
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
            leaveRequestDetails={row.original}
            loginUser={loginUser}
          />
        );
      },
    },
  ];

  const table = useReactTable({
    data: leaves,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (id && !leaves?.length) {
    return <NoDataFound />;
  }

  const handleViewDetails = (requestId: number) => {
    route.push(`${Routes.LeaveRequestDetails}/${requestId}`);
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
            <TableRow key={row.id} onClick={() => handleViewDetails(row.id)}  className="cursor-pointer">
              {table
                .getRowModel()
                .rows.find((r) => r.original === row)
                ?.getVisibleCells()
                .map((cell) => (
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
