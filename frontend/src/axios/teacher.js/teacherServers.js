import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAttendanceInstance, axiosFormInstance, axiosInstance } from "../AxiosInstance";


export const fetchTeacher = createAsyncThunk('teacher/fetchTeacher', async (id) => {
    const response = await axiosInstance.get(`/teacher-update/${id}/`);
    return response.data;
});

export const updateTeacherProfile = async (id, teacherData) => {
      const response = await axiosFormInstance.patch(`teacher-update/${id}/`, teacherData);
      console.log(response);
      return response;
  
  };

// export const take_attendance = async (attendanceData) => {
//     const response = await axiosAttendanceInstance.post(`take_attendance/`, attendanceData);
//     return response
// }

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