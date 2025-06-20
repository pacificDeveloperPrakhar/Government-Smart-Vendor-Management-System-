import { useState } from "react";
import InputField from "../../ui/forms/InputField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function RegisterStudent() {
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };
  const validateForm = () => {
    const validationErrors = {};
    // Add your validation logic here
    if (!formData.email) {
      validationErrors.email = "Email is required";
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:3000/registration/studentRoutes/register",
          formData,
          { withCredentials: true }
        );
        // console.log("Form submitted:", formData);
        if (response.status === 200) {
          navigate("/login");
          // alert("Student registered successfully!");
        }
      } catch (error) {
        console.error("Error submitting form:", error.response.data);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Student Registration
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Student Name"
              type="text"
              id="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
              error={errors.studentName}
            />

            <InputField
              label="Official Email ID"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.email}
            />

            <InputField
              label="Contact Number"
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              error={errors.phone}
            />

            <InputField
              label="Address"
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
              error={errors.address}
            />

            <InputField
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
              error={errors.password}
            />

            <InputField
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              required
              error={errors.confirmPassword}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
            >
              Register Student
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterStudent;
