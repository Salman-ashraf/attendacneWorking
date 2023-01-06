import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "http://localhost:3000";

const initialState = {
  attandance: [],
  status: "idle",
  error: null,
};

export const fetchAllAttandanceOfDate = createAsyncThunk(
  "attandace/fetchAllAttandanceOfDate",
  async ({ date }) => {
    try {
      const res = await axios.get(`${URL}/attendances/employees/`, {
        params: { date },
        headers: {
          "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiYWthckB0ZWNocml2ZXJzLmNvbSIsImlhdCI6MTY3MjgxMjIzMywiZXhwIjoxNjczNDE3MDMzfQ.wCX6OXq4xHYxXVnDMCE0_m1AHOuhH51BWkwyO9SFnh8"  },
      });
    //  console.log(res);
      return [...res.data.data];
    } catch (error) {
      console.log("error occured in fetchAllAttandanceOfDate ");
      console.log(error);
      return (error);
    }
  }
);

export const fetchAllAttandanceBetweenDate = createAsyncThunk(
  "attandace/fetchAllAttandanceBetweenDate",
  async ({ fromDate, toDate }) => {
    try {
      const res = await axios.get(`${URL}/employees/reports/`, {
        params: { fromDate, toDate },
        headers: {
          "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiYWthckB0ZWNocml2ZXJzLmNvbSIsImlhdCI6MTY3MjgxMjIzMywiZXhwIjoxNjczNDE3MDMzfQ.wCX6OXq4xHYxXVnDMCE0_m1AHOuhH51BWkwyO9SFnh8"   },
      });
      //console.log(res.data.data);
      return [...res.data.data];
    } catch (error) {
      console.log("error occured in  fetchAllAttandanceBetweenDate");
      console.log(error);
      return error;
    }
  }
);

const attandanceSlice = createSlice({
  name: "attandacne",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllAttandanceOfDate.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.attandance = [...action.payload];
    }),
      builder.addCase(fetchAllAttandanceOfDate.pending, (state, action) => {
        state.status = "pending";
      }),
      builder.addCase(fetchAllAttandanceOfDate.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      }),
      builder.addCase(
        fetchAllAttandanceBetweenDate.fulfilled,
        (state, action) => {
        //  state.status = "fulfilled";
          state.attandance = [...action.payload];
        }
      );
  },
});

export const selectAllAttandance = (state) => state.Attandace.attandance;

export const getStatus=(state)=>state.Attandace.status;
export const getError=(state)=>state.Attandace.error;
export default attandanceSlice.reducer;
