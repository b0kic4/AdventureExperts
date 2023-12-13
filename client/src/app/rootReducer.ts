import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import destinationReducer from "./locationSlice";
import filtersReducer from "./filtersSlice";
const rootReducer = combineReducers({
  user: userReducer,
  location: destinationReducer,
  filters: filtersReducer,
  // Add more reducers as needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
