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
    formState: { errors, touchedFields },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await registerService(data); // Calling backend to register the user
      navigate("/mainpage"); // Adjust this to your main page's route
    } catch (error) {
      console.error("Registration error:", error);
    }
  });

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  // It will show the color of the <TextField> if is valid
  const getFieldColor = (
    fieldError: boolean,
    fieldTouched: boolean
  ): "success" | "error" | "primary" => {
    if (fieldTouched && !fieldError) return "success";
    if (fieldError) return "error";
    return "primary";
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingX: isMobile ? "1rem" : "0.5rem",
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
          <Box
            sx={{
              width: isMobile ? "100%" : "50%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}>
            <BoxLabelColumn>
              <InputLabel htmlFor="name" style={{ fontSize: "1rem", paddingTop: "0.75rem" }}>
                <TextField
                  id="name"
                  label="Full Name"
                  variant="outlined"
                  {...register("name", {
                    required: "Full Name is Required",
                    pattern: {
                      value: /^[a-zA-Z]+ [a-zA-Z]+$/,
                      message: "Please, write your full name (first and last name).",
                    },
                  })}
                  sx={{ width: "100%" }}
                  error={!!errors.name} // ==> "!" makes the value as boolean | "!!" reverses the value again, returning to the original boolean as true or false.
                  helperText={errors.name?.message}
                  color={getFieldColor(!!errors.name, !!touchedFields.name)}
                />
              </InputLabel>
            </BoxLabelColumn>

            <BoxLabelColumn>
              <InputLabel htmlFor="email" style={{ fontSize: "1rem", paddingTop: "0.75rem" }}>
                <TextField
                  id="email"
                  label="E-mail"
                  variant="outlined"
                  type="email"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  sx={{ width: "100%" }}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  color={getFieldColor(!!errors.email, !!touchedFields.email)}
                />
              </InputLabel>
            </BoxLabelColumn>

            <BoxLabelColumn>
              <InputLabel htmlFor="password" style={{ fontSize: "1rem", paddingTop: "0.75rem" }}>
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  type={passwordShown ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                  sx={{ width: "100%" }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  color={getFieldColor(!!errors.password, !!touchedFields.password)}
                />
                <span
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                  className="Eye">
                  {passwordShown ? <EyeOff color="#637087" /> : <Eye color="#637087" />}
                </span>
              </InputLabel>
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
            textAlign: "center",
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
