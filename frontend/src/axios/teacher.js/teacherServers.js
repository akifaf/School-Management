import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../AxiosInstance";


export const fetchTeacher = createAsyncThunk('teacher/fetchTeacher', async (id) => {
    const response = await axiosInstance.get(`/teacher-update/${id}/`);
    return response.data;
});

export const uploadProfilePicture = createAsyncThunk('teacher/uploadProfilePicture', async ({ id, formData }) => {
    const response = await axiosInstance.put(`/teachers/${id}/upload-profile-picture/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
});