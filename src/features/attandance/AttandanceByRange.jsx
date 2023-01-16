import {
  Autocomplete,
  Container,
  TextField,
  Button,
  ClickAwayListener,
} from "@mui/material";
import React, { useEffect } from "react";
import "react-date-range/dist/styles.css";
import { DateRangePicker } from "react-date-range";
import { subDays } from "date-fns";
import { useState } from "react";
import "react-date-range/dist/theme/default.css";
import { Box } from "@mui/system";
import DateRangeIcon from "@mui/icons-material/DateRange";
import {
  fetchAllAttandanceBetweenDate,
  selectAllAttandance,
} from "./attandaceSlice";
import { useDispatch, useSelector } from "react-redux";
import RangeAttendancesTable from "./RangeAttendancesTable";
import { selectAllEmployees } from "../employess/employeeSlice";
import { get_productive_hours } from "./usefulFunctions";

export const AttandanceByRange = () => {
  const [user, setUser] = React.useState("");
  const [range, setRange] = useState([
    {
      startDate: subDays(new Date(), 8),
      endDate: subDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const employees = useSelector(selectAllEmployees);
  const employeesList = employees.map((item) => {
    return { id: item.id, label: item.name };
  });

  const get_Allattandance = (ar) => {
    if (ar) {
      const result = ar
        .map((item) => {
          return { attendanceTime: item.attendanceTime, state: item.state };
        })
        .filter((item) => item && item);
      result.sort((a, b) => {
        return new Date(a.attendanceTime) - new Date(b.attendanceTime);
      });
      return result;
    }
    return null;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchAllAttandanceBetweenDate({
        fromDate: range[0].startDate,
        toDate: range[0].endDate,
      })
    );
  }, [range]);

  const attendances = useSelector(selectAllAttandance);
  const uniqueAttendance = [
    ...new Map(attendances.map((v) => [v.employeeId, v])).values(),
  ];

  const employeeAttendance = [];
  for (let i = 0; i < uniqueAttendance.length; i++) {
    let arr;
    arr = attendances.filter((item) => {
      const flag = item.employeeId === uniqueAttendance[i].employeeId;
      if (flag) return item;
    });
    employeeAttendance.push(arr);
  }

  const uniqueDates = [
    ...new Map(
      attendances.map((v) => [new Date(v.attendanceTime).toDateString(), v])
    ).values(),
  ];
  uniqueDates.sort((a, b) => {
    return new Date(a.attendanceTime) - new Date(b.attendanceTime);
  });

  const allAttendeces = [];
  for (let e = 0; e < employeeAttendance.length; e++) {
    let myar = { employeeId: null, dayHours: [] };
    if (employeeAttendance[e]) {
      myar.employeeId = employeeAttendance[e][0].employeeId;

      for (let i = 0; i < uniqueDates.length; i++) {
        const onedayAttendance = employeeAttendance[e].filter((item) => {
          const flag =
            new Date(item.attendanceTime).toDateString() ===
            new Date(uniqueDates[i].attendanceTime).toDateString();
          if (flag) return item;
        });
        if (onedayAttendance.length > 1) {
          const biomatricTime = get_Allattandance(onedayAttendance);
          const phours = get_productive_hours(biomatricTime);
          myar.dayHours.push({
            biomatricTime,
            phours,
            date: uniqueDates[i].attendanceTime,
          });
        } else {
          myar.dayHours.push({
            biomatricTime: null,
            phours: null,
            date: uniqueDates[i].attendanceTime,
          });
        }
      }
    }

    allAttendeces.push(myar);
  }

  const allAttendeces2 = allAttendeces.filter((item) => {
    if (user) return item.employeeId == user.id;
    return item;
  });

  const [open, setOpen] = useState(false);
  const styles = {
    position: "fixed",
    bgcolor: "background.paper",
    zIndex: 2,
  };
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };
  const handleDate = (item) => {
    setRange([item.selection]);
  };
  const hanldeAutoCompleteChanges = (event, newValue) => {
    setUser(newValue);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Autocomplete
          onChange={hanldeAutoCompleteChanges}
          disablePortal
          options={employeesList}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Name" />}
        />
      </Container>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <ClickAwayListener
          mouseEvent="onMouseDown"
          touchEvent="onTouchStart"
          onClickAway={handleClickAway}
        >
          <Box>
            <Button
              variant="outlined"
              startIcon={<DateRangeIcon />}
              onClick={handleClick}
              size="large"
            >
              Select Range
            </Button>
            {open ? (
              <Box sx={styles}>
                <DateRangePicker
                  onChange={handleDate}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={range}
                  direction="horizontal"
                />
              </Box>
            ) : null}
          </Box>
        </ClickAwayListener>
      </Container>
      <RangeAttendancesTable days={uniqueDates} attendances={allAttendeces2} />
    </>
  );
};