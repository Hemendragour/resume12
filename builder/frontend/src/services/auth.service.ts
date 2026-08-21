import api from "../api/axios";

export const loginUser = async (data: { email: string; password: string }) => {
  console.log("Sending Login Data:", data);

  const response = await api.post("/auth/login", data);

  console.log("SERVICE RESPONSE:", response.data.user);

  return response.data;
};

export const registerUser = async (data: {
  fullName: string;
  email: string;
  password: string;
}) => {
  console.log("Sending Register Data:", data);

  const response = await api.post("/auth/register", data);

  console.log("REGISTER RESPONSE:", response.data.user);

  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};
