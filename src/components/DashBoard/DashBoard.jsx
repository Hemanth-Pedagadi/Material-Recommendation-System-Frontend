import React from 'react';
import './DashBoard.css';
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-page">
      <nav className="admin-nav">
        <div className="nav-left">
          <h2>Material Recommender</h2>
        </div>
        <div className="nav-right">
          <ul>
            <li><Link to="/fetchusers">Manage Users</Link></li>
            <li><Link to="/fetchmaterials">Manage Materials</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </div>
      </nav>

      <main className="admin-main">
        <div className="welcome-section">
          <h3>Hello, Admin 👋</h3>
          <h1>Construction Material Recommendation System</h1>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
