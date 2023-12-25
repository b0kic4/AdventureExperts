import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import destinationReducer from "./locationSlice";
import filtersReducer from "./filtersSlice";
import navigationReducer from "./Helpers";
import offersSliceReducer from "./offersSlice";
import hotelListReducer from "./hotelListSlice";
const rootReducer = combineReducers({
  user: userReducer,
  location: destinationReducer,
  filters: filtersReducer,
  navigationHelper: navigationReducer,
  hotelList: hotelListReducer,
  offers: offersSliceReducer,
  // Add more reducers as needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
