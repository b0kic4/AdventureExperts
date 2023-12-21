// hotelListSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import HotelResponse from "../components/Home/Travel/Hotels/assets/interfaces/Hotel";

interface HotelListState {
  hotelList: HotelResponse | null;
}

const initialState: HotelListState = {
  hotelList: null,
};

const hotelListSlice = createSlice({
  name: "hotelList",
  initialState,
  reducers: {
    setHotelListSlice: (state, action: PayloadAction<HotelResponse | null>) => {
      state.hotelList = action.payload;
    },
  },
});

export const { setHotelListSlice } = hotelListSlice.actions;
export default hotelListSlice.reducer;
