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
  savedFilters: {
    filterSets: FiltersState["filters"][];
    selectedFilterSetIndex: number | null;
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
  savedFilters: {
    filterSets: [],
    selectedFilterSetIndex: null,
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
    saveFiltersToLocalStorage: (state) => {
      localStorage.setItem(
        "filterSets",
        JSON.stringify(state.savedFilters.filterSets)
      );
      localStorage.setItem(
        "selectedFilterSetIndex",
        state.savedFilters.selectedFilterSetIndex?.toString() || ""
      );
    },
    loadFiltersFromLocalStorage: (state) => {
      const storedFilterSets = localStorage.getItem("filterSets");
      const storedSelectedFilterSetIndex = localStorage.getItem(
        "selectedFilterSetIndex"
      );

      if (storedFilterSets) {
        state.savedFilters.filterSets = JSON.parse(storedFilterSets);
      }

      if (storedSelectedFilterSetIndex) {
        state.savedFilters.selectedFilterSetIndex = parseInt(
          storedSelectedFilterSetIndex,
          10
        );
      }
    },
    removeSavedFilters: (state, action: PayloadAction<number>) => {
      const indexToRemove = action.payload;
      state.savedFilters.filterSets.splice(indexToRemove, 1);
      localStorage.setItem(
        "filterSets",
        JSON.stringify(state.savedFilters.filterSets)
      );
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
  loadFiltersFromLocalStorage,
  saveFiltersToLocalStorage,
  removeSavedFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
