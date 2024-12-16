import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    marginBottom: 5,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  cell: {
    flex: 1,
    textAlign: "left",
  },
});

type AttendanceReportItem = {
  name: string;
  attendancePercentage: string;
  status: string;
  present: number;
  absent: number;
  leave: number;
};

export const MyDocument = ({ data }: { data: AttendanceReportItem[] }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Monthly Attendance Report</Text>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.cell}>Name</Text>
        <Text style={styles.cell}>Attendance %</Text>
        <Text style={styles.cell}>Status</Text>
        <Text style={styles.cell}>Present</Text>
        <Text style={styles.cell}>Absent</Text>
        <Text style={styles.cell}>Leave</Text>
      </View>

      {/* Table Rows */}
      {data?.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.cell}>{item.name}</Text>
          <Text style={styles.cell}>{item.attendancePercentage}</Text>
          <Text style={styles.cell}>{item.status}</Text>
          <Text style={styles.cell}>{item.present}</Text>
          <Text style={styles.cell}>{item.absent}</Text>
          <Text style={styles.cell}>{item.leave}</Text>
        </View>
      ))}
    </Page>
  </Document>
);
