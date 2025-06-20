import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminNavbar, AdminSidebar } from "../components/index.js";

function AdminLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const collapseSidebar = () => {
    if (!isSidebarCollapsed) {
      setIsSidebarCollapsed(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" onClick={collapseSidebar}>
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <AdminSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <main className={!isSidebarCollapsed ? "opacity-40" : ""}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
