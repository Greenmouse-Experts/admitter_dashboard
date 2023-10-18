import React, { useState } from "react";
import Sidenav from "./Sidenav";
import { Topnav } from "./Topnav";
import { Route, Routes } from "react-router-dom";
import "../stylesheet/layout.css";
import Admin from "./Admin";

const AdminDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 650);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="layout">
      <div>
        <Sidenav showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      </div>
      <div className={showSidebar ? "components" : "close-side"}>
        <div>
          <Topnav setShowSidebar={setShowSidebar} showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        </div>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Admin/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;