import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import destinationReducer from "./locationSlice";

const rootReducer = combineReducers({
  user: userReducer,
  location: destinationReducer,
  // Add more reducers as needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
