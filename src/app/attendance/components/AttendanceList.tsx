"use client";

import React, { useEffect } from "react";

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
import { Attendance, Member } from "@/types";
import { UserStatusBadge } from "@/common/StatusBadge/UserStatusBadge";
import { StandardPage } from "@/common/StandardPage/StandardPage";
import { Plus } from "lucide-react";
import MemberTableActionRender from "@/app/members/components/MemberActionRender";

interface AttendanceProps {
  attendance: {
    data: Attendance[];
    success: boolean;
    message: string;
  };
  members: {
    data: Member[];
    success: boolean;
    message: string;
  };
}

export const AttendanceList = ({ attendance, members }: AttendanceProps) => {
  const { toast } = useToast();
  const { data: attendanceData, success } = attendance;
  const { data: memberData } = members;

  const getNameById = (id: number) => {
    const member = memberData.find((member) => member.id === id);

    return member ? member.name : "Unknown";
  };

  const getShiftByMemberId = (memberId: number) => {
    const member = memberData.find((member) => member.id === memberId);

    return member && member.shift ? member.shift : "Unknown Shift";
  };

  const columns: ColumnDef<Attendance>[] = [
    {
      accessorKey: "memberId",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">
          {getNameById(row.getValue("memberId"))}
        </div>
      ),
    },
    {
      accessorKey: "memberId",
      header: "Shift",
      cell: ({ row }) => (
        <div className="capitalize">
          {getShiftByMemberId(row.getValue("memberId"))}
        </div>
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
        return <span>Action</span>;
      },
      cell: ({ row }) => {
        return <MemberTableActionRender memberInfo={row.original} />;
      },
    },
  ];

  const table = useReactTable({
    data: attendanceData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (!success) {
      toast({
        title: "No Attendance Found",
        description: "There are no members available at this time.",
      });
    }
  }, [success, toast]);

  const toNavigate = () => {
    alert("Navigation function triggered");
  };

  const StandardPageProps = {
    hasContent: !!attendanceData.length,
    title: "Add Attendance",
    description: "This is where you can see all attendance",
    buttonIcon: <Plus />,
    actionButton: true,
    onAction: toNavigate,
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
