import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaProjectDiagram,
  FaUsers,
  FaLayerGroup,
  FaClipboardList,
  FaTachometerAlt,
} from "react-icons/fa";

import "./Layout.css";

export default function Sidebar() {

  const [collapsed, setCollapsed] = useState(true);

  return (
    <div
      className={collapsed ? "sidebar collapsed" : "sidebar"}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >

      <h2 className="sidebar-title">
        {collapsed ? "BMS" : "Dashboard"}
      </h2>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
        end
      >
        <FaTachometerAlt />
        {!collapsed && <span>Dashboard</span>}
      </NavLink>

      <div className="sidebar-divider"></div>

      <NavLink
        to="/vertical"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <FaBuilding />
        {!collapsed && <span>Business Vertical</span>}
      </NavLink>

      <NavLink
        to="/unit"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <FaLayerGroup />
        {!collapsed && <span>Business Unit</span>}
      </NavLink>

      <NavLink
        to="/project"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <FaProjectDiagram />
        {!collapsed && <span>Business Project</span>}
      </NavLink>

      <NavLink
        to="/details"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <FaClipboardList />
        {!collapsed && <span>Project Details</span>}
      </NavLink>

      <NavLink
        to="/employee"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <FaUsers />
        {!collapsed && <span>Employees</span>}
      </NavLink>

    </div>
  );
}