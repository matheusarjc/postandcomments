import { Box, useMediaQuery, useTheme } from "@mui/material";
import backgroundImage from "../../../assets/background1.svg";

const BackgroundS: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: isMobile ? "0" : "80px",
        overflow: "hidden",
        width: isMobile ? "100%" : "35%",
        height: isMobile ? "10%" : "auto",
      }}>
      <img src={backgroundImage} alt="Background" style={{ width: "100%" }} />;
    </Box>
  );
};

export default BackgroundS;
