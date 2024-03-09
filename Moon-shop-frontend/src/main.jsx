import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";

// Using ReactDOM.createRoot for Concurrent Mode
ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrapping the entire application with StrictMode for additional development checks
  <React.StrictMode>
    {/* BrowserRouter to enable routing in the application */}
    <BrowserRouter>
      {/* AuthProvider to provide authentication context to the entire application */}
      <AuthProvider>
        {/* Defining routes for the application using React Router */}
        <Routes>
          {/* Route to render the App component for all paths */}
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
