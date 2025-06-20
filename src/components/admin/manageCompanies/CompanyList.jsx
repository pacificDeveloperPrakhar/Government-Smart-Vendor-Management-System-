import React, { useEffect, useState } from "react";
import axios from "axios";
import CompanyCard from "./CompanyCard"; // import CompanyCard component

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch companies from the backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/company");
        setCompanies(response.data); // Setting company data to state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // If data is still loading
  if (loading) {
    return <p>Loading companies...</p>;
  }

  // If there was an error while fetching
  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  // If no companies are found
  if (companies.length === 0) {
    return <p>No companies found.</p>;
  }

  // Render list of companies
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Companies</h1>
      <div className="space-y-4">
        {companies.map((company) => (
          <CompanyCard key={company._id} company={company} />
        ))}
      </div>
    </div>
  );
}

export default CompanyList;
