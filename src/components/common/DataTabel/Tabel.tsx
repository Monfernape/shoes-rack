"use client";

import React from "react";
import {
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
import { Member } from "@/types";
import useGroupedData from "@/hooks/use-group-data";

type DataTableProps = {
  data: Member[];
  columns: any;
  isGroupData: boolean;
};

export const DataTabel = ({ data, columns, isGroupData }: DataTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const groupedData = useGroupedData(data, "shift");

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
          {isGroupData
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
