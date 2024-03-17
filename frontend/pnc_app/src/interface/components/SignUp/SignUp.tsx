import React from "react";
import { useNavigate } from "react-router-dom";
import { register as registerService } from "../../../data/services/authService";
import { useForm } from "react-hook-form";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { BoxLabelColumn } from "../../partials/BoxLabelColumn";
import "./../../styles/global.css";

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingX: isMobile ? "1rem" : "0",
        width: "100%",
      }}>
      <span
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          padding: "1.25rem 0",
          textAlign: "center",
        }}>
        {isMobile ? "Join the conversation" : "Create your account"}
      </span>
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
          {errors.name && <p>Name is required.</p>}
        </BoxLabelColumn>

        <BoxLabelColumn>
          <label htmlFor="username">Username</label>
          <input
            className="iptSignUp"
            id="username"
            {...register("username", { required: true })}
            placeholder="Username"
          />
          {errors.username && <p>Username is required.</p>}
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
          {errors.email && <p>Email is required.</p>}
        </BoxLabelColumn>

        <BoxLabelColumn>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="iptSignUp"
            id="password"
            type="password"
            {...register("password", { required: true, minLength: 8 })}
            placeholder="Password"
          />
          {errors.password && <p>Password is required and must be at least 8 characters long.</p>}
        </BoxLabelColumn>

        <button type="submit">Sign Up</button>
      </form>
    </Box>
  );
};
export default SignUp;
