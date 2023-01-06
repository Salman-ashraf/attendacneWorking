import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { selectAllEmployees } from "../employess/employeeSlice";
import SimpleDialogue from "./SimpleDialogue";

export default function RangeTable({ days, attendances }) {
  const employees = useSelector(selectAllEmployees);

  const attendances2 = attendances.map((item) => {
    const result = item.dayHours.reduce((sum, { phours }) => {
      if (phours) sum = sum + phours;
      return sum;
    }, 0);
    item.totalHours = result;
    item.employeeName = employees.find(
      (emp) => emp.id === item.employeeId
    ).name;
    return item;
  });

  const columns = days.map((item) => {
    return { id: item.id, label: new Date(item.attendanceTime).toDateString() };
  });
  columns.unshift({ id: "name", label: "Name" });
  columns.unshift({ id: "name", label: "NO." });
  columns.push({ id: "total", label: "Total Hours" });
  //  const columns = [
  //     { id: 'name', label: 'Name',  },
  //     { id: 'code', label: 'ISO\u00a0Code', },
  //     {
  //       id: 'population',
  //       label: 'Population',
  //     },
  //     {
  //       id: 'size',
  //       label: 'Size\u00a0(km\u00b2)',
  //     },
  //     {
  //       id: 'density',
  //       label: 'Density',
  //     },
  //   ];

  return (
    <>
      {attendances2 && (
        <Container sx={{ mt: 4, mb: 4 }}>
          <Paper
            sx={{
              width: "110%",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <TableContainer sx={{ maxHeight: 550 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendances2.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.employeeId}
                      >
                        <TableCell> {row.employeeId} </TableCell>
                        <TableCell> {row.employeeName} </TableCell>
                        {row.dayHours.map((column, index) => {
                          return (
                            <TableCell key={index} align={column.align}>
                              <Stack>
                                {" "}
                                {column.phours
                                  ? `${column.phours} Hours`
                                  : isNaN(column.phours)
                                  ? "TBD Hours"
                                  : ""}
                                {column.biomatricTime ? (
                                  <SimpleDialogue
                                    biometricTime={column.biomatricTime}
                                    name={row.employeeName}
                                  />
                                ) : (
                                  <h4>Absent</h4>
                                )}
                              </Stack>
                            </TableCell>
                          );
                        })}
                        <TableCell sx={{ fontWeight: "bold" }}>
                          {" "}
                          {row.totalHours} Hours{" "}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>{" "}
        </Container>
      )}
    </>
  );
}
