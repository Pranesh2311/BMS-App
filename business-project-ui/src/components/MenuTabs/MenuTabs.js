import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MenuTabs.css";

const MenuTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide MenuTab on login/register pages
  if (
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  const tabs = [
    { name: "Business Vertical", path: "/vertical" },
    { name: "Business Unit", path: "/unit" },
    { name: "Business Project", path: "/project" },
    { name: "Project Details", path: "/details" },
    { name: "Create Employee", path: "/employee" }
  ];

  return (
    <div className="menu-container">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className={`menu-tab ${
            location.pathname === tab.path ? "active" : ""
          }`}
          onClick={() => navigate(tab.path)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default MenuTabs;