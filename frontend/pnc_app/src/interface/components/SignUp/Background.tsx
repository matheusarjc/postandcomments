import { Box } from "@mui/material";
import backgroundImage from "../../../assets/background1.svg";

const BackgroundS: React.FC = () => {
  return (
    <Box sx={{ display: "flex", borderRadius: "80px", overflow: "hidden", width: "35%" }}>
      <img src={backgroundImage} alt="Background" style={{ width: "100%" }} />;
    </Box>
  );
};

export default BackgroundS;
