import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAttendanceInstance, axiosFormInstance, axiosInstance, axiosResultInstance } from "../AxiosInstance";


export const fetchTeacher = createAsyncThunk('teacher/fetchTeacher', async (id) => {
    const response = await axiosInstance.get(`/teacher-update/${id}/`);
    return response.data;
});

export const updateTeacherProfile = async (id, teacherData) => {
      const response = await axiosFormInstance.patch(`teacher-update/${id}/`, teacherData);
      console.log(response);
      return response;
  
  };

export const take_attendance = async (attendanceData) => {
    try {
      const response = await axiosAttendanceInstance.post('take_attendance/', attendanceData);
      return response.data;
    } catch (error) {
      return {
        error: error.response ? error.response.data : 'Something went wrong'
      };
    }
  };

// export const syllabusByClass = async (id) => {
//   try {
//     const response = await axiosResultInstance.get(`syllabus_by_class/${id}/`);
//     return response.data
//   } catch (error) {
//     console.log(error);
//     return error
//   }
// }

export const syllabusByClass = createAsyncThunk(
  'syllabus/fetchByClass',
  async (id, thunkAPI) => {
    try {
      const response = await axiosResultInstance.get(`syllabus_by_class/${id}/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const addSubject = createAsyncThunk('subject/add_subject', async (data) => {
  const response = await axiosInstance.post(`/subject/`, JSON.stringify(data));
  return response
})

export const addResult = createAsyncThunk('result/add_result', async (data) => {
  const response = await axiosResultInstance.post(`/`, JSON.stringify(data));
return response.data
})