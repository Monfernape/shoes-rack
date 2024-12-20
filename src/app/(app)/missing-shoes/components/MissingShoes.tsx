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
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus as PlusIcon } from "lucide-react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { MissingShoesStatusBadge } from "@/common/StatusBadge/MissingShoesStatusBadge";
import { MissingShoesActions } from "../add/components/MissingShoesActions";
import { MissingShoeReport } from "@/types";
import { toast } from "@/hooks/use-toast";
import { PostgrestError } from "@supabase/supabase-js";

interface Props {
  missingShoesReports: MissingShoeReport[];
  error: PostgrestError | null;
}
export const MissingShoes = ({ missingShoesReports, error }: Props) => {
  if (error) {
    toast({
      title: error ? error.message : "",
    });
  }

  const columns: ColumnDef<MissingShoeReport>[] = useMemo(
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
        accessorKey: "time",
        header: "Time Lost",
        cell: ({ row }) => <div>{row.getValue("time")}</div>,
      },
      {
        accessorKey: "shoesToken",
        header: "Shoes Token",
        cell: ({ row }) => <div>{row.getValue("shoesToken")}</div>,
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
        accessorKey: "id",
        enableHiding: false,
        header: () => {
          return <div>Action</div>;
        },
        cell: ({ row }) => (
          <div>
            {
              <MissingShoesActions
                key={row.getValue("id")}
                missingShoesId={row.getValue("id")}
              />
            }
          </div>
        ),
      },
    ],
    []
  );

  const addMissingShoes = () => {};

  const table = useReactTable({
    data: missingShoesReports,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const StandardPageProps = {
    hasContent: !!missingShoesReports.length,
    title: "Add missing shoes",
    description: "This is where you can see all missing shoes.",
    buttonIcon: <PlusIcon />,
    icon: <ExclamationTriangleIcon />,
    actionButton: true,
    onAction: addMissingShoes,
    labelForActionButton: "Add shoe",
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
