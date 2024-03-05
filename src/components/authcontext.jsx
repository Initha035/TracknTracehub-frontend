import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
import axios from "axios";
import { API_URL } from "../utils/const";
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if the user is already authenticated and set the user state accordingly
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (email, password) => {
    // Make an API request to authenticate the user and get a JWT token
    try {
      const response = await axios.post(API_URL + "/api/login", {
        email,
        password,
      });
      const { token, user } = response.data;
      // Store the user data and token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setToken(token);
      return true;
    } catch (error) {
      // Handle login error
      console.error(error);
      return false;
    }
  };
  const register = async (
    name,
    email,
    password,
    password_confirmation,
    is_volunteer
  ) => {
    // Make an API request to authenticate the user and get a JWT token
    try {
      const response = await axios.post(API_URL + "/api/register", {
        name,
        email,
        password,
        password_confirmation,
        is_volunteer,
      });
      const { token, user } = response.data;
      // Store the user data and token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setToken(token);
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  const logout = () => {
    // Remove the user data and token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
