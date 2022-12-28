
import SignIn from './Components/SignIn'
import { Box } from '@mui/material'

import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './Components/Home';
import Attandance from './Components/Attandance';
import Employees from './Components/Employees';
import  './styles.css'
import NoFound from './NoFound';
import { AttandanceByRange } from './Components/AttandanceByRange';
// import {databydate} from './Components/ByDate.js'

function App() {


  return (


 <Box>

  {/* {console.log(databydate.data[0])} */}

  <Routes>
  <Route path="/" element={<Home />}>
   
   <Route
       index
      element={<Attandance />}
    />

    <Route
      path="employee"
      element={<Employees />}
    />

<Route
      path="attandance"
      element={<Attandance />}
    />

<Route
      path="attandancebyrange"
      element={<AttandanceByRange />}
    />
   
  </Route>

        <Route path="/signin" element={<SignIn/>} />
        <Route path='*' element={<NoFound/>}/>
 
    </Routes>


{/* <DashBoard/> */}

 {/* <SignIn/> */}

 </Box>

  )
}

export default App
