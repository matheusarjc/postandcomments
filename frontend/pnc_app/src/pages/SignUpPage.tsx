import { Box, useMediaQuery, useTheme } from "@mui/material";
import BackgroundS from "../interface/components/SignUp/Background";
import SignUp from "../interface/components/SignUp/SignUp";

const SignUpPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className="signup-page">
      <Box sx={{ paddingX: isMobile ? "0" : "7rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row-reverse",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <BackgroundS />
          <SignUp />
        </Box>
      </Box>
    </div>
  );
};

export default SignUpPage;
