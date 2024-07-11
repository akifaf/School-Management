// src/redux/slices/classroomSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { addClassRoom, classRoomList, deleteClassRoom, editClassRoom } from '../axios/admin/AdminServers';

const classroomSlice = createSlice({
  name: 'classrooms',
  initialState: {
    classrooms: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(classRoomList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(classRoomList.fulfilled, (state, action) => {
        state.status = 'successful';
        state.classrooms = action.payload;
      })
      .addCase(classRoomList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addClassRoom.fulfilled, (state, action) => {
        state.classrooms.push(action.payload);
      })
      .addCase(editClassRoom.fulfilled, (state, action) => {
        const index = state.classrooms.findIndex(classRoom => classRoom.id === action.payload.id);
        if (index !== -1) {
          state.classrooms[index] = action.payload;
        }
      })
      .addCase(deleteClassRoom.fulfilled, (state, action) => {
        state.classrooms = state.classrooms.filter(classRoom => classRoom.id !== action.payload);
      });
  },
});

export default classroomSlice.reducer;
