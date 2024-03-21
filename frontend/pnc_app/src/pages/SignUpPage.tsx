import { Box, useMediaQuery, useTheme } from "@mui/material";
import BackgroundS from "../interface/components/SignUp/Background";
import SignUp from "../interface/components/SignUp/SignUp";

const SignUpPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        paddingX: isMobile ? "0" : "7rem",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row-reverse",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: isMobile ? "0" : "3rem",
        }}>
        <BackgroundS />
        <SignUp />
      </Box>
    </Box>
  );
};

export default SignUpPage;
