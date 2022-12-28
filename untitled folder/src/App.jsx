import { useState } from 'react'
import SignIn from './Components/SignIn'
import { Box } from '@mui/material'
import DashBoard from './Components/DashBoard'
import {
  Routes,
  Route,
  Link
} from "react-router-dom";

import MyTableByDate from './Components/SubComponents/MyTableByDate';
// import {databydate} from './Components/ByDate.js'

function App() {


  return (


 <Box>

  {/* {console.log(databydate.data[0])} */}

  <Routes>
  <Route path="/" element={<DashBoard />}>
    <Route
      path="bydate"
      element={<MyTableByDate />}
    />
   
  </Route>

        <Route path="/signin" element={<SignIn/>} />
 
    </Routes>


{/* <DashBoard/> */}

 {/* <SignIn/> */}

 </Box>

  )
}

export default App
