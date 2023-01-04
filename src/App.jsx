import SignIn from "./Components/SignIn";
import { Box } from "@mui/material";

import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";


import "./styles.css";
import NoFound from "./NoFound";

import Attandance from "./features/attandance/Attandance";
import { AttandanceByRange } from "./features/attandance/AttandanceByRange";
import Employees from "./features/employess/Employees";

function App() {
  return (
    <Box>
      {/* {console.log(databydate.data[0])} */}

      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Attandance />} />

          <Route path="employee" element={<Employees />} />

          <Route path="attandance" element={<Attandance />} />

          <Route path="attandancebyrange" element={<AttandanceByRange />} />
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NoFound />} />
      </Routes>

      {/* <DashBoard/> */}

      {/* <SignIn/> */}
    </Box>
  );
}

export default App;
