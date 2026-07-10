import React from "react";
import { createRoot } from "react-dom/client";
// Reuse the exact dashboard from the main app (see vite.config alias "@").
import { Dashboard } from "@/components/hotd/Dashboard";
import "./styles.css";

const el = document.getElementById("root");
if (!el) throw new Error("Root element #root not found");

createRoot(el).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
);
