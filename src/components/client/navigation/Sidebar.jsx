import { NavLink } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Book,
  Briefcase,
  Info,
  Bell,
} from "lucide-react";
import { ImProfile } from "react-icons/im";
const navLinks = [
  { icon: Home, to: "/", name: "Home" },
  { icon: Book, to: "/courses", name: "Courses" },
  { icon: Briefcase, to: "/vacancy", name: "Vacancy" },
  { icon: ShoppingCart, to: "/sales", name: "Buy Tools" },
  { icon: HelpCircle, to: "/contact", name: "Contact Us" },
  { icon: ImProfile, to: "/Me", name: "Contact Us" },
  { icon: Info, to: "/about", name: "About Us" },
  // { icon: Bell, to: "/notifications", name: "Notifications" },
];

function Sidebar({ isCollapsed, toggleSidebar }) {
  return (
    <div
      className={`fixed right-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300
        ${isCollapsed ? "w-16 hidden sm:block" : "w-64"} 
      `}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 py-4">
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
                {item.name === "Notifications" && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                )}
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

export default Sidebar;
