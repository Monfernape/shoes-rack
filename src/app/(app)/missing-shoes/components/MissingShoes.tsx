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
import { MissingShoeStatus, ShoesTyes } from "@/constant/constant";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus as PlusIcon } from "lucide-react";
import { MissingShoesStatusBadge } from "@/common/StatusBadge/MissingShoesStatusBadge";
import { MissingShoesActions } from "../MissingShoesActions";

type MissingShoes = {
  id: number;
  color: string;
  status: MissingShoeStatus;
  size: string;
  ownerName: string;
  ownerPhoneNumber: string;
  ownerAddress: string;
  time: string;
  type: ShoesTyes;
};

interface Props {
  missingShoesData: MissingShoes[];
}
export const MissingShoes = ({ missingShoesData }: Props) => {
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
        cell: ({ row }) => (
          <div>
            {<MissingShoesStatusBadge status={row.getValue("status")} />}
          </div>
        ),
      },
      {
        id: "id",
        enableHiding: false,
        header: () => {
          return <div>Action</div>;
        },
        cell: ({ row }) => (
          <div> {<MissingShoesActions missingShoesId={row.original.id} />}</div>
        ),
      },
    ],
    []
  );

  const addMissingShoes = () => {};

  const table = useReactTable({
    data: missingShoesData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const StandardPageProps = {
    hasContent: !!missingShoesData.length,
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
