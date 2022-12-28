import { Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import Title from '../Title';

const rows = [
    {
      id: 0,
       date:'16 Mar, 2019',
       name:'Elvis Presley',
       phours:312.44,
      },
     {
       id:1,
       date:'16 Mar, 2019',
       name:'Paul McCartney',
       phours:866.99,
     },
     {
       id:2,
       date:'16 Mar, 2019',
       name:'Paul McCartney',
       phours:866.99,
     }
   ];

export default function MyTableByDate() {
  return (
  <>
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
  <Grid container spacing={3}>
              {/* Chart */}

              {/* Recent Deposits */}

              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                

                <Title>Techonology River's Employee</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
        
            <TableCell align="right">Productive Hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{`${row.phours} Hours`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>




                </Paper>
              </Grid>
            </Grid>

            </Container>
  </>
  )
}
