import { useMediaQuery, useTheme } from "@mui/material";
import React, { ReactNode } from "react";

type BoxLabelColumnProps = {
  children?: ReactNode; // Children is optional
};

export const BoxLabelColumn: React.FC<BoxLabelColumnProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const labelStyle = {
    fontSize: isMobile ? "1rem" : "1.2rem",
    color: "#9e9e9e", // This should be the color of your label text as seen in the image
    marginBottom: "0.5rem", // Add some space below the label
  };

  const inputStyle = {
    width: "100%", // Full width
    padding: "10px", // Comfortable padding inside the input
    border: "1px solid #e0e0e0", // Light grey border as seen in the image
    borderRadius: "8px", // Rounded borders
    fontSize: "1rem", // Consistent font size
    marginBottom: "1rem", // Space below the input field
  };

  const errorStyle = {
    color: "red", // Errors are typically shown in red
    fontSize: "0.875rem", // Slightly smaller text for errors
    marginTop: "0.25rem", // Small space above the error message
  };

  return <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>{children}</div>;
};
