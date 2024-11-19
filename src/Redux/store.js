import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slice/dataslices";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;