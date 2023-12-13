import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  filters: {
    Amenities: string[];
    Ratings: string[];
    radius: number;
    radiusUnit: string;
    Adults: number;
    DepartureDate: Date | null;
  };
}

const initialState: FiltersState = {
  filters: {
    Amenities: [],
    Ratings: [],
    radius: 5,
    radiusUnit: "KM",
    Adults: 1,
    DepartureDate: null,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setAmenities: (state, action: PayloadAction<string[]>) => {
      state.filters.Amenities = action.payload;
    },
    setRatings: (state, action: PayloadAction<string[]>) => {
      state.filters.Ratings = action.payload;
    },
    setRadius: (state, action: PayloadAction<number>) => {
      state.filters.radius = action.payload;
    },
    setRadiusUnit: (state, action: PayloadAction<string>) => {
      state.filters.radiusUnit = action.payload;
    },
    setAdults: (state, action: PayloadAction<number>) => {
      state.filters.Adults = action.payload;
    },
    setDepartureDate: (state, action: PayloadAction<Date | null>) => {
      state.filters.DepartureDate = action.payload;
    },
  },
});

export const {
  setAmenities,
  setRatings,
  setRadius,
  setRadiusUnit,
  setAdults,
  setDepartureDate,
} = filtersSlice.actions;

export default filtersSlice.reducer;
