import React from "react";
import "./LeftSidebar.css";
import { useNavigate } from "react-router-dom";

const LeftSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  
  return (
    <div className="left-sidebar">
      <div className="sidebar-item">
        <i className="bi bi-trash"></i>
        <span>Trash</span>
      </div>
      <div className="sidebar-item">
        <i className="bi bi-journal"></i>
        <span>Notes</span>
      </div>
      <div className="sidebar-item" onClick={handleLogout}>
        <i className="bi bi-box-arrow-left"></i>
        <span>Logout</span>
      </div>
    </div>
  );
};

export default LeftSidebar;
