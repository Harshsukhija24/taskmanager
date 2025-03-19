import React from "react";
import { Box, Typography, Avatar, Drawer, useTheme } from "@mui/material";
import { Dashboard as DashboardIcon } from "@mui/icons-material";
import UserProfile from "./UserProfile";

const Sidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background:
            mode === "light"
              ? "linear-gradient(45deg, #1565c0 0%, #1976d2 100%)"
              : "primary.main",
          color: "white",
          boxShadow:
            mode === "light" ? "0 4px 20px rgba(0, 0, 0, 0.15)" : "none",
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: "#fff",
            color: "primary.main",
            mb: 1,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
            border:
              mode === "light" ? "4px solid rgba(255, 255, 255, 0.2)" : "none",
          }}
        >
          <DashboardIcon fontSize="large" />
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>
          Task Manager
        </Typography>
        <Typography
          variant="body2"
          sx={{ opacity: 0.9, mt: 0.5, textAlign: "center" }}
        >
          Organize your work efficiently
        </Typography>
      </Box>

      <Box sx={{ p: 2, pb: 0 }}>
        <Typography
          variant="overline"
          sx={{
            display: "block",
            fontWeight: 600,
            color: "text.secondary",
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
          }}
        >
          Team Members
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <UserProfile />
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
            height: "100%",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            boxShadow:
              mode === "light" ? "2px 0 10px rgba(0, 0, 0, 0.05)" : "none",
            border: "none",
            height: "100%",
            bgcolor:
              mode === "light" ? "background.paper" : "background.default",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
