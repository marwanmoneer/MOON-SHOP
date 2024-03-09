import axios from "axios"; // Import the axios HTTP client library

// Define the base URL for the API you're going to call
const BASE_URL = "http://localhost:3000";

// Export a pre-configured instance of axios
export default axios.create({
  baseURL: BASE_URL, // Set the base URL for all requests made by this instance
  // You can add more configuration settings here if needed, like headers or timeout
});
