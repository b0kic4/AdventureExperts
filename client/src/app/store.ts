import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  // Add middleware, devtools, etc. if needed
});

export type AppDispatch = typeof store.dispatch;
export default store;
