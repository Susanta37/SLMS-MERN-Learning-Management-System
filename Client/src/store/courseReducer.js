import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import toast from "react-hot-toast";
import { url } from "../Utilities/serverUrl";


export const getAllCourses = createAsyncThunk(
    'post/getAllCourses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}/course/getAllcourse`);
            // console.log('response', response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



const courseSlice = createSlice({
    name: "course",
    initialState: {
        courses: [],
        status: "idle",
        error: null
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // console.log('action.payload', action.payload)
                action.payload.allCourse ? state.courses = action.payload.allCourse : state.courses = [];
            })
            .addCase(getAllCourses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
       
    }
});
export default courseSlice.reducer;
