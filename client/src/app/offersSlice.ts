// destinationSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meta } from "../components/Home/Travel/Hotels/assets/interfaces/Hotel";

interface OffersSlice {
  offers: {
    people: number;
    checkInDate: Date | string;
    checkOutDate: Date | string;
    roomQuantity: number;
    priceRange: string | null;
    currency: string;
    paymentPolicy: string;
    boardType: string;
    includeClosed: boolean;
    bestRateOnly: boolean;
    lang: string;
  };
}

const initialState: OffersSlice = {
  offers: {
    people: 1,
    checkInDate: "",
    checkOutDate: "",
    roomQuantity: 1,
    priceRange: "",
    currency: "EUR",
    paymentPolicy: "NONE",
    boardType: "ROOM_ONLY",
    includeClosed: false,
    bestRateOnly: true,
    lang: "EN",
  },
};

const offerSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    setPeople: (state, action: PayloadAction<number>) => {
      state.offers.people = action.payload;
    },
    setCheckInDates: (state, action: PayloadAction<Date | string>) => {
      state.offers.checkInDate = action.payload;
    },
    setCheckOutDates: (state, action: PayloadAction<Date | string>) => {
      state.offers.checkOutDate = action.payload;
    },
    setRoomQuantities: (state, action: PayloadAction<number>) => {
      state.offers.roomQuantity = action.payload;
    },
    setPricingRange: (state, action: PayloadAction<string | null>) => {
      state.offers.priceRange = action.payload;
    },
    setCurrencies: (state, action: PayloadAction<string>) => {
      state.offers.currency = action.payload;
    },
    setPaymentPolicies: (state, action: PayloadAction<string>) => {
      state.offers.paymentPolicy = action.payload;
    },
    setBoardTypes: (state, action: PayloadAction<string>) => {
      state.offers.boardType = action.payload;
    },
    setIncludeClosed: (state, action: PayloadAction<boolean>) => {
      state.offers.includeClosed = action.payload;
    },
    setBestRatesOnly: (state, action: PayloadAction<boolean>) => {
      state.offers.bestRateOnly = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.offers.lang = action.payload;
    },
  },
});

export const {
  setPeople,
  setBestRatesOnly,
  setBoardTypes,
  setCheckInDates,
  setCheckOutDates,
  setCurrencies,
  setIncludeClosed,
  setLanguage,
  setPaymentPolicies,
  setPricingRange,
  setRoomQuantities,
} = offerSlice.actions;

export default offerSlice.reducer;
