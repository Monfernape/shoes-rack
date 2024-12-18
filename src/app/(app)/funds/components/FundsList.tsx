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

const funds: Fund[] = [
  {
    id: 1,
    name: "Ali",
    amount: 300,
    created_at: new Date(),
  },
  {
    id: 2,
    name: "Bilal",
    amount: 100,
    created_at: new Date(),
  },
  {
    id: 3,
    name: "Javed",
    amount: 500,
    created_at: new Date(),
  },
  {
    id: 4,
    name: "Khalid",
    amount: 200,
    created_at: new Date(),
  },
];

const handleEdit = () => {};
const action = [
  {
    id: 1,
    title: "Edit",
    icon: null,
    onClick: handleEdit,
  },
];
export const columns: ColumnDef<Fund>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <h4 className="text-center">Amount</h4>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("PKR", {
        style: "currency",
        currency: "PKR",
      }).format(amount);

      return <div className="text-center">{formatted}</div>;
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
    header:() => <h4 className="text-center">Action</h4>,
    cell: () => <div className="text-center"><ActionsMenu actions={action} /></div>,
  },
];

export function FundsList() {
  const table = useReactTable({
    data: funds,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
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
  );
}
