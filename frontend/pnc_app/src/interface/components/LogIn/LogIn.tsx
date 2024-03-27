import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginService } from "../../../data/services/authService";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import "../../styles/global.css";
import { BoxLabelColumn } from "./../../partials/BoxLabelColumn";

// Typing of data
type FormData = {
  email: string;
  password: string;
};

//  Component for displaying the login page
const LogIn: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  // STATES
  const [hoveredIcon, setHoveredIcon] = useState("");
  const [clickedIcon, setClickedIcon] = useState(""); // clickedIcon ==> Show the name of  icon that has been clicked on (for accessibility)
  const [modalOpen, setModalOpen] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [loginError, setLoginError] = useState(""); // loginError ==> Show  error message if any error occurs during logging in
  const [loginAttempts, setLoginAttempts] = useState(0);

  // HANDLERS******
  const onSubmit = handleSubmit(async (data) => {
    // Handle to Log In an account
    try {
      await loginService(data); // Callback to backend service
      navigate("/mainpage"); // Going to the mainpage
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Email not registered or wrong password.");
      setLoginAttempts((prev) => prev + 1); // Increase the attempts
    }
  });

  const loginService = async (data: FormData) => {
    console.log(data); // Simulando a chamada de login
  };

  //  Function that manages the icons hover effect
  const handleIconClick = (iconName: string) => {
    setClickedIcon(iconName);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Render password visibilty
  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);

  return (
    // Creating a Log In Card
    <Box
      className="Card"
      sx={{
        width: isMobile ? "100%" : "30vw",
        boxShadow: isMobile ? "none" : "-1px 8px 19px -1px rgba(0,0,0,0.75);",
        p: isMobile ? 1 : 4,
        height: "100%",
        borderRadius: "1rem",
      }}>
      {/* Form Data Box */}
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
            Log In
          </span>
          {/* Inputs DATA */}
          <BoxLabelColumn>
            <InputLabel htmlFor="email" style={{ fontSize: "1rem", paddingTop: "0.75rem" }}>
              <TextField
                id="email"
                label="E-mail"
                variant="outlined"
                type="email"
                {...register("email", { required: "Email is required." })}
                sx={{ width: "100%" }}
                error={!!errors.email}
                helperText={errors.email?.message}
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
                {...register("password", { required: "Password is required." })}
                sx={{ width: "100%" }}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <span
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
                className="Eye">
                {passwordShown ? <EyeOff color="#637087" /> : <Eye color="#637087" />}
              </span>
            </InputLabel>
          </BoxLabelColumn>
          {/* ICONS BOX */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
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
          {/* Log In's Button and forget link */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              m: isMobile ? 0 : 1,
            }}>
            {loginAttempts >= 1 && (
              <Box
                sx={{
                  textAlign: "end",
                  fontSize: "0.7rem",
                  mt: 1.5,
                }}>
                <Link style={{ textDecoration: "none", color: "#637087" }} to="/forgot-password">
                  Forgot your password?
                </Link>
              </Box>
            )}
            <Button
              type="submit"
              sx={{ bgcolor: "#1A5CE5", color: "#FFFFFF", "&:hover": { bgcolor: "#163E7E" } }}>
              Log In
            </Button>
          </Box>
          {/* Log In's Button and forget link */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <span
              style={{ display: "flex", gap: "0.4rem", color: "#637087", fontSize: "0.875rem" }}>
              New here?
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "#1A5CE5", fontWeight: "bold" }}>
                Sign Up
              </Link>
            </span>
          </Box>
        </form>
      </Box>
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

export default LogIn;
