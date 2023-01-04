import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import Title from "./Title";
import SimpleDialogue from "./SimpleDialogue";
import {
  fetchAllAttandanceOfDate,
  getError,
  getStatus,
  selectAllAttandance,
} from "./attandaceSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAllEmployees } from "../employess/employeeSlice";



export default function AttandanceTable({ date }) {

  const attendanceStatus=useSelector(getStatus)
  const attendanceError=useSelector(getError);
  
  const employees = useSelector(selectAllEmployees);
  const attendanceData = useSelector(selectAllAttandance);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllAttandanceOfDate({ date: new Date(date).toISOString() }));
  }, [date]);

  const uniqueAttendance = [
    ...new Map(attendanceData.map((v) => [v.employeeId, v])).values(),
  ];
  

  const absentEmployees=employees.filter(emp=>
    {
      return !uniqueAttendance.find(item=>item.employeeId==emp.id)
    })
    


  //this funtions will give array of all attandces of single user
  const get_specificUser_byId = (id) => {
    return attendanceData.filter((item) => item.employeeId == id);
  };

  //return difference between two time
  const diff_hours = (dt2, dt1) => {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60;
    return Math.abs(Math.round(diff));
  };

  //return productive hours for one user of his first checkin nd last checkout
  const get_productive_hours = (oneUser) => {
    let checkin, checkout;
       console.log(oneUser)
    if (oneUser[0].state === "checkin") {
      checkin = oneUser[0].attendanceTime;
    }

    for (let i = 0; i < oneUser.length; i++) {
      if (oneUser[i].state === "checkout") checkout = oneUser[i].attendanceTime;
    }

    return diff_hours(new Date(checkin), new Date(checkout));
  };

  const get_Allattandance = (id) => {
    const result = attendanceData
      .map((item) => {
        return item.employeeId == id
          ? { attendanceTime: item.attendanceTime, state: item.state }
          : null;
      })
      .filter((item) => item && item);
    result.sort((a, b) => {
      return new Date(a.attendanceTime) - new Date(b.attendanceTime);
    });
    // console.log(result);
    return result;
  };

 


  const attandanceRows = uniqueAttendance.map((item) => {
    return {
      id: item.employeeId,
      date: new Date(item.attendanceTime).toDateString(),
      name: item.employee.name,
      biometricTime: get_Allattandance(item.employeeId),
      phours: get_productive_hours(get_Allattandance(item.employeeId)),
    };
  });

  console.log(attandanceRows)
  
  let content;
  if(attendanceStatus=='pending')
  {
      content=<h2>Loading...</h2>
  }
  
  else if(attendanceStatus=='fulfilled')
      {
  
  
         
      content=(  <> <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Title>Attendance of {date.toDateString()}</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Working Hours</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attandanceRows.map((row,index) => (
                  <TableRow key={row.id}>
             
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">
                      {row.phours ? `${row.phours} Hours` : "TBD Hours"}

                      <SimpleDialogue
                        //sending props as array of all checkin and chechkout
                        biometricTime={row.biometricTime}
                        name={row.name}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>

<Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
<Grid container spacing={3}>
  <Grid item xs={12}>
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Title>Absent on {date.toDateString()}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            {/* <TableCell>Name</TableCell> */}
            <TableCell align="right">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {absentEmployees.map((row,index) => (
            <TableRow key={row.id}>
              {/* <TableCell>{row.date}</TableCell> */}
              <TableCell>{index+1}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </Grid>
</Grid>
</Container>
    </>  )}
      
  else if(attendanceStatus=='rejected')
  { 
      content=<p>Some Error Occured{attendanceError}</p>
      
  }
  
  
  

   
  return (
    <>
      
      {content}
      
        



    </>
  );
}

//useful link

// https://stackoverflow.com/questions/15517024/how-to-assume-local-time-zone-when-parsing-iso-8601-date-string

//  correct way to convert iso to local by removing last z
//  var date = new Date("2022-12-01T18:46:09.993Z".slice(0, -1));
//  console.log(date);

//  correct way to convert local  to iso

//  const getisoDate = (dt) => {
//   let off = dt.getTimezoneOffset() * 60000
//   let newdt = new Date(dt - off).toISOString()
//   //console.log(newdt);
// }





// const get_productive_hours=(id)=> {
//   const userbyid = get_specificUser_byId(id);
//   if (userbyid.length % 2 === 0 && userbyid.length>1) {
//     console.log("valid");
   
//     let sum=0;
//     for (let i=0;i<=userbyid.length/2;i=i+2)
//      {
//       sum=sum+diff_hours(new Date(userbyid[i].attendanceTime.slice(0, -1)),new Date(userbyid[i+1].attendanceTime.slice(0, -1)))
//      }
//    return sum;      
//   } else {
//     console.log("invalid");
//   }
// }