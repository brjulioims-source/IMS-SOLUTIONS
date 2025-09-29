import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {SidebarProvider} from "./context/SidebarContext";
import { ThemeProvider } from "./context/ThemeContext";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import DataTables from "./pages/DataTables";
import SignIn from "./pages/SignIn";
import FormSections from "./pages/FormSections";


function App() {
  return (
    <SidebarProvider>
      <ThemeProvider>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<SignIn />} /> 
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/formulario" element={<FormSections />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/data-tables" element={<DataTables />} />
            </Routes>
        </BrowserRouter>
        </ThemeProvider>
    </SidebarProvider>
  );
}

export default App;
