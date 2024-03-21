import { Box, useMediaQuery, useTheme } from "@mui/material";
import BackgroundS from "../interface/components/SignUp/Background";

const LogInPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Box>
        <Box>
          <BackgroundS />
        </Box>
      </Box>
    </div>
  );
};

export default LogInPage;
