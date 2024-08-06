import { combineReducers, configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";

const rootReducer = combineReducers({
  countries: countriesReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
