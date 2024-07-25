import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosFormInstance, axiosInstance } from "../AxiosInstance";


export const fetchTeacher = createAsyncThunk('teacher/fetchTeacher', async (id) => {
    const response = await axiosInstance.get(`/teacher-update/${id}/`);
    return response.data;
});

export const updateTeacherProfile = async (id, teacherData) => {
      const response = await axiosFormInstance.patch(`teacher-update/${id}/`, teacherData);
      console.log(response);
      return response;
  
  };

