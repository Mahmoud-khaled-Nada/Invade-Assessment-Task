import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  User } from "./../utils/types";

type UserType = {
  user: User | null;
};

const initialState: UserType = {
  user: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>): void => {
      console.log(action.payload)
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
