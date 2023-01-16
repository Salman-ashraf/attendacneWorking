import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosAuth from "../../api/axiosAuth";
const initialState = {
  attandance: [],
  status: "idle",
  error: null,
};

export const fetchAllAttandanceOfDate = createAsyncThunk(
  "attandace/fetchAllAttandanceOfDate",
  async ({ date }) => {
    try {
      const res = await axiosAuth.get(`/attendances/employees/`, {
        params: { date },
      });
      //  console.log(res);
      return [...res.data.data];
    } catch (error) {
      console.log("error occured in fetchAllAttandanceOfDate ");
      console.log(error);
      throw error;
    }
  }
);

export const fetchAllAttandanceBetweenDate = createAsyncThunk(
  "attandace/fetchAllAttandanceBetweenDate",
  async ({ fromDate, toDate }) => {
    try {
      const res = await axiosAuth.get(`/employees/reports/`, {
        params: { fromDate, toDate },
      });
      //console.log(res.data.data);
      return [...res.data.data];
    } catch (error) {
      console.log("error occured in  fetchAllAttandanceBetweenDate");
      console.log(error);
      throw error;
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
      builder.addCase(fetchAllAttandanceOfDate.pending, (state) => {
        state.status = "pending";
      }),
      builder.addCase(fetchAllAttandanceOfDate.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      }),
      builder.addCase(fetchAllAttandanceBetweenDate.pending, (state) => {
        state.status = "pending";
      }),
      builder.addCase(fetchAllAttandanceBetweenDate.rejected, (state) => {
        state.status = "rejected";
      });

    builder.addCase(
      fetchAllAttandanceBetweenDate.fulfilled,
      (state, action) => {
        state.status = "fulfilled";
        state.attandance = [...action.payload];
      }
    );
  },
});


export const selectAllAttandance = (state) => state.Attandace.attandance;
export const getStatus = (state) => state.Attandace.status;
export const getError = (state) => state.Attandace.error;
export default attandanceSlice.reducer;
