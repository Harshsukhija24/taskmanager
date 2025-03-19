import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
  Tooltip,
  Divider,
  Box,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = ({
  handleDrawerToggle,
  drawerWidth,
  darkMode,
  handleThemeToggle,
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const theme = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Define background styles based on theme
  const getBackgroundStyle = () => {
    if (darkMode) {
      return {
        backgroundColor: "rgba(18, 18, 18, 0.8)",
        color: theme.palette.common.white,
      };
    } else {
      // Light mode - gradient background
      return {
        background: "linear-gradient(90deg, #1976d2 0%, #2196f3 100%)",
        color: theme.palette.common.white,
      };
    }
  };

  const bgStyle = getBackgroundStyle();

  return (
    <AppBar
      position="fixed"
      elevation={4}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backdropFilter: "blur(8px)",
        ...bgStyle,
        borderBottom: darkMode
          ? (theme) => `1px solid ${theme.palette.divider}`
          : "none",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: darkMode
          ? "0 1px 3px rgba(0,0,0,0.12)"
          : "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            letterSpacing: "0.5px",
          }}
        >
          Dashboard
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              sx={{
                mx: 1,
                "&:hover": {
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton
              color="inherit"
              sx={{
                mx: 1,
                "&:hover": {
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <IconButton
              color="inherit"
              onClick={handleThemeToggle}
              sx={{
                mx: 1,
                "&:hover": {
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              height: 24,
              mx: 1,
              backgroundColor: darkMode
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(255, 255, 255, 0.5)",
            }}
          />

          <Button
            variant={darkMode ? "text" : "contained"}
            disableElevation
            color={darkMode ? "inherit" : "secondary"}
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              ml: 1,
              px: 2,
              backgroundColor: darkMode
                ? "transparent"
                : "rgba(255, 255, 255, 0.15)",
              "&:hover": {
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(255, 255, 255, 0.25)",
              },
              fontWeight: 500,
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
