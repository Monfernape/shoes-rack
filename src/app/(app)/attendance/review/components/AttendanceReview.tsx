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
import React, { useMemo, useState } from "react";
import { AttendanceReviewAction } from "./AttendanceReviewAction";

type Attendances = Omit<
  Attendance,
  "memberId" | "created_at" | "member" | "status"
>;

interface AttendanceReviewType extends Attendances {
  status: AttendanceReviewStatus;
}

const attendanceDigest = {
  id: 1,
  created_date: "09/01/2025",
  status: DigestStatus.Pending,
  pending: [
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
  ],
  presents: [],
  absents: [],
  leaves: [],
};

type Props = {
  loginUser: User;
};
export const AttendanceReview = ({ loginUser }: Props) => {
  const [attendances, setTodayAttendance] = useState(attendanceDigest.pending);

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


  const submitAttendaceReviewDigest = () => {
    const pending: string[] = [];
    const presents: string[] = [];
    const absents: string[] = [];
    const leaves: string[] = [];
  
    attendances.forEach((attendance) => {
      const attendanceId = attendance.id.toString();
      
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
          pending.push(attendanceId);
          break;
      }
    });
  
    const { id, created_date } = attendanceDigest;
    
    const digestPayload: Digest = {
      id,
      created_date,
      status: DigestStatus.Confirmed,
      pending,
      presents,
      absents,
      leaves
    };
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
            <div className="flex justify-end pt-6">
              <Button
                className="text-xs"
                onClick={() => submitAttendaceReviewDigest()}
              >
                Submit
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
