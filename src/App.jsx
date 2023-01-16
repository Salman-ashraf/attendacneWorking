import SignIn from "./Components/SignIn";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import "./styles.css";
import NoFound from "./NoFound";
import Attandance from "./features/attandance/Attandance";
import { AttandanceByRange } from "./features/attandance/AttandanceByRange";
import Employees from "./features/employess/Employees";
import RequireAuth from "./Components/RequireAuth";
function App() {
  return (

    <Box>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Attandance />} />
          <Route element={<RequireAuth />}>
            <Route path="employee" element={<Employees />} />
            <Route path="attandance" element={<Attandance />} />
            <Route path="attandancebyrange" element={<AttandanceByRange />} />
          </Route>
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NoFound />} />
      </Routes>
    </Box>
    
  );
}

export default App;
