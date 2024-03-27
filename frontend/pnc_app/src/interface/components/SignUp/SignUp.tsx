import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as registerService } from "../../../data/services/authService";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedIcon, setClickedIcon] = useState("");
  //clickedIcon would be supposed to use when i want to show the name dinamycally

  const onSubmit = handleSubmit(async (data) => {
    try {
      await registerService(data); // Calling backend to register the user
      navigate("/create-your-profile"); // Adjust this to create a profile route
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

  // Add a listener to get a hover on icons
  const [hoveredIcon, setHoveredIcon] = useState("");

  const handleIconClick = (iconName: string) => {
    setClickedIcon(iconName);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
            fontSize: "2rem",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bolder",
            padding: isMobile ? "1.25rem 1.25rem 0" : "0",
            lineHeight: isMobile ? "1" : "1.25",
            height: isMobile ? "auto" : "fit-content",
            textAlign: "center",
            color: "#001640",
          }}>
          {isMobile ? "Join the conversation" : "Create your account"}
        </span>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            gap: isMobile ? "0" : "2rem",
          }}>
          {/* FORM INPUTS  */}
          <Box
            sx={{
              width: isMobile ? "100%" : "50%",
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "0.4rem" : "1rem",
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
          <div className="box_line" style={{ display: isMobile ? "none" : "" }}>
            <div className="line" style={{ display: isMobile ? "none" : "flex" }}></div>
            <Shell color="#81c6c4" size={15} />
            <div className="line" style={{ display: isMobile ? "none" : "flex" }}></div>
          </div>
          {/* Social SignUp */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: isMobile ? 2 : 0,
            }}>
            <span className="or">OR</span>
            <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <i
                className={`devicon-linkedin-plain icon ${
                  hoveredIcon === "linkedin" ? "colored" : ""
                }`}
                onMouseEnter={() => setHoveredIcon("linkedin")}
                onMouseLeave={() => setHoveredIcon("")}
                onClick={() => handleIconClick("LinkedIn")}></i>

              <i
                className={`devicon-twitter-original icon ${
                  hoveredIcon === "twitter" ? "colored" : ""
                }`}
                onMouseEnter={() => setHoveredIcon("twitter")}
                onMouseLeave={() => setHoveredIcon("")}
                onClick={() => handleIconClick("Twitter")}></i>

              <i
                className={`devicon-google-plain icon ${hoveredIcon === "google" ? "colored" : ""}`}
                onMouseEnter={() => setHoveredIcon("google")}
                onMouseLeave={() => setHoveredIcon("")}
                onClick={() => handleIconClick("Google")}></i>
            </Box>
          </Box>
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
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <span
              style={{ display: "flex", gap: "0.4rem", color: "#637087", fontSize: "0.875rem" }}>
              Already a user?
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#1A5CE5", fontWeight: "bold" }}>
                Log In
              </Link>
            </span>
          </Box>
        </div>
      </form>

      {/* Modal */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle> Bad news my friend...</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To sign up with this social media platform, it's necessary to configure the <b>OAuth</b>{" "}
            in Server Side, it means that i have to create this full app to get the API key, adjust
            the server's CallBack URL and use some stuff with different languages and libs like
            NodeJS (Passaport.js) or just Java (Spring Security and OAuth2) that i used to build the
            Backend. So, my objective here is just show the potencial of a Mid-Social platform in
            Full Stack case.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default SignUp;
