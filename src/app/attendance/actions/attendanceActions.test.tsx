import { describe, it, vi, expect } from "vitest";
import * as attendanceActions from "./attendanceActions";

const attendanceMock = {
  memberId: 3,
  startTime: "2:00",
  endTime: "4:00",
};

describe("setAttendance", () => {
  it("should call setAttendance", () => {
    const spy = vi.spyOn(attendanceActions, "setAttendance");

    attendanceActions.setAttendance(attendanceMock);

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
