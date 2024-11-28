"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
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
import { Plus as PlusIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Member } from "@/types";
import { UserStatusBadge } from "@/common/StatusBadge/UserStatusBadge";
import { StandardPage } from "@/common/StandardPage/StandardPage";
import { Routes } from "@/lib/routes";
import { Shift } from "@/constant/constant";
import { getMembers } from "../actions/getMembers";
import { DataSpinner } from "@/common/Loader/Loader";
import { useUser } from "@/hooks/useGetLoggedinUser";
import { localNumberFormat } from "@/utils/formattedPhoneNumber";
import { formatRole } from "@/utils/formatRole";

interface Props {
  data: Member[];
  success: boolean;
  message: string;
}

export const MemberList = ({ members }: { members: Props }) => {
  const { toast } = useToast();
  const loginUser = useUser()
  const { data : membersData, success } = members;
  const route = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("key");
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredMember, setFilteredMember] = useState<Member[]>([]);
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
      cell: ({ row }) => <div>{localNumberFormat(row.getValue("phoneNumber"))}</div>,
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
        <div className="capitalize">{formatRole(row.getValue("role"))}</div>
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
        return (
          <MemberTableActionRender
            memberInfo={row.original}
            loginUser={loginUser}
          />
        );
      },
    },
  ];

  const fetchMembers = useCallback(async () => {
    const response = await getMembers(searchQuery);
    startTransition(() => {
    try {
      setFilteredMember(response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "No Members Found",
          description: error.message,
        });
      } else {
        toast({
          title: "No Members Found",
          description: "An unknown error occurred",
        });
      }
    }
  })
    
  }, [searchQuery]);

  const table = useReactTable({
    data: filteredMember,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const allShifts = [Shift.ShiftA, Shift.ShiftB, Shift.ShiftC, Shift.ShiftD];

  const groupedData = allShifts.map((shift) => {
    const usersInShift = membersData.filter((user) => user.shift === shift);
    return {
      shift: shift,
      members: usersInShift,
    };
  });
  const handleNavigation = () => {
    route.push(Routes.AddMember);
  };
  const StandardPageProps = {
    hasContent: !!membersData.length,
    title: "Add member",
    description: "This is where you can see all shoes rack members",
    buttonIcon: <PlusIcon />,
    actionButton: true,
    onAction: handleNavigation,
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
          {groupedData.map((shiftGroup, index) => (
            <React.Fragment key={`${shiftGroup}-${index}`}>
              {shiftGroup.members.length > 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="bg-gray-300 text-gray-700 text-left px-4 py-2 font-bold"
                  >
                    Shift {shiftGroup.shift}
                  </TableCell>
                </TableRow>
              )}
              {shiftGroup.members.map((row) => (
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