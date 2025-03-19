import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Skeleton,
  Tooltip,
  IconButton,
  Chip,
  Collapse,
  LinearProgress,
  Card,
  Alert,
  Badge,
} from "@mui/material";
import {
  Mail as MailIcon,
  Chat as ChatIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  MoreVert as MoreIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { userService } from "../services/userService";

const UserProfile = ({ showInSidebar = true }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getRandomUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load team members. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExpandUser = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  const getRandomProgress = () => Math.floor(Math.random() * 100);

  if (loading) {
    return (
      <Box sx={{ px: showInSidebar ? 0 : 3, py: 2 }}>
        {[...Array(showInSidebar ? 3 : 5)].map((_, index) => (
          <Box
            key={index}
            sx={{ mb: 2, display: "flex", alignItems: "center" }}
          >
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ mr: 2 }}
            />
            <Box sx={{ width: "100%" }}>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="90%" height={20} />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ px: showInSidebar ? 0 : 3, py: 2 }}>
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={
            <IconButton color="inherit" size="small" onClick={fetchUsers}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Box sx={{ px: showInSidebar ? 0 : 3, py: 2 }}>
        <Alert severity="info">No team members found.</Alert>
      </Box>
    );
  }

  const displayUsers = showInSidebar ? users.slice(0, 5) : users;

  return (
    <List sx={{ px: 0 }}>
      {displayUsers.map((user, index) => {
        const isExpanded = expandedUser === user.id;
        const taskProgress = getRandomProgress();

        return (
          <Box key={user.id}>
            <ListItem
              alignItems="flex-start"
              sx={{
                px: 2,
                py: showInSidebar ? 1 : 1.5,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <ListItemAvatar>
                <Tooltip title={user.online ? "Online" : "Offline"}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: user.online ? "#44b700" : "#bdbdbd",
                        color: user.online ? "#44b700" : "#bdbdbd",
                        boxShadow: `0 0 0 2px ${
                          user.online ? "#fff" : "#f5f5f5"
                        }`,
                        "&::after": {
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          animation: user.online
                            ? "ripple 1.2s infinite ease-in-out"
                            : "none",
                          border: "1px solid currentColor",
                          content: '""',
                        },
                      },
                      "@keyframes ripple": {
                        "0%": {
                          transform: "scale(.8)",
                          opacity: 1,
                        },
                        "100%": {
                          transform: "scale(2.4)",
                          opacity: 0,
                        },
                      },
                    }}
                  >
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      sx={{
                        width: showInSidebar ? 40 : 50,
                        height: showInSidebar ? 40 : 50,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        border: "2px solid #fff",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        },
                      }}
                    />
                  </Badge>
                </Tooltip>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant={showInSidebar ? "body2" : "subtitle1"}
                      fontWeight={500}
                      sx={{ color: "primary.main" }}
                    >
                      {user.name}
                    </Typography>
                    {!showInSidebar && (
                      <Box>
                        <Tooltip title="Send message">
                          <IconButton
                            size="small"
                            color="primary"
                            sx={{ mr: 0.5 }}
                          >
                            <ChatIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="More options">
                          <IconButton
                            size="small"
                            onClick={() => handleExpandUser(user.id)}
                            color={isExpanded ? "primary" : "default"}
                          >
                            <MoreIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  </Box>
                }
                secondary={
                  <Box>
                    {!showInSidebar && (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 0.5,
                          }}
                        >
                          <MailIcon
                            fontSize="small"
                            color="action"
                            sx={{ mr: 0.5, fontSize: 16 }}
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            {user.email}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 0.5,
                          }}
                        >
                          <LocationIcon
                            fontSize="small"
                            color="action"
                            sx={{ mr: 0.5, fontSize: 16 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {user.location}
                          </Typography>
                        </Box>
                      </>
                    )}

                    {showInSidebar && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          display: "block",
                          lineHeight: 1.2,
                          fontSize: "0.7rem",
                          mt: 0.3,
                        }}
                      >
                        {user.role || "Team Member"}
                      </Typography>
                    )}

                    {!showInSidebar && isExpanded && (
                      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <Card
                          variant="outlined"
                          sx={{
                            mt: 2,
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: "background.default",
                          }}
                        >
                          <Box sx={{ mb: 1.5 }}>
                            <Typography
                              variant="caption"
                              component="div"
                              color="text.secondary"
                              fontWeight={500}
                            >
                              Task Progress
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box sx={{ width: "100%", mr: 1 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={taskProgress}
                                  sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    bgcolor: "rgba(0,0,0,0.05)",
                                  }}
                                />
                              </Box>
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {taskProgress}%
                                </Typography>
                              </Box>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              gap: 0.5,
                              flexWrap: "wrap",
                              mt: 1,
                            }}
                          >
                            <Tooltip title="Call">
                              <Chip
                                icon={<PhoneIcon fontSize="small" />}
                                label="Call"
                                size="small"
                                variant="outlined"
                                onClick={() => {}}
                                sx={{ fontSize: "0.75rem" }}
                              />
                            </Tooltip>
                            <Tooltip title="Message">
                              <Chip
                                icon={<ChatIcon fontSize="small" />}
                                label="Message"
                                size="small"
                                variant="outlined"
                                onClick={() => {}}
                                sx={{ fontSize: "0.75rem" }}
                              />
                            </Tooltip>
                            <Tooltip title="Profile">
                              <Chip
                                icon={<PersonIcon fontSize="small" />}
                                label="Profile"
                                size="small"
                                variant="outlined"
                                onClick={() => {}}
                                sx={{ fontSize: "0.75rem" }}
                              />
                            </Tooltip>
                          </Box>
                        </Card>
                      </Collapse>
                    )}
                  </Box>
                }
              />
            </ListItem>
            {index < displayUsers.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </Box>
        );
      })}
    </List>
  );
};

export default UserProfile;
