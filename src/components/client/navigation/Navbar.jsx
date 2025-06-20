import { Link, useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { useState } from "react";
import LogoutModal from "./LogoutModal";

function Navbar({ toggleSidebar, setIsLoggedIn, userRole }) {
  const navigate = useNavigate();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleToggleDropdown = () => {
    setToggleDropdown((prev) => !prev);
  };

  const handleCloseDropdown = () => {
    setToggleDropdown(false);
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center">

            </div>

            {/* Buttons Section */}
            <div className="flex items-center space-x-4">
              {/* Login Button */}
              <Link
                to="/registration/human_resource"
                className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
              >
                Login
              </Link>

              {/* Register Dropdown */}
              <div className="relative">
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  onClick={handleToggleDropdown}
                >
                  Register
                </button>
                <ul
                  className={`${
                    toggleDropdown ? "block" : "hidden"
                  } absolute right-0 mt-2 bg-white rounded-md shadow-lg w-48 p-2`}
                >
                  <li>
                    <Link
                      to="/registration/student"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-100 transition-colors"
                      onClick={handleCloseDropdown}
                    >
                      As Student
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/registration/company"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-100 transition-colors"
                      onClick={handleCloseDropdown}
                    >
                      As Company
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Logout Button */}
              <button
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                onClick={openLogoutModal}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>

              {/* Toggle Sidebar */}
              <button
                onClick={toggleSidebar}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutModal
          setShowLogoutModal={setShowLogoutModal}
          setIsLoggedIn={setIsLoggedIn}
          userRole={userRole}
        />
      )}
    </>
  );
}

export default Navbar;
