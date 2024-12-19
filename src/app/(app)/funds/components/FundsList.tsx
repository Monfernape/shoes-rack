"use client";
import * as React from "react";
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
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import { Fund } from "@/types";
import { Edit as EditIcon, HandCoins as HandCoinsIcon } from "lucide-react";
import { formatRole } from "@/utils/formatRole";
import { StandardPage } from "@/common/StandardPage/StandardPage";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";




export function FundsList({ funds, }: { funds: Fund[] }) {


   const router = useRouter()
   const handleEdit = (id:number) => {
    
    router.push(`${Routes.EditFund}/${id}`)
};


  const columns: ColumnDef<Fund>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "role",
      header: () => <h4 className="text-center">Role</h4>,
      cell: ({ row }) => {
        return (
          <div className="text-center capitalize">
            {formatRole(row.getValue("role"))}
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: () => <h4 className="text-center">Created At</h4>,
      cell: ({ row }) => {
        return (
          <p className="text-center" suppressHydrationWarning>
            {new Date(row.getValue("created_at")).toLocaleDateString()}
          </p>
        );
      },
    },
    {
      id: "actions",
      header: () => <h4 className="text-center">Action</h4>,
      cell: ({row}) => (
        <div className="text-center">
          <ActionsMenu  actions={[
  {
    id: 1,
    title: "Edit Info",
    icon: <EditIcon size={16} />,
    onClick: ()=>handleEdit(row.original.id),
  },
]} />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: funds,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const StandardPageProps = {
    hasContent: !!funds ,
    title: "Funds",
    description: "No Funds Collected yet",
    buttonIcon: <HandCoinsIcon />,
    actionButton: false,

  };

  return (
    <StandardPage {...StandardPageProps}>
      <div className="w-full">
        <div className=" px-8 py-4 h-full">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </StandardPage>
  );
}
