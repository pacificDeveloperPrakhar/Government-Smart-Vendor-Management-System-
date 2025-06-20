import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Building,
  Package,
  ShoppingCart,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navLinks = [
  { icon: Home, to: "/", name: "Dashboard" },
  { icon: Users, to: "/admin/applications", name: "Applications" },
  { icon: Building, to: "/admin/registered/companies", name: "Companies" },
  { icon: Package, to: "/admin/stock/manage", name: "Manage Stock" },
  { icon: ShoppingCart, to: "/admin/orders", name: "Orders" },
  { icon: MessageSquare, to: "/admin/contacts", name: "Feedbacks" },
];

function AdminSidebar({ isCollapsed, toggleSidebar }) {
  return (
    <div
      className={`
      z-40 fixed right-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300
      ${isCollapsed ? "w-16 hidden sm:block" : "w-64"} 
    `}
    >
      <div className="flex flex-col h-full">
        <nav className="mt-4 px-2">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                }`
              }
            >
              <div className="relative">
                <item.icon size={20} />
              </div>
              {!isCollapsed && <span className="ml-4">{item.name}</span>}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center p-4 hover:bg-indigo-50 text-gray-500 hover:text-indigo-600"
        >
          {isCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
