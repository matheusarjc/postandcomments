import { Box, useMediaQuery, useTheme } from "@mui/material";
import LogIn from "../interface/components/LogIn/LogIn";

const LogInPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Box>
          <LogIn />
        </Box>
      </Box>
    </div>
  );
};

export default LogInPage;
