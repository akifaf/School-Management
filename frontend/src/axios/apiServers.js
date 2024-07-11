import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiInstance from "./axios";
import { jwtDecode } from "jwt-decode";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
          throw new Error("Login failed");
        }
  
        const data = await response.json();
        console.log(data)
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const refreshauthToken = createAsyncThunk(
    "auth/refreshauthToken",
    async (refreshToken, { rejectWithValue }) => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {refresh: refreshToken});
  
        if (!response.ok) {
          console.log("error in refresh");
          throw new Error("Token refresh failed");
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const passwordSet = async (data) => {
    try {
      const response = await apiInstance.post('password-set/', data);
      return response.data;
    } catch (error) {
      return {
        error: error.response ? error.response.data : 'Something went wrong'
      };
    }
  };
  