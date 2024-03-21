import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as registerService } from "../../../data/services/authService";
import { useForm } from "react-hook-form";
import { Box, InputLabel, TextField, useMediaQuery, useTheme } from "@mui/material";
import { BoxLabelColumn } from "../../partials/BoxLabelColumn";
import "./../../styles/global.css";
import { Eye, EyeOff, Shell } from "lucide-react";

type FormData = {
  name: string;
  username: string;
  email: string;
  password: string;
  errors: any;
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
        //paddingTop: isMobile ? "0" : "3rem ",
        overflow: "hidden",
        width: "100%",
      }}>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", gap: isMobile ? "1.5rem" : "0.5rem" }}>
        <span
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            padding: isMobile ? "1.25rem" : "0",
            height: isMobile ? "auto" : "fit-content",
            textAlign: "center",
          }}>
          {isMobile ? "Join the conversation" : "Create your account"}
        </span>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          {/* FORM INPUTS  */}
          <Box sx={{ width: isMobile ? "100%" : "60%" }}>
            <BoxLabelColumn>
              <InputLabel htmlFor="name" style={{ fontSize: "1rem" }}>
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  {...register("name", { required: true })}
                />
              </InputLabel>

              {errors.name && <p className="errorMsg">Name is required.</p>}
            </BoxLabelColumn>

            <BoxLabelColumn>
              <InputLabel htmlFor="email" style={{ fontSize: "1rem" }}>
                <TextField
                  id="email"
                  label="E-mail"
                  variant="outlined"
                  type="email"
                  {...register("email", { required: true })}
                />
              </InputLabel>
              {errors.email && <p className="errorMsg">Email is required.</p>}
            </BoxLabelColumn>

            <BoxLabelColumn>
              <InputLabel htmlFor="password" style={{ fontSize: "1rem" }}>
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  type={passwordShown ? "text" : "password"}
                  {...register("password", { required: true })}
                />
              </InputLabel>
              <span onClick={togglePasswordVisibility} className="Eye">
                {passwordShown ? <EyeOff color="#637087" /> : <Eye color="#637087" />}
              </span>
              {errors.password && (
                <p className="errorMsg">
                  Password is required and must be at least 8 characters long.
                </p>
              )}
            </BoxLabelColumn>
          </Box>
          {/* Divisor */}
          <div className="box_line">
            <div className="line"></div>
            <Shell color="#81c6c4" size={15} />
            <div className="line"></div>
          </div>
          {/* Social SignUp */}
        </Box>
        <span
          style={{
            color: "#637087",
            marginTop: isMobile ? "-0.75rem" : "1rem",
            lineHeight: 1.2,
            fontSize: "0.875rem",
            textAlign: "start",
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
            <Link to="/login" style={{ textDecoration: "none", color: "#121217" }}>
              Log In
            </Link>
          </button>
        </div>
      </form>
    </Box>
  );
};
export default SignUp;
