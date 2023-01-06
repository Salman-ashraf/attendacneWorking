import { Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import AddButton from './AddButton';



import Title from '../attandance/Title';

import EditUser from './EditUser';
import { useSelector } from 'react-redux';
import {  selectEmployeeIds } from './employeeSlice';
import EmployeRow from './EmployeRow';



export default function Employees() {

  const employess=useSelector(selectEmployeeIds)

  return (
  <>
  <Container maxWidth="lg" sx={{ mt: 10, mb: 4 ,    boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",}}>
  <Grid container spacing={3}>
              {/* Chart */}

              {/* Recent Deposits */}

              {/* Recent Orders */}
              <Grid item xs={12} >
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                

                <Title>Techonology Rivers Employee</Title>
      <Table size="small">
        <TableHead>
          <TableRow hover>
            <TableCell>DeviceId</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Desgination</TableCell>
            <TableCell>CreatedAt</TableCell>
            <TableCell>Actions</TableCell>
        
          </TableRow>
        </TableHead>
        <TableBody>

          {employess.map((item) => (
           
           <EmployeRow id={item} key={item}/>
      



          ))}
        </TableBody>
      </Table>

   <AddButton/>


                </Paper>
              </Grid>
            </Grid>

            </Container>
  </>
  )
}
