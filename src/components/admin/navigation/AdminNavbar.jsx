import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Bell, User, LogOut } from "lucide-react"; // Import LogOut icon
import axios from "axios";

function AdminNavbar({ toggleSidebar }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch notifications from the backend
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/notifications",
          { withCredentials: true }
        );
        const fetchedNotifications = response.data.notifications || [];
        setNotifications(fetchedNotifications);
        // Count unread notifications
        const unread = fetchedNotifications.filter(
          (notif) => !notif.read
        ).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = () => {
    // Toggle the notification dropdown
    setShowNotifications(!showNotifications);
    // Mark all notifications as read
    setUnreadCount(0);
    // Optionally, send an API request to mark notifications as read
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/admin/logout", {
        withCredentials: true,
      });
      // Redirect to home page after logout
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="text-xl font-bold text-gray-800"
                onDoubleClick={() => navigate("/admin")}
              >
                <img src="/logo.jpg" alt="Logo" className="h-16 w-auto" />
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="relative p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification._id}
                        className="p-4 border-b border-gray-200 last:border-0"
                      >
                        <p className="text-sm text-gray-700">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(notification.date).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-sm text-gray-500">
                      No notifications
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              title="Logout"
            >
              <LogOut size={20} />
            </button>

            <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <User size={20} />
            </button>
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
  );
}

export default AdminNavbar;
