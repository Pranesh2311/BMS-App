import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./components/layout/Layout.css";

import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";

import Dashboard from "./components/Dashboard/Dashboard";

import BusinessVertical from "./components/BusinessVertical/BusinessVertical";
import EditBusinessVertical from "./components/BusinessVertical/EditBusinessVertical"; // ✅ ADD THIS

import BusinessUnit from "./components/BusinessUnit/BusinessUnit";
import EditBusinessUnit from "./components/BusinessUnit/EditBusinessUnit"; // ✅ add

import BusinessProject from "./components/BusinessProject/BusinessProject";
import EditBusinessProject from "./components/BusinessProject/EditBusinessProject"; // ✅ add

import ProjectDetails from "./components/ProjectDetails/ProjectDetails";
import ProjectDetailsEdit from "./components/ProjectDetails/ProjectDetailsEdit";

import CreateEmployee from "./components/CreateEmployee/CreateEmployee";
import EditEmployee from "./components/CreateEmployee/EditEmployee";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Sidebar />
//       {/* <MenuTabs /> */}

//       <Routes>
//         {/* Default redirect (optional but recommended) */}
//         <Route path="/" element={<ProtectedRoute><BusinessVertical /></ProtectedRoute>} />

//         <Route path="/vertical" element={<ProtectedRoute><BusinessVertical /></ProtectedRoute>} />
//         <Route path="/unit" element={<ProtectedRoute><BusinessUnit /></ProtectedRoute>} />
//         <Route path="/project" element={<ProtectedRoute><BusinessProject /></ProtectedRoute>} />
//         <Route path="/details" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
//         <Route path="/employee" element={<ProtectedRoute><CreateEmployee /></ProtectedRoute>} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* ✅ EDIT PAGE ROUTE */}
//         <Route path="/vertical/edit/:id" element={<ProtectedRoute><EditBusinessVertical /></ProtectedRoute>} />
//         <Route path="/unit/edit/:id" element={<ProtectedRoute><EditBusinessUnit /></ProtectedRoute>} />
//         <Route path="/project/edit/:id" element={<ProtectedRoute><EditBusinessProject /></ProtectedRoute>} />
//         <Route path="/details/edit/:id" element={<ProtectedRoute><ProjectDetailsEdit /></ProtectedRoute>} />
//         <Route path="/employee/edit/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

function AppLayout() {

  const location = useLocation();

  // Hide sidebar/navbar on auth pages
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";

  return (
    <>

      {/* SIDEBAR */}
      {!hideLayout && <Sidebar />}

      {/* NAVBAR */}
      {!hideLayout && <Navbar />}

      {/* MAIN CONTENT */}
      <div className={hideLayout ? "auth-content" : "main-content"}>

          <Routes>

            {/* AUTH */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* DEFAULT — Dashboard */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

            {/* BUSINESS VERTICAL */}
            <Route path="/vertical" element={<ProtectedRoute><BusinessVertical /></ProtectedRoute>} />
            <Route path="/vertical/edit/:id" element={<ProtectedRoute><EditBusinessVertical /></ProtectedRoute>} />

            {/* BUSINESS UNIT */}
            <Route path="/unit" element={<ProtectedRoute><BusinessUnit /></ProtectedRoute>} />
            <Route path="/unit/edit/:id" element={<ProtectedRoute><EditBusinessUnit /></ProtectedRoute>} />

            {/* BUSINESS PROJECT */}
            <Route path="/project" element={<ProtectedRoute><BusinessProject /></ProtectedRoute>} />
            <Route path="/project/edit/:id" element={<ProtectedRoute><EditBusinessProject /></ProtectedRoute>} />

            {/* PROJECT DETAILS */}
            <Route path="/details" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
            <Route path="/details/edit/:id" element={<ProtectedRoute><ProjectDetailsEdit /></ProtectedRoute>} />

            {/* EMPLOYEE */}
            <Route path="/employee" element={<ProtectedRoute><CreateEmployee /></ProtectedRoute>} />
            <Route path="/employee/edit/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />

          </Routes>

      </div>

    </>
  );
}

function App() {

  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;