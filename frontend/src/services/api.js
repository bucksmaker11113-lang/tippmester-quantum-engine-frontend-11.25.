// Optimized axios baseURL for Hetzner deployment
// Uses environment variable instead of hardcoded localhost

import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000, // cost-effective: prevents long hanging requests
});

export default API;