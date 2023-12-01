// destinationSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DestinationState {
  location: {
    cityCode: string | null;
  };
}

const initialState: DestinationState = {
  location: {
    cityCode: null, // Assign an initial value for cityCode
  },
};

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    setCitySliceCode: (state, action: PayloadAction<string | null>) => {
      state.location.cityCode = action.payload;
    },
  },
});

export const { setCitySliceCode } = destinationSlice.actions;

export default destinationSlice.reducer;
