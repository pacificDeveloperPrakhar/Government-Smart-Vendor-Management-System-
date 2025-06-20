import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function LogoutModal({ setShowLogoutModal, setIsLoggedIn, userRole }) {
  const navigate = useNavigate();

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const confirmLogout = async () => {
    try {
      const logoutEndpoint =
        userRole === "student"
          ? "http://localhost:3000/registration/studentRoutes/logout"
          : "http://localhost:3000/registration/companyRoutes/logout";

      const response = await axios.get(logoutEndpoint, {
        withCredentials: true,
      });

      if (response.status === 200) {
        Cookies.remove("token");
        setIsLoggedIn(false);
        setShowLogoutModal(false); // Close the modal first
        navigate("/"); // Then navigate
      } else {
        console.log("Error logging out: ", response);
        response.status === 401 && navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Confirm Logout
        </h2>
        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={closeLogoutModal}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md "
          >
            Cancel
          </button>
          <button
            onClick={confirmLogout}
            onChange={closeLogoutModal}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
