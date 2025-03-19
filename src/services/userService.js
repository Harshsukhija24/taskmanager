import axios from "axios";

const API_URL = "https://randomuser.me/api";

// Predefined roles for random assignment
const roles = [
  "Project Manager",
  "Developer",
  "Designer",
  "QA Engineer",
  "DevOps",
  "Marketing",
  "Product Owner",
  "UX Researcher",
];

export const userService = {
  getRandomUsers: async (count = 5) => {
    try {
      const response = await axios.get(`${API_URL}/?results=${count}`);
      return response.data.results.map((user) => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        avatar: user.picture.medium,
        location: `${user.location.city}, ${user.location.country}`,
        role: roles[Math.floor(Math.random() * roles.length)],
        phone: user.phone,
        online: Math.random() > 0.3, // Randomly set some users as online
      }));
    } catch (error) {
      console.error("Error fetching random users:", error);
      throw error;
    }
  },
};
