"use client";
import { StandardPage } from "@/common/StandardPage/StandardPage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MissingShoeStatus, Shift } from "@/constant/constant";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";
import React, { useMemo } from "react";

const shoes = [
  {
    color: "Red",
    status: MissingShoeStatus.Missing,
    size: 42,
    ownerName: "John Doe",
    ownerPhoneNumber: "+1234567890",
    ownerAddress: "123 Main St, Springfield, IL",
    date: "2024-12-09",
    shift: Shift.ShiftA,
  },
  {
    color: "Blue",
    status: MissingShoeStatus.Found,
    size: 38,
    ownerName: "Alice Smith",
    ownerPhoneNumber: "+0987654321",
    ownerAddress: "456 Oak Rd, Rivertown, TX",
    date: "2024-12-08",
    shift: Shift.ShiftB,
  },
];

type MissingShoes = {
  color: string;
  status: string;
  size: number;
  ownerName: string;
  ownerPhoneNumber: string;
  ownerAddress: string;
  date: string;
  shift: Shift;
};

export const MissingShoes = () => {
  const columns: ColumnDef<MissingShoes>[] = useMemo(
    () => [
      {
        accessorKey: "ownerName",
        header: "Owner Name",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("ownerName")}</div>
        ),
      },
      {
        accessorKey: "ownerPhoneNumber",
        header: "Phone Number",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("ownerPhoneNumber")}</div>
        ),
      },
      {
        accessorKey: "ownerAddress",
        header: "Address",
        cell: ({ row }) => <div>{row.getValue("ownerAddress")}</div>,
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => <div>{row.getValue("date")}</div>,
      },
      {
        accessorKey: "shift",
        header: "shift",
        cell: ({ row }) => <div>{row.getValue("shift")}</div>,
      },
      {
        accessorKey: "size",
        header: "size",
        cell: ({ row }) => <div>{row.getValue("size")}</div>,
      },
      {
        accessorKey: "color",
        header: "color",
        cell: ({ row }) => <div>{row.getValue("color")}</div>,
      },
      {
        accessorKey: "status",
        header: "Status",
        //Status badge will be replace with text
        cell: ({ row }) => <div>{row.getValue("status")}</div>,
      },
      {
        id: "actions",
        enableHiding: false,
        header: () => {
          return <div>Action</div>;
        },
        // Action cell will be created
      },
    ],
    []
  );

  const addMissingShoes = () => {};

  const table = useReactTable({
    data: shoes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const StandardPageProps = {
    hasContent: !!shoes.length,
    title: "Add Missing Shoes",
    description: "This is where you can see all missing shoes.",
    buttonIcon: <Plus />,
    actionButton: true,
    onAction: addMissingShoes,
    labelForActionButton: "Add Missing Shoes",
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
