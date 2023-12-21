// destinationSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  isHotelSearchActive: boolean;
  isHotelListActive: boolean;
  isFlightListActive: boolean;
}

const initialState: NavigationState = {
  isHotelListActive: false,
  isHotelSearchActive: true,
  isFlightListActive: false,
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
    setIsFlightListActive: (state, action: PayloadAction<boolean>) => {
      state.isFlightListActive = action.payload;
    },
  },
});

export const {
  setIsHotelListActive,
  setIsHotelSearchActive,
  setIsFlightListActive,
} = navigationSlice.actions;

export default navigationSlice.reducer;
