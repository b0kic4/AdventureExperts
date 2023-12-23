// destinationSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  isHotelSearchActive: boolean;
  isHotelListActive: boolean;
  isLoading: boolean;
}

const initialState: NavigationState = {
  isHotelListActive: false,
  isHotelSearchActive: true,
  isLoading: false,
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
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsHotelListActive, setIsHotelSearchActive, setIsLoading } =
  navigationSlice.actions;

export default navigationSlice.reducer;
