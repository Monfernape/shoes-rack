"use client";
import React, { useMemo, useState, useEffect } from "react";
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
import { useSearchParams } from "next/navigation";

interface Props {
  missingShoesReports: MissingShoeReport[];
  error: PostgrestError | null;
}

export const MissingShoes = ({ missingShoesReports, error }: Props) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("key") ?? ""; 
  const [filteredReports, setFilteredReports] = useState<MissingShoeReport[]>(missingShoesReports);

  useEffect(() => {
    if (searchQuery) {
      const filteredData = missingShoesReports.filter((report) =>
        report.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredReports(filteredData);
    } else {
      setFilteredReports(missingShoesReports);
    }
  }, [searchQuery, missingShoesReports]);

  if (error) {
    toast({
      title: error.message,
    });
  }

  const columns: ColumnDef<MissingShoeReport>[] = useMemo(
    () => [
      {
        accessorKey: "ownerName",
        header: () => <div className="text-center">Owner name</div>,
        cell: ({ row }) => (
          <div className="capitalize overflow-hidden text-ellipsis">
            {row.getValue("ownerName")}
          </div>
        ),
      },
      {
        accessorKey: "ownerPhoneNumber",
        header: () => <div className="text-center">Phone number</div>,
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("ownerPhoneNumber")}</div>
        ),
      },
      {
        accessorKey: "time",
        header: () => <div className="text-center">Time lost</div>,
        cell: ({ row }) => (
          <div className="capitalize overflow-hidden text-ellipsis" suppressHydrationWarning>
            {`${new Date(row.getValue("time")).toLocaleDateString()}`}
          </div>
        ),
      },
      {
        accessorKey: "shoesToken",
        header: () => <div className="text-center">Shoes token</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("shoesToken")}</div>,
      },
      {
        accessorKey: "status",
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => (
          <div>
            <MissingShoesStatusBadge status={row.getValue("status")} />
          </div>
        ),
      },
      {
        accessorKey: "id",
        enableHiding: false,
        header: () => <div>Action</div>,
        cell: ({ row }) => (
          <div>
            <MissingShoesActions key={row.getValue("id")} missingShoesId={row.getValue("id")} />
          </div>
        ),
      },
    ],
    []
  );

  const addMissingShoes = () => {};

  const table = useReactTable({
    data: filteredReports,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const StandardPageProps = {
    hasContent: !!filteredReports.length,
    title: "Add missing shoes",
    description: "This is where you can see all missing shoes.",
    buttonIcon: <PlusIcon />,
    icon: <ExclamationTriangleIcon />,
    actionButton: true,
    onAction: addMissingShoes,
    labelForActionButton: "Add shoe",
  };

  return (
    <>
      {filteredReports.length === 0 && !searchQuery ? (
        <StandardPage {...StandardPageProps} />
      ) : (
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
            {filteredReports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 font-med text-center">
                  No Missing Shoes Found.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="max-w-28 overflow-hidden whitespace-nowrap text-ellipsis">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};
