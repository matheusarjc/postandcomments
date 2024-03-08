import { Box } from "@mui/material";
import BackgroundS from "../interface/components/SignUp/Background";
import SignUp from "../interface/components/SignUp/SignUp";

const SignUpPage: React.FC = () => {
  return (
    <div className="signup-page">
      <Box sx={{ paddingX: "7rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            width: "100%",
            gap: "2rem",
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
