import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./courseReducer";
import authReducer from "./authReducer";
const store = configureStore({
    reducer: { course: courseReducer, authReducer }
})
export default store;