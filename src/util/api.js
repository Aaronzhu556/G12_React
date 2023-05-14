import axios from "axios";

//const API_BASE_URL = "http://43.139.101.193:8089";
const API_BASE_URL = "http://localhost:8081";
export const postData = async (path, data) => {
  const response = await axios.post(`${API_BASE_URL}${path}`, data);
  return response.data;
};

export const getData = async (path) => {
  const response = await axios.get(`${API_BASE_URL}${path}`);
  return response.data;
};

export const deleteData = async (path) => {
  const response = await axios.delete(`${API_BASE_URL}${path}`);
  return response.data;
};