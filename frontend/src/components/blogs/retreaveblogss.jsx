// src/api/blogApi.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const createBlog = async (formData) => {
  try {
    const response = await api.post("blogs/", formData);

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};