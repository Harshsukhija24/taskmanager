import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const taskService = {
  getAllTasks: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  createTask: async (task) => {
    try {
      const response = await axios.post(API_URL, {
        userId: 1,
        title: task.title,
        completed: false,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  updateTask: async (taskId, task) => {
    try {
      const response = await axios.put(`${API_URL}/${taskId}`, {
        userId: 1,
        id: taskId,
        title: task.title,
        completed: task.completed,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  deleteTask: async (taskId) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      return taskId;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },
};
