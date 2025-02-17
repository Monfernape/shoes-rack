"use client";
import React, { useEffect, useMemo, useState, useTransition } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { Routes } from "@/lib/routes";
import { NoDataFound } from "@/common/NoDataFound";
import { DataSpinner } from "@/common/Loader/Loader";

interface Props {
  missingShoesReports: MissingShoeReport[];
  error: PostgrestError | null;
}

export const MissingShoes = ({ missingShoesReports, error }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("key") ?? "";
  const [isPending, startTransition] = useTransition();

  const [filteredShoesReports, setFilteredShoesReports] =
    useState<MissingShoeReport[]>(missingShoesReports);

  useEffect(() => {
    startTransition(() => {
      const filtered = searchQuery
        ? missingShoesReports.filter((report) =>
            report.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : missingShoesReports;
      setFilteredShoesReports(filtered);
    });
  }, [searchQuery, missingShoesReports, startTransition]);

  if (error) {
    toast({
      title: error.message,
    });
  }

  const columns: ColumnDef<MissingShoeReport>[] = useMemo(
    () => [
      {
        accessorKey: "ownerName",
        header: "Owner name",
        cell: ({ row }) => (
          <div className="capitalize overflow-hidden text-ellipsis">
            {row.getValue("ownerName")}
          </div>
        ),
      },
      {
        accessorKey: "ownerPhoneNumber",
        header: () => <div>Phone number</div>,
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("ownerPhoneNumber")}</div>
        ),
      },
      {
        accessorKey: "time",
        header: () => <div>Time lost</div>,
        cell: ({ row }) => (
          <div
            className="capitalize overflow-hidden text-ellipsis"
            suppressHydrationWarning
          >
            {`${new Date(row.getValue("time")).toLocaleDateString()}`}
          </div>
        ),
      },
      {
        accessorKey: "shoesToken",
        header: () => <div className="text-center">Shoes token</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("shoesToken")}</div>
        ),
      },
      {
        accessorKey: "status",
        header: () => <div className="ml-4">Status</div>,
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
            <MissingShoesActions
              key={row.getValue("id")}
              missingShoeReport={row.original}
            />
          </div>
        ),
      },
    ],
    []
  );

  const addMissingShoes = () => {};

  const table = useReactTable({
    data: filteredShoesReports,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const standardPageProps = {
    hasContent: !!filteredShoesReports.length,
    title: "Add missing shoes",
    description: "This is where you can see all missing shoes.",
    buttonIcon: <PlusIcon />,
    icon: <ExclamationTriangleIcon />,
    actionButton: true,
    onAction: addMissingShoes,
    labelForActionButton: "Add shoes",
  };

  const handleViewDetails = (id: number) => {
    router.push(`${Routes.MissingShoesDetails}/${id}`);
  };

  return !isPending ? (
    <>
      {filteredShoesReports.length === 0 && !searchQuery ? (
        <StandardPage {...standardPageProps} />
      ) : filteredShoesReports.length === 0 ? (
        <NoDataFound />
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
            {filteredShoesReports.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 font-med text-center"
                >
                  No Missing Shoes Found.
                </TableCell>
              </TableRow>
            ) : (
              filteredShoesReports.map((row: MissingShoeReport) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleViewDetails(Number(row.id))}
                   className="cursor-pointer"
                >
                  {table
                    .getRowModel()
                    .rows.find((r) => r.original === row)
                    ?.getVisibleCells()
                    .map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="max-w-28 overflow-hidden whitespace-nowrap text-ellipsis "
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </>
  ) : (
    <DataSpinner />
  );
};
