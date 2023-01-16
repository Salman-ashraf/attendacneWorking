import {
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { getStatus } from "./attandaceSlice";
import { selectAllEmployees } from "../employess/employeeSlice";
import SimpleDialogue from "./SimpleDialogue";
import EnhancedTableHead from "./subcomponents/EnhancedTableHead";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function RangeAttendancesTable({ days, attendances }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("deviceId");
  const employees = useSelector(selectAllEmployees);
  const attendanceStatus = useSelector(getStatus);

  const columns = days.map((item) => {
    return { id: item.id, label: new Date(item.attendanceTime).toDateString() };
  });

  columns.unshift({ id: "Employeename", label: "Name" });
  columns.unshift({ id: "deviceId", label: "DeviceId" });
  columns.push({ id: "working_hours", label: "Total Hours" });
  //  const columns = [

  const attendances2 = attendances.map((item) => {
    const result = item.dayHours.reduce((sum, { phours }) => {
      if (phours) sum = sum + phours;
      return sum;
    }, 0);
    item.working_hours = result;
    item.employeeName = employees.find(
      (emp) => emp.id === item.employeeId
    ).name;
    item.deviceId = employees.find(
      (emp) => emp.id === item.employeeId
    ).deviceId;
    return item;
  });
  


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  console.log(attendanceStatus);
  return (
    <>

        <Container  sx={{ mb: 4,    boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", }}>
        <Paper sx={{ width: '100%', overflow: 'hidden', }}>
         <TableContainer sx={{ maxHeight: 560 }}>
              <Table aria-label="sticky table">
                <EnhancedTableHead
                  headCells={columns}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={attendances2.length}
                />


                <TableBody>

                {attendanceStatus == "pending" ?  (
           <TableRow>
           <TableCell><h2> Loading</h2> </TableCell>
         </TableRow>
      ) :  attendanceStatus=='rejected' ? (          <TableRow>
        <TableCell><h2>No Result Found</h2></TableCell>
      </TableRow>): (
        <>
                  {stableSort(attendances2, getComparator(order, orderBy)).map(
                    (row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.deviceId}
                        >
                          <TableCell> {row.deviceId} </TableCell>
                          <TableCell> {row.employeeName} </TableCell>
                          {row.dayHours.map((column, index) => {
                            return (
                              <TableCell key={index}>
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
                          <TableCell sx={{ fontWeight: "bold" }} align='right'>
                            {" "}
                            {row.working_hours} Hours{" "}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
              </>  )}</TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>

    </>
  );
}
