"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { getAllLeaveRequests } from "../actions/get-all-leave-requests";
import { toast } from "@/hooks/use-toast";
import { DataSpinner } from "@/common/Loader/Loader";
import { Routes } from "@/lib/routes";
import { useUser } from "@/hooks/useGetLoggedinUser";

export const LeavesRequestList = () => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("key");
  const [isPending, startTransition] = useTransition();
  const [filteredLeaves, setFilteredLeaves] = useState<LeaveRequestsTypes[]>(
    []
  );
  const columns: ColumnDef<LeaveRequestsTypes>[] = useMemo(
    () => [
      {
        accessorKey: "requestedBy",
        header: "Requested By",
        cell: ({ row }) => (
          <div className="capitalize">
            {row.getValue("requestedBy") ?? "--"}
          </div>
        ),
      },
      {
        accessorKey: "leaveType",
        header: "Leave Type",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("leaveType") ?? "--"}</div>
        ),
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => <div>{row.getValue("startDate") ?? "--"}</div>,
      },
      {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) => <div>{row.getValue("endDate") ?? "--"}</div>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <LeavesStatusBadge status={row.getValue("status") ?? "--"} />
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

  const fetchMembers = useCallback(async () => {
    const response = await getAllLeaveRequests(searchQuery);
    startTransition(() => {
      try {
        setFilteredLeaves(response);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast({
            title: "No Leave Request Found",
            description: error.message,
          });
        } else {
          toast({
            title: "No Leave Request Found",
            description: "An unknown error occurred",
          });
        }
      }
    });
  }, [searchQuery]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const table = useReactTable({
    data: filteredLeaves,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleNavigate = () => {
    route.push(Routes.AddLeaveRequest);
  };

  const StandardPageProps = {
    hasContent: !!filteredLeaves.length,
    title: "Add member",
    description: "This is where you can see all shoes rack members",
    buttonIcon: <PlusIcon />,
    actionButton: true,
    onAction: handleNavigate,
    labelForActionButton: "Add member",
  };

  return (
    <StandardPage {...StandardPageProps}>
      {isPending && <DataSpinner />}
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
          {filteredLeaves?.map((row: LeaveRequestsTypes) => (
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
          {!filteredLeaves.length && (
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
