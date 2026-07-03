// import axios from "axios";
// import api from "../api/axios";

// export const registerUser = async (data: {
//   fullName: string;
//   email: string;
//   password: string;
// }) => {
//   const response = await api.post(
//     "/auth/register",
//     data
//   );

//   return response.data;
// };

// export const loginUser = async (data: {
//   email: string;
//   password: string;
// }) => {
//   console.log("Sending Login Data:", data);

//   const response = await axios.post(
//     "http://localhost:5000/api/v1/auth/login",
//     data
//   );

//   return response.data;
// };


import api from "../api/axios";

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  console.log("Sending Login Data:", data);

  const response = await api.post("/auth/login", data);

  console.log("SERVICE RESPONSE:", response);

  return response.data;
};