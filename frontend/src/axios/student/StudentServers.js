import { axiosFormInstance } from "../AxiosInstance";

export const updateStudentProfile = async (id, studentData) => {
  try {
    const response = await axiosFormInstance.patch(`student/${id}/`, studentData);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
