import { useState } from "react";
import InputField from "../ui/forms/InputField";
import axios from "axios";
function ApplyJob() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Add validation logic here

    console.log("Student Registration Data:", formData);
    // TODO: Add API call to submit the form data
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Student Registration
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Name"
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              error={errors.name}
            />
            <InputField
              label="Email"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.email}
            />
            <InputField
              label="Phone"
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
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplyJob;
