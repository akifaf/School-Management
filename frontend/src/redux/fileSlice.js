import { createAsyncThunk } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../axios/AxiosInstance';
import axios from 'axios';


export const fetchTeacherFiles = createAsyncThunk(
  'files/fetchTeacherFiles',
  async (_, { getState }) => {
    const { auth } = getState();
    const response = await axiosInstance.get('/teacher-files/', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return response.data;
  }
);

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    teacherFiles: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherFiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeacherFiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teacherFiles = action.payload;
      })
      .addCase(fetchTeacherFiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default fileSlice.reducer;
