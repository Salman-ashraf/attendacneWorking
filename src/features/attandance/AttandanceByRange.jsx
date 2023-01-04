import { Autocomplete, Container, TextField } from "@mui/material";
import React, { useEffect } from "react";
import "react-date-range/dist/styles.css";
import { DateRangePicker } from "react-date-range";
import { subDays } from "date-fns";
import { useState } from "react";
import "react-date-range/dist/theme/default.css";
import { Button, ClickAwayListener, Popper } from "@mui/material";
import { Box } from "@mui/system";

import DateRangeIcon from "@mui/icons-material/DateRange";
import RangeAttendanceTable from "./RangeAttendanceTable";
import {
  fetchAllAttandanceBetweenDate,
  selectAllAttandance,
} from "./attandaceSlice";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from "../employess/employeeSlice";
import RangeTable from "./RangeTable";
let cal = 2;

// import { DateRange } from './SubComponents/DateRange'

const top100Films = [
  { label: "Haider", id: 35 },
  { label: "Salman Ashraf", id: 23 },
  { label: "Amir khan", id: 33 },
  { label: "Asad", id: 20 },
];

export const AttandanceByRange = () => {
  const [user, setUser] = React.useState("");
  const [range, setRange] = useState([
    {
      startDate: subDays(new Date(), 8),
      endDate: subDays(new Date(), 1),
      key: "selection",
    },
  ]);


  const diff_hours = (dt2, dt1) => {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60;
    return Math.abs(Math.round(diff));
  };

  //return productive hours for one user of his first checkin nd last checkout
  const get_productive_hours = (oneUser) => {
    let checkin, checkout;

    if (oneUser[0].state === "checkin") {
      checkin = oneUser[0].attendanceTime;
    }

    for (let i = 0; i < oneUser.length; i++) {
      if (oneUser[i].state === "checkout") checkout = oneUser[i].attendanceTime;
    }

    return diff_hours(new Date(checkin), new Date(checkout));
  };




  const get_Allattandance = (ar) => {
    const result = ar
      .map((item) => {
        return  { attendanceTime: item.attendanceTime, state: item.state }
      })
      .filter((item) => item && item);
    result.sort((a, b) => {
      return new Date(a.attendanceTime) - new Date(b.attendanceTime);
    });
    // console.log(result);
    return result;
  };




  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchAllAttandanceBetweenDate({
        fromDate: range[0].startDate,
        toDate: range[0].endDate,
      })
    );
  }, []);
  const alld = useSelector(selectAllAttandance);
  const uniqueAttendance = [
    ...new Map(alld.map((v) => [v.employeeId, v])).values(),
  ];
  const empat = [];
  for (let i = 0; i < uniqueAttendance.length; i++) {
    let arr;
    arr = alld.filter((item) => {
      const flag =
        item.employeeId ===
        uniqueAttendance[i].employeeId
      if (flag) return item;
    });
    empat.push(arr);
  }
  // console.log('emp wise')
  // console.log(empat)
  

   const alldata=[];

   for(let e=0;e<empat.length;e++)
   {
    let myar={employeeId:null,dayHours:[]};
    if(empat[e])
      {
        const unique1 = [
          ...new Map(
            empat[e].map((v) => [new Date(v.attendanceTime).toDateString(), v])
          ).values(),
        ];
        myar.employeeId=empat[e][0].employeeId
        for (let i = 0; i < unique1.length; i++) {
        const onedayAttendance =empat[e].filter(item=>{
          const flag= new Date(item.attendanceTime).toDateString() ===
          new Date(unique1[i].attendanceTime).toDateString();
          if(flag)
          return item;
        })
         const biomatricTime=get_Allattandance(onedayAttendance)
         const phours=get_productive_hours(biomatricTime);
         myar.dayHours.push({biomatricTime,phours,date:unique1[i].attendanceTime})
      }
    }
    alldata.push(myar);
   }  
   console.log(alldata);
   

  // const uniqemp = [
  //   ...new Map(
  //     empat[0].map((v) => [new Date(v.attendanceTime).toDateString(), v])
  //   ).values(),
  // ];
  // console.log(uniqemp);
   //console.log(uniqueAttendance)
    

   const unique = [
    ...new Map(
      alld.map((v) => [new Date(v.attendanceTime).toDateString(), v])
    ).values(),
  ];

  const dayattendance = [];
  for (let i = 0; i < unique.length; i++) {
    let arr;
    arr = alld.filter((item) => {
      const flag =
        new Date(item.attendanceTime).toDateString() ===
        new Date(unique[i].attendanceTime).toDateString();
      if (flag) return item;
    });
    dayattendance.push(arr);
  }
 

  // console.log('daywise')
  // console.log(dayattendance)

  // if(dayattendance[0])
  // {
  //  const un = [
  //    ...new Map(
  //     dayattendance[0].map((v) => [new Date(v.attendanceTime).toDateString(), v])
  //    ).values(),
  //  ];
  //  console.log(un)
  // }

 // console.log(dayattendance);
  useEffect(() => {
    if (cal % 2 == 1) {
      let start = new Date(range.startDate);
      let end = new Date(range.endDate);
      while (start <= end) {
        start = addDays(new Date(start), 1);
      }
    }
    cal++;
  }, [range]);

  const [open, setOpen] = useState(false);
  const styles = {
    position: "fixed",
    bgcolor: "background.paper",
    zIndex: 1,
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

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Autocomplete
          onChange={(event, newValue) => {
            setUser(newValue);
          }}
          disablePortal
          id="combo-box-demo"
          options={top100Films}
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

      <RangeAttendanceTable range={range} />

    <RangeTable/>
  
    </>
  );
};


  //  const unique = [
  //   ...new Map(
  //     alld.map((v) => [new Date(v.attendanceTime).toDateString(), v])
  //   ).values(),
  // ];

  // const dayattendance = [];
  // for (let i = 0; i < unique.length; i++) {
  //   let arr;
  //   arr = alld.filter((item) => {
  //     const flag =
  //       new Date(item.attendanceTime).toDateString() ===
  //       new Date(unique[i].attendanceTime).toDateString();
  //     if (flag) return item;
  //   });
  //   dayattendance.push(arr);
  // }