import React, { useEffect, useState } from "react";
import axios from "axios";
import CompanyCard from "../../components/admin/manageCompanies/CompanyCard";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/company",
          {
            withCredentials: true,
          }
        );
        setCompanies(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("You are not authorized to view this page. Please log in.");
        } else {
          setError(
            err.message || "An error occurred while fetching companies."
          );
        }
      }
    };

    fetchCompanies();
  }, []);

  // Delete the company
  const handleDelete = async (companyId) => {
    try {
      await axios.delete(`http://localhost:3000/admin/company/${companyId}`);
      setCompanies(companies.filter((company) => company._id !== companyId)); // Remove deleted company from state
    } catch (err) {
      setError("Error occurred while deleting the company");
    }
  };

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (companies.length === 0) {
    return <p>No companies found.</p>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Companies</h1>
      <div className="space-y-4">
        {companies.map((company) => (
          <CompanyCard
            key={company._id}
            company={company}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default CompanyList;
