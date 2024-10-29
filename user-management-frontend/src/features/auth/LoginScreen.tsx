// src/features/auth/LoginScreen.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { routes } from "../../config/routes";

interface LoginFormInputs {
  username: string;
  password: string;
}

// Validation schema
const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  // Mock authentication function
  const onSubmit = (data: LoginFormInputs) => {
    if (data.username === "admin" && data.password === "password123") {
      // Assume successful login and store auth status (mock)
      localStorage.setItem("isAuthenticated", "true");
      navigate(routes.home);
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register("username")} />
          {errors.username && (
            <p className="error-message">{errors.username.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
