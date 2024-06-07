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

// Async thunk to add a bag item
// export const createPost = createAsyncThunk(
//     'post/createPost',
//     async (bagItemData, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(`${URL}/post/create`, bagItemData);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// // Async thunk to delete a bag item
// export const deletePost = createAsyncThunk(
//     'post/deletePost',
//     async (bagItemId, { rejectWithValue }) => {
//         try {
//             const deleted = await axios.delete(`${URL}/post/deletePost/${bagItemId}`);
//             return deleted.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

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
        // .addCase(createPost.pending, (state) => {
        //     state.status = 'loading';
        // })
        // .addCase(createPost.fulfilled, (state, action) => {
        //     state.status = 'succeeded';
        //     console.log('action.payload', action.payload)
        //     if (action.payload.success) {
        //         state.posts.push(action.payload.newPost);
        //         toast.success(action.payload.message)
        //     }
        //     else
        //         toast.error(action.payload.message)
        // })
        // .addCase(createPost.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.payload;
        //     toast.error(action.payload.message)
        // })
        // .addCase(deletePost.pending, (state) => {
        //     state.status = 'loading';
        // })
        // .addCase(deletePost.fulfilled, (state, action) => {
        //     state.status = 'succeeded';
        //     console.log('action.payload', action.payload)
        //     state.posts = state.posts.filter(item => item._id !== action.payload.deletePost._id);
        //     toast.success(action.payload.message)
        // })
        // .addCase(deletePost.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.payload;
        // });
    }
});
export default courseSlice.reducer;