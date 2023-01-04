import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "http://localhost:3000"

const employeeAdapter = createEntityAdapter({
  sortComparer: (a, b) =>a.createdAt.localeCompare(b.createdAt),
})


const initialState=employeeAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchAllEmployees = createAsyncThunk(
  "employees/fetchAllEmployees",
  async () => {
    try {
      const res = await axios.get(`${URL}/employees`, {
        headers: {
          "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiYWthckB0ZWNocml2ZXJzLmNvbSIsImlhdCI6MTY3MjgxMjIzMywiZXhwIjoxNjczNDE3MDMzfQ.wCX6OXq4xHYxXVnDMCE0_m1AHOuhH51BWkwyO9SFnh8" },
      });
    //  console.log(res.data.data);
      return [...res.data.data];
    } catch (error) {
      console.log("error occured in fetching users");
      console.log(error);
      return error;
    }
  }
);


export const addNewEmployee = createAsyncThunk(
  "employees/addNewEmployee",
  async (newEmployee) => {
    try {

      const res=await axios({
        method: 'post',
        url: `${URL}/employees`,
        headers: {
          "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiYWthckB0ZWNocml2ZXJzLmNvbSIsImlhdCI6MTY3MjgxMjIzMywiZXhwIjoxNjczNDE3MDMzfQ.wCX6OXq4xHYxXVnDMCE0_m1AHOuhH51BWkwyO9SFnh8" },
        data: newEmployee
      })
      console.log(res.data.data);
      return res.data.data;
    }
     catch (error) {
      console.log("error occured in adding users");
      console.log(error);
      return error;
    }
  }
);



export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (intialVal) => {
    try {
         const {name,designation,email,id}=intialVal;
        
      const res=await axios({
        method: 'put',
        url: `${URL}/employees/${id}`,
        headers: {
          "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiYWthckB0ZWNocml2ZXJzLmNvbSIsImlhdCI6MTY3MjgxMjIzMywiZXhwIjoxNjczNDE3MDMzfQ.wCX6OXq4xHYxXVnDMCE0_m1AHOuhH51BWkwyO9SFnh8"  },
        data: {name,designation,email}
      })
      console.log(res);
      return res.data.data;
    }
     catch (error) {
      console.log("error occured in updating users");
      console.log(error);
      return error;
    }
  }
);


const employeeSlice = createSlice({
  name: "attandacne",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllEmployees.fulfilled, (state, action) => {
      state.status = "fulfilled";
      employeeAdapter.upsertMany(state,action.payload);
    }),
      builder.addCase(fetchAllEmployees.pending, (state, action) => {
        state.status = "pending";
      }),
      builder.addCase(fetchAllEmployees.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      }),
      builder.addCase(addNewEmployee.fulfilled, (state, action) => {
        
        employeeAdapter.addOne(state,action.payload);
      }),
      builder.addCase(updateEmployee.fulfilled, (state, action) => {
         
        
        employeeAdapter.upsertOne(state,action.payload);
      });
  },
});

export const {
  selectAll:selectAllEmployees,
  selectById:getEmployeeById,
  selectIds:selectEmployeeIds
} = employeeAdapter.getSelectors(state => state.Employee);


// export const selectAllEmployees = (state) => state.Employee.employees;

export default employeeSlice.reducer;
