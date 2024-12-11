"use client";
import React, { useMemo } from "react";
import { StandardPage } from "@/common/StandardPage/StandardPage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MissingShoeStatus } from "@/constant/constant";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus as PlusIcon } from "lucide-react";

const shoes = [
  {
    color: "Red",
    status: MissingShoeStatus.Missing,
    size: 42,
    ownerName: "John Doe",
    ownerPhoneNumber: "+1234567890",
    ownerAddress: "123 Main St, Springfield, IL",
    time: "2024-12-09",
    type:"formal"
  },
  {
    color: "Blue",
    status: MissingShoeStatus.Found,
    size: 38,
    ownerName: "Alice Smith",
    ownerPhoneNumber: "+0987654321",
    ownerAddress: "456 Oak Rd, Rivertown, TX",
    time: "2024-12-08",
    type:"formal"
  },
];

type MissingShoes = {
  color: string;
  status: string;
  size: number;
  ownerName: string;
  ownerPhoneNumber: string;
  ownerAddress: string;
  time: string;
  type: string
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
        accessorKey: "time",
        header: "Time Lost",
        cell: ({ row }) => <div>{row.getValue("time")}</div>,
      },
      {
        accessorKey: "size",
        header: "Size",
        cell: ({ row }) => <div>{row.getValue("size")}</div>,
      },
      {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => <div>{row.getValue("color")}</div>,
      },
      {
        accessorKey: "type",
        header: "Shoes Type",
        cell: ({ row }) => <div>{row.getValue("type")}</div>,
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
    title: "Add missing shoes",
    description: "This is where you can see all missing shoes.",
    buttonIcon: <PlusIcon />,
    actionButton: true,
    onAction: addMissingShoes,
    labelForActionButton: "Add missing shoes",
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
                <TableCell key={cell.id} className="capitalize">
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
