"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AttendanceStatus, MemberRole, Shift } from "@/constant/constant";
import { User } from "@/types";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";

export interface Attendance {
  id: number;
  name: string;
  shift: Shift;
  startTime: string;
  endTime: string;
  status: AttendanceStatus;
}

const attendance: Attendance[] = [
  {
    id: 1,
    name: "John Doe",
    shift: Shift.ShiftA,
    startTime: "08:00",
    endTime: "16:00",
    status: AttendanceStatus.Approve,
  },
  {
    id: 2,
    name: "Jane Smith",
    shift: Shift.ShiftA,
    startTime: "16:00",
    endTime: "00:00",
    status: AttendanceStatus.Approve,
  },
  {
    id: 3,
    name: "Bob Johnson",
    shift: Shift.ShiftA,
    startTime: "00:00",
    endTime: "08:00",
    status: AttendanceStatus.Approve,
  },
];

type Props = {
  loginUser: User;
};
export const CurrentAttendance = ({ loginUser }: Props) => {
  const [todayAttendance, setTodayAttendance] = useState(attendance);

  const onChangeAttendanceStatus = (id: number) => {
    setTodayAttendance((prev) => {
      return prev.map((attendance) =>
        attendance.id === id
          ? {
              ...attendance,
              status:
                attendance.status === AttendanceStatus.Approve
                  ? AttendanceStatus.Reject
                  : AttendanceStatus.Approve,
            }
          : attendance
      );
    });
  };

  const isAttendanceMarked = (id: number) => {
    const attendance = todayAttendance.find(
      (attendance) => attendance.id === id
    );
    return attendance?.status === AttendanceStatus.Approve ? true : false;
  };

  const columns: ColumnDef<Attendance>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "shift",

        header: "Shift",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("shift")}</div>
        ),
      },
      {
        accessorKey: "startTime",
        header: "Start Time",
        cell: ({ row }) => <div>{row.getValue("startTime")}</div>,
      },
      {
        accessorKey: "endTime",
        header: "End Time",
        cell: ({ row }) => <div>{row.getValue("endTime")}</div>,
      },
      {
        id: "id",
        accessorKey: "id",
        enableHiding: false,
        header: () => {
          return <div>Action</div>;
        },
        cell: ({ row }) => {
          return (
            <Switch
              className="data-[state=checked]:bg-status-active"
              checked={isAttendanceMarked(row.getValue("id"))}
              onCheckedChange={() =>
                onChangeAttendanceStatus(row.getValue("id"))
              }
            />
          );
        },
      },
    ],
    [todayAttendance, loginUser]
  );

  const table = useReactTable({
    data: todayAttendance,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnVisibility: {
        shift: loginUser?.role === MemberRole.Incharge,
      },
    },
  });

  const handelMarkAttendance = () => {
    const markAttendancePayload = todayAttendance.map(({ id, status }) => ({ id, status }));
    console.log({ markAttendancePayload })
  };
  

  return (
    <div className="p-8">
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
          <div className="flex justify-end pt-6">
            <Button className="text-xs" onClick={() => handelMarkAttendance()}>
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
