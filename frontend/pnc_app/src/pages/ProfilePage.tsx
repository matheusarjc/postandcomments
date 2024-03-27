import React from "react";
import ProfileSetup, {
  ProfileFormData,
} from "../../src/interface/components/ProfileSetup/ProfileSetup";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Definição da função onSubmit
  const handleProfileSubmit = (data: ProfileFormData) => {
    console.log(data); // Aqui você lidaria com os dados do perfil, talvez enviando para o servidor

    fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Box sx={{ width: isMobile ? "75%" : "auto" }}>
        {/* Passando handleProfileSubmit como a prop onSubmit para ProfileSetup */}
        <ProfileSetup onSubmit={handleProfileSubmit} />
      </Box>
    </Box>
  );
};

export default ProfilePage;
