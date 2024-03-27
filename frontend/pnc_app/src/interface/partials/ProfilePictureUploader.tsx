import React, { useRef, useState } from "react";
import { Avatar, Button, Box } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "../styles/global.css";

const ProfilePictureUploader: React.FC<{ onImageSelected: (file: File) => void }> = ({
  onImageSelected,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Especificando que o ref é para um input do tipo file

  const handleAvatarClick = (event: { preventDefault: () => void }) => {
    fileInputRef.current?.click();
    event.preventDefault(); // Uso do operador opcional para garantir que não tentaremos chamar click em null
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      onImageSelected(file); // Chamando o callback com o arquivo selecionado
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <input
        type="file"
        accept="image/*"
        capture="environment" // Sugerindo o uso da câmera traseira, mas isso depende do suporte do dispositivo
        style={{ display: "none", borderRadius: "999px" }}
        onChange={handleChange}
        ref={fileInputRef}
      />
      <Avatar
        alt="Profile picture"
        src={selectedImage || undefined} // Evita passar null diretamente para src
        sx={{ width: 100, height: 100, cursor: "pointer" }}
        onClick={handleAvatarClick}
        className="profile-picture"
      />
      {selectedImage && <Button onClick={() => setSelectedImage(null)}>Remover imagem</Button>}
      <Box mt={2} display="flex" alignItems="center">
        <CameraAltIcon sx={{ marginRight: 1 }} />
        Clique no avatar para alterar
      </Box>
    </Box>
  );
};

export default ProfilePictureUploader;
