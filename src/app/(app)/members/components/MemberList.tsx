"use client";
import React, { useEffect, useState, useTransition } from "react";
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
import { PersonIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Member } from "@/types";
import { UserStatusBadge } from "@/common/StatusBadge/UserStatusBadge";
import { StandardPage } from "@/common/StandardPage/StandardPage";
import { Routes } from "@/lib/routes";
import { MemberRole, Shift } from "@/constant/constant";
import { getMembers } from "../actions/getMembers";
import { DataSpinner } from "@/common/Loader/Loader";
import { formatRole } from "@/utils/formatRole";
import { localNumberFormat } from "@/utils/formattedPhoneNumber";

export const MemberList = ({
  members: members,
  user,
}: {
  members: Member[];
  user: Member;
}) => {
  const { toast } = useToast();
  const route = useRouter();

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("key");
  const [isPending, startTransition] = useTransition();
  const [filteredMember, setFilteredMember] = useState<Member[]>(members);
  useEffect(() => {
    if (searchQuery) {
      (async function fetchData() {
        try {
          startTransition(async () => {
            const response = await getMembers(searchQuery);
            setFilteredMember(response.data);
          });
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
      })();
    } else {
      setFilteredMember(members);
    }
  }, [searchQuery, members]);

  const columns: ColumnDef<Member>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize overflow-hidden text-ellipsis">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: () => <h4 className="ml-1">Phone number</h4>,
      cell: ({ row }) => (
        <div>{localNumberFormat(row.getValue("phoneNumber"))}</div>
      ),
    },
    {
      accessorKey: "role",
      header: () => <h4 className="ml-2">Role</h4>,
      cell: ({ row }) => (
        <div className="capitalize">{formatRole(row.getValue("role"))}</div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <h4 className="ml-5">Status</h4>,
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
          <MemberTableActionRender memberInfo={row.original} loginUser={user} />
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredMember,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const sortRole = (items: Member[]) => {
    const sortedRoles = items.sort((a, b) => {
      if (a.role === MemberRole.Incharge) {
        return -1;
      }
      if (b.role === MemberRole.Incharge) {
        return 1;
      }
      if (a.role.toLowerCase() > b.role.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    return sortedRoles;
  };

  const allShifts = [Shift.ShiftA, Shift.ShiftB, Shift.ShiftC, Shift.ShiftD];
  const groupedData = allShifts.map((shift) => {
    const usersInShift = filteredMember.filter((user) => user.shift === shift);
    const usershifts = sortRole(usersInShift);
    return {
      shift: shift,
      members: usershifts,
    };
  });

  const hasMembers = groupedData.some((group) => group.members.length > 0);

  const handleNavigation = () => {
    route.push(Routes.AddMember);
  };
  const StandardPageProps = {
    hasContent: !!members.length,
    title: "Add Member",
    description: "This is where you can add members",
    buttonIcon: <PlusIcon />,
    icon: <PersonIcon />,
    actionButton: true,
    onAction: handleNavigation,
    labelForActionButton: "Add Member",
  };

  return !isPending ? (
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
        <TableBody className="table-fixed w-full">
          {hasMembers ? (
            groupedData.map((shiftGroup, index) => (
              <React.Fragment key={`${shiftGroup.shift}-${index}`}>
                {shiftGroup.members.length > 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="bg-gray-300 text-gray-700 text-left px-4 py-2 font-bold "
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
                        <TableCell
                          key={cell.id}
                          className=" max-w-28 overflow-hidden whitespace-nowrap text-ellipsis  "
                        >
                          <div>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 font-med text-center">
                No Members Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </StandardPage>
  ) : (
    <DataSpinner />
  );
};
