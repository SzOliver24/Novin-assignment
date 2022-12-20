import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./slices/session";
import customersReducer from "./slices/customer";
import itemsReducer from "./slices/item";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    customers: customersReducer,
    items: itemsReducer,
  },
});
