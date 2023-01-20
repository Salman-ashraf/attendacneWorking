import SignIn from "./Components/SignIn";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import "./styles.css";
import NoFound from "./NoFound";

// import { AttandanceByRange } from "./features/attandance/AttandanceByRange";

import RequireAuth from "./utils/route-guard/RequireAuth";
import { JWTProvider as AuthProvider } from "./context/JWTContext";
import UnAuthorized from "./UnAuthorized";
import AdminAuth from "./utils/route-guard/AdminAuth";
import Loadable from "./Components/Loadable";
import { lazy } from "react";
const AttandanceByRange = Loadable(lazy(() => import("./features/attandance/AttandanceByRange")));
const Attandance = Loadable(lazy(() => import("./features/attandance/Attandance")));
const Employees = Loadable(lazy(() => import("./features/employess/Employees")));
function App() {
  return (
    <Box>
      <AuthProvider>
        <Routes>
          <Route element={<RequireAuth allowedRole={[1234, 4567, 7890]} />}>
           
              <Route path="/" element={<Home />}>
                <Route index element={<Attandance />} />

                <Route element={<AdminAuth/>}>
                  <Route path="employee" element={<Employees />} />
                </Route>

                <Route path="attandance" element={<Attandance />} />
                <Route
                  path="attandancebyrange"
                  element={<AttandanceByRange />}
                />
              </Route>
          
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="unauthorized" element={<UnAuthorized />} />
          <Route path="*" element={<NoFound />} />
        </Routes>
      </AuthProvider>
    </Box>
  );
}

export default App;
