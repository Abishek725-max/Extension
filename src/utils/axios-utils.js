import axios from "axios";
import Router from "next/router"; // Import Router from Next.js

let BASE_URL = "https://dataapi.openledger.dev/api/v1/";
const appAxios = axios.create({
  baseURL: BASE_URL,
});

appAxios.interceptors.request.use(
  async function (config) {
    try {
      const auth_token = localStorage?.getItem("auth_token"); // Retrieve token from AsyncStorage
      console.log("🚀 ~ auth_token:", auth_token);
      // test = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHgzYWRiZDk5ZjI3YzIyMDY4OTgyYjA3NTVlNTM0ZmUxODBhOWRkYjFmIiwiaWQiOjEsImV4cCI6MTczMjM3Mzg4NX0.rb3E_wwLDftZrQOt-y166BMevu1SouGxqv2kS4wWAho" // Log token to verify it's being set correctly
      if (auth_token) config.headers.Authorization = `Bearer ${auth_token}`;
    } catch (error) {
      console.error("Error fetching auth token:", error);
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

appAxios.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    // Check for 401 status (unauthorized)
    if (error?.response?.status === 401 || error?.response?.status === 404) {
      console.error("Unauthorized: Token has expired or is invalid.");

      // Remove the expired token from storage
      localStorage.removeItem("auth_token");

      // Redirect to the home page
      Router.push("/welcome");
    }

    console.error("Error response:", error.response);

    return Promise.reject(error);
  }
);

export default appAxios;
