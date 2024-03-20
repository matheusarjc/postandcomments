import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerService } from "../../../data/services/authService";
import { useForm } from "react-hook-form";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { BoxLabelColumn } from "../../partials/BoxLabelColumn";
import "./../../styles/global.css";
import { Eye, EyeOff } from "lucide-react";

type FormData = {
  name: string;
  username: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await registerService(data); // This calls your backend to register the user
      navigate("/mainpage"); // Adjust this to your main page's route
    } catch (error) {
      console.error("Registration error:", error);
      // Handle errors, e.g., show an error message to the user
    }
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingX: isMobile ? "1rem" : "0.5rem",
        paddingTop: isMobile ? "0" : "3rem ",
        overflow: "hidden",
        width: "100%",
      }}>
      <span
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          padding: isMobile ? "1.25rem 0" : "0",
          textAlign: "center",
        }}>
        {isMobile ? "Join the conversation" : "Create your account"}
      </span>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", gap: isMobile ? "1.5rem" : "0.5rem" }}>
        <BoxLabelColumn>
          <label htmlFor="name" style={{ fontSize: "1rem" }}>
            Name
          </label>
          <input
            className="iptSignUp"
            id="name"
            {...register("name", { required: true })}
            placeholder="Name"
          />
          {errors.name && <p className="errorMsg">Name is required.</p>}
        </BoxLabelColumn>

        <BoxLabelColumn>
          <label htmlFor="username">Username</label>
          <input
            className="iptSignUp"
            id="username"
            {...register("username", { required: true })}
            placeholder="Username"
          />
          {errors.username && <p className="errorMsg">Username is required.</p>}
        </BoxLabelColumn>

        <BoxLabelColumn>
          <label htmlFor="email">Email</label>
          <input
            className="iptSignUp"
            id="email"
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email && <p className="errorMsg">Email is required.</p>}
        </BoxLabelColumn>

        <BoxLabelColumn>
          <label className="label" htmlFor="password">
            Password
          </label>
          <div className="input-eye-container">
            <input
              className="iptSignUp iptPsw"
              id="password"
              type={passwordShown ? "text" : "password"}
              {...register("password", { required: true, minLength: 8 })}
              placeholder="Password"
            />
            <span onClick={togglePasswordVisibility} className="Eye">
              {passwordShown ? <EyeOff color="#637087" /> : <Eye color="#637087" />}
            </span>
          </div>
          {errors.password && (
            <p className="errorMsg">Password is required and must be at least 8 characters long.</p>
          )}
        </BoxLabelColumn>

        <span
          style={{
            color: "#637087",
            marginTop: isMobile ? "-0.75rem" : "1rem",
            lineHeight: 1.2,
            fontSize: "0.875rem",
            textAlign: isMobile ? "start" : "center",
          }}>
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            paddingBottom: isMobile ? "5rem" : "2rem",
          }}>
          <button
            className="accBtn"
            style={{ backgroundColor: "#1A5CE5", color: "#FFFFFF" }}
            type="submit">
            Sign Up
          </button>
          <button className="accBtn" type="button">
            <a style={{ textDecoration: "none", color: "#121217" }} href="">
              Log In
            </a>
          </button>
        </div>
      </form>
    </Box>
  );
};
export default SignUp;
