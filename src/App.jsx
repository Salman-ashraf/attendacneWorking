import { useState } from 'react'
import SignIn from './Components/SignIn'
import { Box } from '@mui/material'
import DashBoard from './Components/DashBoard'
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import AddButton from './Components/AddButton';
function App() {


  return (


 <Box>
  <Routes>
      <Route path="/" element={<DashBoard/>}/>
        {/* <Route
          path="messages"
          element={<DashBoard />}
        /> */}
        <Route path="/signin" element={<SignIn/>} />
    
    </Routes>


{/* <DashBoard/> */}

 {/* <SignIn/> */}

 </Box>

  )
}

export default App
