import { describe, it, vi, expect } from "vitest";
import * as attendanceActions from "./attendanceActions";

const attendanceMock = {
  memberId: 3,
  startTime: "2:00",
  endTime: "4:00",
};

describe("onAttandanceRequset", () => {
  it("should call setAttendance", () => {
    const spy = vi.spyOn(attendanceActions, "onAttandanceRequset");

    attendanceActions.onAttandanceRequset(attendanceMock);

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
