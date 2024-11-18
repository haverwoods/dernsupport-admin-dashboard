
import React from "react";
import { jwtDecode } from "jwt-decode";
import Sidebars from "../components/common/sidebar";

export default function Layout({ children }) {
  // Safely retrieve and decode the token
  const token = localStorage.getItem("token");
  let rolename = "user";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      rolename = decoded?.role?.[0]?.name || "user"; // Default role as 'guest'
    } catch (error) {
      console.error("Error decoding token:", error);
      rolename = "user"; // Fallback role if decoding fails
    }
  } else {
    rolename = "user"; // Fallback role if no token is present
  }

  console.log("Role name:", rolename);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      {/* Sidebar with role */}
      <Sidebars role={rolename} />

      {/* Render children */}
      {children}
    </div>
  );
}
