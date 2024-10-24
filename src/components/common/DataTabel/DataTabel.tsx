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
import useGroupedData from "@/hooks/use-group-data";

type DataTableProps<T extends Record<string, any>> = {
  data: T[];
  columns: ColumnDef<T>[];
  isGrouped: boolean;
  groupByField: string;
};

export const DataTabel = <T extends Record<string, any>>({
  data,
  columns,
  isGrouped,
  groupByField,
}: DataTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const groupedData = useGroupedData(data, groupByField);

  return (
    <div>
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
          {isGrouped
            ? groupedData.map((shiftGroup, index) => (
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
              ))
            : table.getRowModel().rows.map((row) => (
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
              ))}
        </TableBody>
      </Table>
    </div>
  );
};
