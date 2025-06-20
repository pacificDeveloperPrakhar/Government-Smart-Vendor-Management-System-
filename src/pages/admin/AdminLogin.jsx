import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      setMessage("❌ All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/admin/register",
        {
          username,
          password,
          confirmPassword,
          role: "Admin",
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setMessage("✅ Admin registered successfully! Redirecting...");
        setTimeout(() => {
          navigate("/admin/registered/companies");
        }, 1500);
      }
    } catch (error) {
      if (error.response) {
        setMessage(`❌ ${error.response.data.error}`);
      } else {
        setMessage("❌ Something went wrong. Please try again later.");
      }
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("❌ Username and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/admin/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/admin/registered/companies");
        }, 1500);
      }
    } catch (error) {
      if (error.response) {
        setMessage(`❌ ${error.response.data.error}`);
      } else {
        setMessage("❌ Something went wrong. Please try again later.");
      }
    }
  };

  const handleSubmit = () => {
    if (isRegistering) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isRegistering ? "Admin Registration" : "Admin Login"}
        </h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        {isRegistering && (
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white text-lg font-medium py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {isRegistering ? "Register" : "Login"}
        </button>
        <p
          className="mt-4 text-center text-sm text-gray-600 cursor-pointer"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setMessage("");
          }}
        >
          {isRegistering
            ? "Already have an account? Login here."
            : "Don't have an account? Register here."}
        </p>
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;
