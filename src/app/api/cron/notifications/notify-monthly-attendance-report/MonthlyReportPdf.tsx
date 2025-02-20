import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontSize: 7,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    width: "100% !important",
    orientation: "portrait",
  },
  title: {
    fontSize: 8,
    marginBottom: 16,
    textAlign: "center",
    color: "#1f2937",
    width: "100%",
  },
  tableContainer: {
    width: "100% !important",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    marginBottom: 8,
    paddingBottom: 6,
    paddingTop: 12,
    width: "100% !important",
    alignItems: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    paddingVertical: 6,
    width: "100% !important",
    alignItems: "center",
  },
  cell: {
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 7,
    width: "100% !important",
  },
  headerCell: {
    flex: 1,
    fontSize: 7,
    textAlign: "left",
    paddingLeft: 16,
    paddingRight: 16,
    width: "100% !important",
  },
});

export type AttendanceReportItem = {
  name: string;
  attendancePercentage: string;
  status: string;
  presents: number;
  absents: number;
  leaves: number;
};

export const MonthlyAttendancePdf = ({
  attendanceReport,
}: {
  attendanceReport: AttendanceReportItem[];
}) => {
  return (
    <Document>
      <Page object-fit="fill" style={styles.page} size="A4">
        <View object-fit="fill" style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Name</Text>
            <Text style={styles.headerCell}>Attendance %</Text>
            <Text style={styles.headerCell}>Status</Text>
            <Text style={styles.headerCell}>Present</Text>
            <Text style={styles.headerCell}>Absent</Text>
            <Text style={styles.headerCell}>Leave</Text>
          </View>

          {/* Table Rows */}
          {attendanceReport.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.attendancePercentage}</Text>
              <Text style={styles.cell}>{item.status}</Text>
              <Text style={styles.cell}>{item.presents}</Text>
              <Text style={styles.cell}>{item.absents}</Text>
              <Text style={styles.cell}>{item.leaves}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
