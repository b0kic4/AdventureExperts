// destinationSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DestinationState {
  location: {
    originCityCode: string | null;
    destinationCityCode: string | null;
  };
}

const initialState: DestinationState = {
  location: {
    originCityCode: null,
    destinationCityCode: null,
  },
};

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    setOriginCitySliceCode: (state, action: PayloadAction<string | null>) => {
      state.location.originCityCode = action.payload;
    },
    setDestinationSliceCode: (state, action: PayloadAction<string | null>) => {
      state.location.destinationCityCode = action.payload;
    },
  },
});

export const { setOriginCitySliceCode, setDestinationSliceCode } =
  destinationSlice.actions;

export default destinationSlice.reducer;
