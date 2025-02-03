"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AttendanceStatus,
  DigestStatus,
  MemberRole,
  Shift,
} from "@/constant/constant";
import {
  AttendanceReviewStatus,
  Digest,
  LeavesDigest,
  LeavesRequestStatus,
  User,
  AttendnaceDigest,
} from "@/types";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState, useTransition } from "react";
import { updateAttendanceDigest } from "../../actions/update-attendance-digest";
import { toast } from "@/hooks/use-toast";
import { DataSpinner } from "@/common/Loader/Loader";
import { DigestActions } from "./DigestActions";
import DigestReviewsFilter from "./DigestReviewsFilter";
import { useParams, useSearchParams } from "next/navigation";

interface DigestData {
  id: number;
  created_at: string;
  status: DigestStatus;
  presents: AttendnaceDigest[];
  absents: AttendnaceDigest[];
  leaves: LeavesDigest[];
}
type Props = {
  loginUser: User;
  digest: DigestData;
};

export type DigestListItems = {
  id: number;
  memberId: number;
  name: string;
  shift: Shift;
  startTime: string;
  endTime: string;
  status: AttendanceReviewStatus | LeavesRequestStatus | AttendanceStatus;
};

export const DigestReviews = ({ loginUser, digest }: Props) => {
  const { id, absents, presents, leaves, created_at, status } = digest;
  const disgetList = [...absents, ...presents, ...leaves];

  const digestListItems: DigestListItems[] = disgetList.map((item) => {
    return {
      id: item.id,
      memberId: item.memberId,
      name: item.members.name,
      shift: item.members.shift,
      startTime: item.startTime,
      endTime: item.endTime,
      status: item.startTime ? item.status : AttendanceReviewStatus.Leave,
    };
  });

  const [attendances, setTodayAttendance] = useState(digestListItems);
  const [isPending, startTransition] = useTransition();

  const params = useSearchParams().get('date');
  const date = params?.split(" ")[0];
  const onMarkAttendance = (
    attendanceId: number,
    status: AttendanceReviewStatus
  ) => {
    setTodayAttendance((prevAttendance) =>
      prevAttendance.map((attendance) =>
        attendance.id === attendanceId ? { ...attendance, status } : attendance
      )
    );
  };

  const columns: ColumnDef<DigestListItems>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "startTime",
        header: "Start Time",
        cell: ({ row }) => (
          <div>
            {row.getValue("startTime") ? row.getValue("startTime") : "--"}
          </div>
        ),
      },
      {
        accessorKey: "endTime",
        header: () => <div className="text-center">End Time</div>,
        cell: ({ row }) => (
          <div className="text-center">
            {row.getValue("endTime") ? row.getValue("endTime") : "--"}
          </div>
        ),
      },
      {
        id: "id",
        accessorKey: "status",
        enableHiding: false,
        header: () => {
          return <div className="text-right mr-6">Action</div>;
        },
        cell: ({ row }) => {
          return (
            <div className="flex justify-end items-center">
              <DigestActions
                attendnaceId={row.original.id}
                attendanceStatus={row.original.status}
                onMarkAttendance={onMarkAttendance}
              />
            </div>
          );
        },
      },
    ],
    [attendances, loginUser]
  );

  const submitAttendaceReviewDigest = (): void => {
    const presents: number[] = [];
    const absents: number[] = [];
    const leaves: number[] = [];

    if (Array.isArray(attendances)) {
      attendances.forEach((attendance) => {
        const attendanceId = attendance.memberId;
        switch (attendance.status) {
          case AttendanceReviewStatus.Approve:
            presents.push(attendanceId);
            break;
          case AttendanceReviewStatus.Reject:
            absents.push(attendanceId);
            break;
          case AttendanceReviewStatus.Leave:
            leaves.push(attendanceId);
            break;
          default:
            break;
        }
      });
    }
    startTransition(async () => {
      try {
        const digestPayload: Digest = {
          id,
          created_at,
          status: DigestStatus.Confirmed,
          presents,
          absents,
          leaves,
        };
        if (status === DigestStatus.Pending) {
          try {
            await updateAttendanceDigest({ digestPayload });
            toast({
              title: "Verification successfully",
            });
          } catch (error) {
            if (error instanceof Error) {
              toast({
                title: error.message,
                description: "Please try again.",
              });
            }
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Error",
            description: error.message,
          });
        }
      }
    });
  };

  const table = useReactTable({
    data: attendances,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnVisibility: {
        shift: loginUser?.role === MemberRole.Incharge,
      },
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6 ">
        <h4 className="text-xs text-gray-700">
          Digest for <b>Date :</b> {date} <b>{}</b>
        </h4>
        <DigestReviewsFilter />
      </div>
      <Card>
        <CardContent className="pt-6">
          <Table className="">
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
                    <TableCell key={cell.id} className="p-4">
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
          {digest.status === DigestStatus.Pending && (
            <div className="flex justify-end p-4">
              <Button
                className="text-xs"
                disabled={isPending}
                onClick={() => submitAttendaceReviewDigest()}
              >
                Submit {isPending && <DataSpinner />}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
