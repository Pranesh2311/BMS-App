import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaProjectDiagram,
  FaUsers,
  FaLayerGroup,
  FaClipboardList,
  FaArrowRight,
} from "react-icons/fa";
import "./Dashboard.css";

const cards = [
  {
    title: "Business Vertical",
    description: "Manage and organize your business verticals. Create, edit, and track vertical status.",
    icon: FaBuilding,
    path: "/vertical",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    iconBg: "rgba(102, 126, 234, 0.15)",
    iconColor: "#667eea",
  },
  {
    title: "Business Unit",
    description: "Configure business units under each vertical with full lifecycle management.",
    icon: FaLayerGroup,
    path: "/unit",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    iconBg: "rgba(245, 87, 108, 0.15)",
    iconColor: "#f5576c",
  },
  {
    title: "Business Project",
    description: "Create and manage projects with unit distribution and percentage allocation.",
    icon: FaProjectDiagram,
    path: "/project",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    iconBg: "rgba(79, 172, 254, 0.15)",
    iconColor: "#4facfe",
  },
  {
    title: "Project Details",
    description: "Track detailed project info — managers, phases, timelines and budgets.",
    icon: FaClipboardList,
    path: "/details",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    iconBg: "rgba(67, 233, 123, 0.15)",
    iconColor: "#43e97b",
  },
  {
    title: "Employees",
    description: "Onboard employees, manage profiles, designations and contact info.",
    icon: FaUsers,
    path: "/employee",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    iconBg: "rgba(250, 112, 154, 0.15)",
    iconColor: "#fa709a",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      {/* Hero Section */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="hero-highlight">BMS</span>
          </h1>
          <p className="hero-subtitle">
            Business Management System — Your centralized hub for managing verticals, units, projects and teams.
          </p>
        </div>
        <div className="hero-decoration">
          <div className="hero-circle hero-circle-1"></div>
          <div className="hero-circle hero-circle-2"></div>
          <div className="hero-circle hero-circle-3"></div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Quick Access</h2>
          <p className="section-subtitle">Navigate to any module from here</p>
        </div>

        <div className="dashboard-grid">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.path}
                className="dashboard-card"
                onClick={() => navigate(card.path)}
                style={{ "--card-delay": `${index * 0.08}s` }}
              >
                <div className="card-gradient-bar" style={{ background: card.gradient }}></div>
                <div className="card-content">
                  <div className="card-icon-wrapper" style={{ background: card.iconBg }}>
                    <IconComponent className="card-icon" style={{ color: card.iconColor }} />
                  </div>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                  <div className="card-action">
                    <span className="card-action-text">Open Module</span>
                    <FaArrowRight className="card-action-arrow" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
