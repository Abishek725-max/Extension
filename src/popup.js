import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' for React 18+
import App from "./pages/_app"; // Your main app component

// Create a root to render your app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app using the new API
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
