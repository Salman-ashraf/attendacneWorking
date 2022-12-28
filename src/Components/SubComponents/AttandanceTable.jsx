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
import React from "react";
import Title from "../Title";
import { databydate } from "../ByDate.js";
import SimpleDialogue from "./SimpleDialogue";




export default function AttandanceTable(props) {

  //this funtions will give array of all attandces fo single user
const get_specificUser_byId=(id)=> {
    return databydate.data.filter((item) => item.employeeId == id);
  }



  const  diff_hours=(dt2, dt1)=>
{
let diff =(dt2. getTime() - dt1. getTime()) / 1000;
diff /= (60 * 60);
return Math.abs(Math.round(diff));
}




 const get_productive_hours=(id)=> {
    const userbyid = get_specificUser_byId(id);
    if (userbyid.length % 2 === 0 && userbyid.length>1) {
      console.log("valid");
     
      let sum=0;
      for (let i=0;i<=userbyid.length/2;i=i+2)
       {
        sum=sum+diff_hours(new Date(userbyid[i].attendanceTime.slice(0, -1)),new Date(userbyid[i+1].attendanceTime.slice(0, -1)))
       }
     return sum;      
    } else {
      console.log("invalid");
    }
  }
  



 
//  correct way to convert iso to local by removing last z
//  var date = new Date("2022-12-01T18:46:09.993Z".slice(0, -1));
//  console.log(date);

//  correct way to convert local  to iso 


 const getisoDate = (dt) => {
  let off = dt.getTimezoneOffset() * 60000
  let newdt = new Date(dt - off).toISOString()
  //console.log(newdt);
}

getisoDate(new Date());





const get_Allattandance=(id)=>
{
  return databydate.data.map((item)=>{
    return item.employeeId==id&& item.attendanceTime;
  }).filter((item)=>item&&item)

}


  


  
  const arrUniq = [...new Map(databydate.data.map(v => [v.employeeId, v])).values()]

   let x=1;
  const myrows = arrUniq.map((item) => {
    return {
      id: item.id,
      date: new Date(item.attendanceTime).toLocaleDateString(),
      name: item.employee.name,
      phours:  get_productive_hours(item.employeeId),
      biometricTime:get_Allattandance(item.employeeId)
    };
  });
  


  return (
    <>





      <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
        {/* 
{console.log(new Date(databydate.data[0].createdAt).toLocaleDateString())} */}

        <Grid container spacing={3}>
          {/* Chart */}

          {/* Recent Deposits */}

          {/* Recent Orders */}

          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Title>Techonology Rivers Employee</Title>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Name</TableCell>

                    <TableCell align="right">Productive Hours</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myrows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right">{row.phours?`${row.phours} Hours`:'TBD Hours'} 

                    
            <SimpleDialogue biometricTime={row.biometricTime} name={row.name}/>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </>
  );
}

//useful link

// https://stackoverflow.com/questions/15517024/how-to-assume-local-time-zone-when-parsing-iso-8601-date-string