import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_route } from "../info";

// Async thunk for adding a job post
export const addJobPostAction = createAsyncThunk(
  "job/addJobPost",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.token;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${base_route}/company/post-job`,
        payload,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Slice for job posts
const jobSlice = createSlice({
  name: "job",
  initialState: {
    job: null,
    isLoading: false,
    error: null,
    message: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addJobPostAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addJobPostAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.job = action.payload;
        state.error = null;
        state.message = { mssg: action.payload, type: "success" };
      })
      .addCase(addJobPostAction.rejected, (state, action) => {
        state.isLoading = false;
        state.job = null;
        state.error = action.payload;
        state.message = { mssg: action.payload.mssg, type: "error" };
      });
  },
});

export default jobSlice.reducer;