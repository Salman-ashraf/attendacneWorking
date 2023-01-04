import { configureStore } from "@reduxjs/toolkit";
import attandanceReducer from '../features/attandance/attandaceSlice'
import employeeReducer from '../features/employess/employeeSlice'
const store=configureStore({
    reducer:{
        Attandace:attandanceReducer,
        Employee:employeeReducer
    }
})

export default store;