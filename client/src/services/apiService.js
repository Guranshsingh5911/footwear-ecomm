// src/services/apiService.js
import axios from "axios";

const API_BASE = "http://localhost:8000/api/users";

export const registerUser = async (formData) => {
  return await axios.post(`${API_BASE}`, formData);
};

export const loginUser = async (formData) => {
  return await axios.post(`${API_BASE}/login`, formData);
};
