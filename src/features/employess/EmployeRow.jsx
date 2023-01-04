import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import EditUser from './EditUser'
import { getEmployeeById } from './employeeSlice'

const EmployeRow = ({id}) => {
 
    const employee=useSelector((state)=>getEmployeeById(state,id))

  return (
 <>
      <TableRow>
              <TableCell>{employee.deviceId}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.designation}</TableCell>
              <TableCell>{new Date(employee.createdAt).toLocaleDateString()}

           <EditUser data={employee}/>
          
              </TableCell>
            </TableRow>
 
 </>
  )
}

export default EmployeRow