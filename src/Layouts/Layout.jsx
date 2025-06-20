import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar} from "../components/index";
import ToastManager from "../utils/ToastManager";
function Layout() {
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
    <div className="min-h-screen bg-gray-50 " onClick={collapseSidebar}>
      <Navbar toggleSidebar={toggleSidebar} />
      <main className={!isSidebarCollapsed ? "opacity-40" : ""}>
        <Outlet />
      </main>
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      <ToastManager/>
    </div>
  );
}

export default Layout;
