import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FadeMenu from "../partials/MenuTransition";

export const HeaderS: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" color="inherit" aria-label="menu">
            <FadeMenu />
          </IconButton>
        )}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My App
        </Typography>
        {!isMobile && <Button color="inherit">Login</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default HeaderS;
