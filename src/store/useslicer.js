import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../Utils/http";  // Ensure this is the correct path

// Async thunk for fetching user details
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
    //   const response = await http.get("/auth/user");
      const data = response.data.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userloading: false,
    usererror: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.userloading = true;
        state.usererror = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.userloading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.userloading = false;
        state.usererror = action.payload || action.error.message;
      });
  },
});

export default userSlice.reducer;