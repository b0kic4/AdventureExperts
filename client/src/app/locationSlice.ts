// destinationSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meta } from "../components/Home/Travel/Hotels/assets/interfaces/Hotel";

interface DestinationState {
  location: {
    originCityCode: string | null;
    destinationCityCode: string | null;
    foundHotelsCount: number | Meta | null;
  };
}

const initialState: DestinationState = {
  location: {
    originCityCode: null,
    destinationCityCode: null,
    foundHotelsCount: null,
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
    setFoundHotelsCount: (
      state,
      action: PayloadAction<number | Meta | null>
    ) => {
      state.location.foundHotelsCount = action.payload;
    },
  },
});

export const {
  setOriginCitySliceCode,
  setDestinationSliceCode,
  setFoundHotelsCount,
} = destinationSlice.actions;

export default destinationSlice.reducer;
