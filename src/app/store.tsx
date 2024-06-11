import { configureStore } from "@reduxjs/toolkit";
import addRandomChar  from "../features/RandomCharSlice";
export const store  = configureStore({
    reducer:{
        addRandomCharReducer : addRandomChar}
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;