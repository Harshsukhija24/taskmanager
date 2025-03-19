import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Avatar,
  Grow,
  Fade,
} from "@mui/material";
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  TaskAlt as TaskIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(credentials);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={800}>
              <Box
                sx={{
                  color: "#fff",
                  pr: { md: 6 },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Grow in={true} timeout={1000}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "center", md: "flex-start" },
                      mb: 4,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 70,
                        height: 70,
                        bgcolor: "#fff",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <TaskIcon fontSize="large" color="primary" />
                    </Avatar>
                  </Box>
                </Grow>
                <Typography
                  variant="h3"
                  component="h1"
                  fontWeight="700"
                  gutterBottom
                >
                  Task Management
                </Typography>
                <Typography
                  variant="h4"
                  component="h2"
                  fontWeight="700"
                  gutterBottom
                >
                  Dashboard
                </Typography>
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grow in={true} timeout={500}>
              <Card
                elevation={10}
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      component="h1"
                      variant="h4"
                      fontWeight="700"
                      color="primary"
                      gutterBottom
                    >
                      Welcome
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 4, textAlign: "center" }}
                    >
                      Sign in to access your dashboard and manage your tasks
                    </Typography>

                    {error && (
                      <Alert
                        severity="error"
                        sx={{ width: "100%", mb: 3, borderRadius: 2 }}
                        variant="filled"
                      >
                        {error}
                      </Alert>
                    )}

                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      sx={{ width: "100%" }}
                    >
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={credentials.username}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          mb: 3,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        value={credentials.password}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="primary" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={togglePasswordVisibility}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          mb: 3,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                          mt: 3,
                          mb: 3,
                          py: 1.5,
                          borderRadius: 2,
                          fontWeight: 600,
                          fontSize: "1rem",
                          boxShadow: "0 4px 10px rgba(25, 118, 210, 0.3)",
                          "&:hover": {
                            boxShadow: "0 6px 15px rgba(25, 118, 210, 0.4)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        Sign In
                      </Button>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: 2,
                          p: 2,
                          borderRadius: 2,
                          bgcolor: "rgba(0, 0, 0, 0.03)",
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontWeight: 500 }}
                        >
                          Demo credentials: <strong>admin</strong> /{" "}
                          <strong>admin123</strong>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginPage;
