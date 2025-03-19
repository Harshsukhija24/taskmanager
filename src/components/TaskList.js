import React, { useState, useEffect } from "react";
import {
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  Typography,
  Box,
  Chip,
  Card,
  CardContent,
  Grid,
  Tooltip,
  CircularProgress,
  Divider,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as PendingIcon,
  Sort as SortIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { taskService } from "../services/taskService";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [sortOrder, setSortOrder] = useState("asc");
  const [formData, setFormData] = useState({
    title: "",
    completed: false,
    description: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getAllTasks();
      const enhancedData = data.slice(0, 20).map((task) => ({
        ...task,
        description:
          task.description ||
          `Task details for "${task.title}". This is a placeholder description.`,
      }));
      setTasks(enhancedData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (task = null) => {
    if (task) {
      setEditingTask(task);
      setFormData({
        title: task.title,
        completed: task.completed,
        description: task.description || "",
      });
    } else {
      setEditingTask(null);
      setFormData({
        title: "",
        completed: false,
        description: "",
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTask(null);
    setFormData({
      title: "",
      completed: false,
      description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "completed" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask.id, formData);
        setTasks((prev) =>
          prev.map((task) =>
            task.id === editingTask.id ? { ...task, ...formData } : task
          )
        );
        showSnackbar("Task updated successfully", "success");
      } else {
        const newTask = await taskService.createTask(formData);
        setTasks((prev) => [
          { ...newTask, description: formData.description },
          ...prev,
        ]);
        showSnackbar("Task created successfully", "success");
      }
      handleClose();
    } catch (error) {
      console.error("Error saving task:", error);
      showSnackbar("Error saving task. Please try again.", "error");
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskService.deleteTask(taskId);
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
        showSnackbar("Task deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting task:", error);
        showSnackbar("Error deleting task. Please try again.", "error");
      }
    }
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedTasks = [...tasks].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    setTasks(sortedTasks);
  };

  const handleStatusChange = async (task) => {
    const updatedTask = {
      ...task,
      completed: !task.completed,
    };

    try {
      await taskService.updateTask(task.id, updatedTask);
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
      showSnackbar(
        `Task marked as ${updatedTask.completed ? "completed" : "pending"}`,
        "success"
      );
    } catch (error) {
      console.error("Error updating task status:", error);
      showSnackbar("Error updating task status. Please try again.", "error");
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <Alert
          severity="error"
          sx={{ mb: 3, width: "100%", maxWidth: 500 }}
          action={
            <Button
              color="inherit"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={fetchTasks}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Card
        elevation={2}
        sx={{
          mb: 4,
          borderRadius: "16px",
          p: 2,
          background: "linear-gradient(45deg, #f9f9f9 30%, #ffffff 90%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            fontWeight="600"
            color="primary"
          >
            Your Tasks
          </Typography>
          <Box>
            <Tooltip title="Sort tasks">
              <IconButton onClick={handleSort} sx={{ mr: 1 }} color="primary">
                <SortIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpen()}
              sx={{
                borderRadius: "8px",
                px: 3,
                py: 1,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              Add Task
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          {tasks.length === 0 ? (
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: "12px",
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                }}
              >
                <Typography variant="body1" color="textSecondary">
                  No tasks found. Create your first task to get started!
                </Typography>
              </Paper>
            </Grid>
          ) : (
            tasks.map((task, index) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Card
                  elevation={1}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        mb: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          flexGrow: 1,
                          fontWeight: 500,
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                          color: task.completed
                            ? "text.secondary"
                            : "text.primary",
                        }}
                      >
                        {task.title}
                      </Typography>
                      <Chip
                        icon={
                          task.completed ? (
                            <CheckCircleIcon fontSize="small" />
                          ) : (
                            <PendingIcon fontSize="small" />
                          )
                        }
                        label={task.completed ? "Completed" : "Pending"}
                        size="small"
                        color={task.completed ? "success" : "warning"}
                        variant="outlined"
                        onClick={() => handleStatusChange(task)}
                        sx={{ ml: 1, fontWeight: 500 }}
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, flexGrow: 1 }}
                    >
                      {task.description}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: "auto",
                      }}
                    >
                      <Tooltip title="Edit Task">
                        <IconButton
                          size="small"
                          onClick={() => handleOpen(task)}
                          sx={{ color: "primary.main" }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Task">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(task.id)}
                          sx={{ color: "error.main" }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "12px",
            padding: "8px",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" component="span" fontWeight={600}>
            {editingTask ? "Edit Task" : "Create New Task"}
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Task Title"
              type="text"
              fullWidth
              value={formData.title}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Checkbox
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
                color="success"
              />
              <Typography component="span">Mark as completed</Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ borderRadius: "8px", px: 3 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "8px",
                px: 3,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {editingTask ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskList;
