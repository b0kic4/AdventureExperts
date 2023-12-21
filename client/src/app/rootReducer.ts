import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import destinationReducer from "./locationSlice";
import filtersReducer from "./filtersSlice";
import navigationReducer from "./helpers";
import hotelListReducer from "./hotelListSlice";
const rootReducer = combineReducers({
  user: userReducer,
  location: destinationReducer,
  filters: filtersReducer,
  navigationHelper: navigationReducer,
  hotelList: hotelListReducer,
  // Add more reducers as needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
