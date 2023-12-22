// destinationSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  isHotelSearchActive: boolean;
  isHotelListActive: boolean;
}

const initialState: NavigationState = {
  isHotelListActive: false,
  isHotelSearchActive: true,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setIsHotelListActive: (state, action: PayloadAction<boolean>) => {
      state.isHotelListActive = action.payload;
    },
    setIsHotelSearchActive: (state, action: PayloadAction<boolean>) => {
      state.isHotelSearchActive = action.payload;
    },
  },
});

export const { setIsHotelListActive, setIsHotelSearchActive } =
  navigationSlice.actions;

export default navigationSlice.reducer;
