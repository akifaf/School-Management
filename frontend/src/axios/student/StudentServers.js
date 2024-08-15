import { axiosFormInstance, axiosResultInstance } from "../AxiosInstance";

export const updateStudentProfile = async (id, studentData) => {
  try {
    const response = await axiosFormInstance.patch(`student/${id}/`, studentData);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getResult = async (id) => {
  try {
    const response = await axiosResultInstance.get(`${id}/`);
    return response.data;
  } catch (error) {
    return {
      error: error.response ? error.response.data : 'Something went wrong'
    };
  }
};