// userSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLoggedIn: boolean;
  user: {
    id: number;
    name: string;
    password: string;
    email: string;
    username: string;
  } | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        email: string;
        username: string;
        password: string;
        token: string;
      }>
    ) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const { setUser, clearUser, setLoggedIn } = userSlice.actions;
export default userSlice.reducer;
