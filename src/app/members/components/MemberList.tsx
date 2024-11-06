"use client";

import React, { useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import MemberTableActionRender from "./MemberActionRender";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGroupedData from "@/hooks/useGroupedData";
import { useToast } from "@/hooks/use-toast";
import { Member } from "@/types";
import { UserStatusBadge } from "@/common/StatusBadge/UserStatusBadge";
import { StandardPage } from "@/common/StandardPage/StandardPage";
import { Plus as PlusIcon } from "lucide-react";

interface Props {
  data: Member[];
  success: boolean;
  message: string;
}
export const MemberList = ({ members }: { members: Props }) => {
  const { toast } = useToast();
  const { data, success } = members;
  const columns: ColumnDef<Member>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone",
      cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    },
    {
      accessorKey: "shift",
      header: "Shift",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("shift")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("role")}</div>
      ),
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
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (!success) {
      toast({
        title: "No Members Found",
        description: "There are no members available at this time.",
      });
    }
  }, [success, toast]);

  const groupedData = useGroupedData<Member>(data, "shift");
  const toNavigate = () => {
    alert("nativgation function trigger");
  };

  const StandardPageProps = {
    hasContent: !!data.length,
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
          {groupedData.map((shiftGroup, index) => (
            <React.Fragment key={`${shiftGroup}-${index}`}>
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="bg-gray-300 text-gray-700 text-left px-4 py-2 font-bold"
                >
                  Shift {shiftGroup.shift}
                </TableCell>
              </TableRow>
              {shiftGroup.row.map((row) => (
                <TableRow key={row.id}>
                  {table
                    .getRowModel()
                    .rows.find((r) => r.original === row)
                    ?.getVisibleCells()
                    .map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
          {!groupedData.length && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No Member Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </StandardPage>
  );
};
