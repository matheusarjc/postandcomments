import axios from "axios";

const API_URL = "http://localhost:8080/users/";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const register = async (signUpData: SignUpData) => {
  try {
    const response = await axios.post(`${API_URL}signup`, signUpData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (loginData: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}login`, loginData);
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
