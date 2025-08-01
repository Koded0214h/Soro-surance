import React, { createContext, useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for token on mount and set user accordingly
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // Optionally, decode token or verify validity here
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await api.post("/auth/login/", { email, password });
      const accessToken = response.data.access;
      localStorage.setItem("access_token", accessToken);
      setUser({ email });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
      setUser(null);
    }
  };

  const register = async (full_name, phone, email, password) => {
    setError(null);
    try {
      await api.post("/auth/register/", { full_name, phone, email, password });
      // After successful registration, redirect to login page or auto-login
      navigate("/auth");
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    navigate("/auth");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
