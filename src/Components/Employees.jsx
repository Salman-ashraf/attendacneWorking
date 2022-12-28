import { Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import AddButton from './AddButton';
import Title from './Title';
import employeedata from './SubComponents/Employeedata';

import EditUser from './EditUser';

const rows = employeedata.data;

export default function Employees() {

  return (
  <>
  <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
  <Grid container spacing={3}>
              {/* Chart */}

              {/* Recent Deposits */}

              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                

                <Title>Techonology Rivers Employee</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>DeviceId</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Desgination</TableCell>
            <TableCell>CreatedAt</TableCell>
        
        
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.deviceId}>
              <TableCell>{row.deviceId}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.designation}</TableCell>
              <TableCell>{new Date(row.createdAt.slice(0,-1)).toLocaleDateString()}

<EditUser data={row}/>
              </TableCell>
          
            </TableRow>
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
