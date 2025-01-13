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
import { DigestStatus, MemberRole, Shift } from "@/constant/constant";
import { Attendance, AttendanceReviewStatus, Digest, User } from "@/types";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState, useTransition } from "react";
import { AttendanceReviewAction } from "./AttendanceReviewAction";
import { updateAttendanceDigest } from "../../actions/update-attendance-digest";
import { toast } from "@/hooks/use-toast";
import { DataSpinner } from "@/common/Loader/Loader";

type Attendances = Omit<
  Attendance,
  "memberId" | "created_at" | "member" | "status"
>;

interface AttendanceReviewType extends Attendances {
  status: AttendanceReviewStatus;
}

const attendanceDigest = {
  id: 4,
  created_at: "09/01/2025",
  status: DigestStatus.Pending,
  presents: [],
  absents: [],
  leaves: [],
};

const AttendanceList = [
  {
    id: 1,
    name: "John Doe",
    shift: Shift.ShiftA,
    startTime: "08:00",
    endTime: "16:00",
    status: AttendanceReviewStatus.Pending,
  },
  {
    id: 2,
    name: "Jane Smith",
    shift: Shift.ShiftA,
    startTime: "16:00",
    endTime: "00:00",
    status: AttendanceReviewStatus.Pending,
  },
  {
    id: 3,
    name: "Bob Johnson",
    shift: Shift.ShiftA,
    startTime: "",
    endTime: "",
    status: AttendanceReviewStatus.Pending,
  },
];

type Props = {
  loginUser: User;
};
export const AttendanceReview = ({ loginUser }: Props) => {
  const [attendances, setTodayAttendance] = useState(AttendanceList);
  const [isPending, startTransition] = useTransition();

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

  const columns: ColumnDef<AttendanceReviewType>[] = useMemo(
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
              <AttendanceReviewAction
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
        const attendanceId = attendance.id;
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
        const { id, created_at } = attendanceDigest;
        const digest: Digest = {
          id,
          created_at,
          status: DigestStatus.Confirmed,
          presents,
          absents,
          leaves,
        };
        if (attendanceDigest.status === DigestStatus.Pending) {
          const response = await updateAttendanceDigest({ digest });
          if ("error" in response) {
            toast({
              title: "Error updating digest",
              description: response.error,
            });
          } else {
            toast({
              title: "The attendance digest was updated successfully.",
              description: "The attendance digest record has been updated.",
            });
          }
        }
      } catch (error) {
        if (error instanceof Error){
        toast({
          title: "Error",
          description: error.message,
        });
        }}
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
          {attendanceDigest.status === DigestStatus.Pending && (
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
