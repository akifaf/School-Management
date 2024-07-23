import { createSlice } from "@reduxjs/toolkit";
import {  studentList, studentListByClass, updateStudent } from "../axios/admin/AdminServers";
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
            // .addCase(studentList.fulfilled, (state, action) => {
            //     state.student_list = action.payload;
            //     state.status = 'successful';
            // })
            // .addCase(studentList.rejected, (state, action) => {
            //     state.error = action.error.message;
            //     state.status = 'failed';
            // })
            .addCase(updateStudent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
              state.status = 'succeeded';
              const updatedStudent = action.payload;
              state.student_list = state.student_list.map((student) =>
                student.id === updatedStudent.id ? updatedStudent : student
              );
            })
            .addCase(updateStudent.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.payload;
            })            
            
  }
});

export default studentSlice.reducer;
