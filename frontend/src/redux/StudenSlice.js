import { createSlice } from "@reduxjs/toolkit";
import {  studentList, studentListByClass } from "../axios/admin/AdminServers";
// import { studentList } from "../axios/AdminServers";

const initialState = {
    student_list: null,
    error: null,
    status: null
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 
            .addCase(studentListByClass.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(studentListByClass.fulfilled, (state, action) => {
              state.loading = false;
              state.student_list = action.payload;
              state.status = 'successful';
            })
            .addCase(studentListByClass.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })      
            
  }
});

export default studentSlice.reducer;
