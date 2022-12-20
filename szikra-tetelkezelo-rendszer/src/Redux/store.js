import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./slices/session";
import customersReducer from "./slices/customer";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    customers: customersReducer,
  },
});
