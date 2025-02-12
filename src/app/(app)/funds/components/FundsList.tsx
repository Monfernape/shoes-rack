"use client";
import React, { useEffect, useState, useTransition } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { Routes } from "@/lib/routes";
import { PageLayout } from "@/app/layout/PageLayout";
import { NoDataFound } from "@/common/NoDataFound";
import { DataSpinner } from "@/common/Loader/Loader";

export function FundsList({ funds }: { funds: Fund[] }) {
  const searchParams = useSearchParams();
  const searchQuery: string | null = searchParams.get("key");
  const [filteredFunds, setFilteredFunds] = useState<Fund[]>(funds);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (searchQuery) {
      startTransition(() => {
        const updatedFunds = funds.filter((fund) =>
          fund.name.toLowerCase().includes(searchQuery?.toLowerCase() || "")
        );
        setFilteredFunds(updatedFunds);
      });
    } else {
      setFilteredFunds(funds);
    }
  }, [searchQuery]);

  const router = useRouter();
  const handleEdit = (id: number) => {
    router.push(`${Routes.EditFund}/${id}`);
  };

  const columns: ColumnDef<Fund>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize overflow-hidden text-ellipsis">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: () => <h4>Role</h4>,
      cell: ({ row }) => {
        return (
          <div className="capitalize">{formatRole(row.getValue("role"))}</div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => <h4 className="text-center">Amount</h4>,
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("amount")}</div>;
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
      cell: ({ row }) => (
        <div className="text-center">
          <ActionsMenu
            actions={[
              {
                id: 1,
                title: "Edit Info",
                icon: <EditIcon size={16} />,
                onClick: () => handleEdit(row.original.id),
              },
            ]}
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredFunds,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const StandardPageProps = {
    hasContent: !!filteredFunds,
    title: "Funds",
    description: "No Funds Collected yet",
    buttonIcon: <HandCoinsIcon />,
    actionButton: false,
  };

  return isPending ? (
    <div className="flex-1 h-full flex justify-center items-center">
      <div>
        <DataSpinner isInputLoader />
      </div>
    </div>
  ) : (
    <StandardPage {...StandardPageProps}>
      {filteredFunds.length !== 0 ? (
        <div className="w-full">
          <PageLayout>
            <Table className="overflow-hidden">
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
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
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
                ))}
              </TableBody>
            </Table>
          </PageLayout>
        </div>
      ) : (
        <NoDataFound />
      )}
    </StandardPage>
  );
}
