import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 12,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1f2937",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#9ca3af",
    marginBottom: 8,
    paddingBottom: 6,
    backgroundColor: "#e5e7eb",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    textAlign: "left",
    paddingHorizontal: 8,
    color: "#374151",
  },
  headerCell: {
    flex: 1,
    textAlign: "left",
    paddingHorizontal: 8,
    fontWeight: "bold",
    color: "#111827",
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

export const MonthlyAttendancePdf = ({ attendanceReport }: { attendanceReport: AttendanceReportItem[] }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Monthly Attendance Report</Text>

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
    </Page>
  </Document>
);
