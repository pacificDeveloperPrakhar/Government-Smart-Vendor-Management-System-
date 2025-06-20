import React from "react";

function CompanyCard({ company, onDelete }) {
  const fields = [
    { label: "CIN", value: company.cin },
    { label: "PAN/GST", value: company.panGst },
    { label: "Contact Person", value: company.contactPerson },
    { label: "Email", value: company.email },
    { label: "Phone", value: company.phone },
    { label: "Address", value: company.address },
  ];

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      onDelete(company._id);
    }
  };

  return (
    <div className="mb-4 bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {company.companyName}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <span className="font-semibold text-gray-700">{label}:</span>
            <span className="ml-2 text-gray-600">{value}</span>
          </div>
        ))}
        <div className="col-span-full">
          <span className="font-semibold text-gray-700">Website:</span>
          <a
            href={company.website}
            className="ml-2 text-blue-600 hover:text-blue-800"
          >
            {company.website}
          </a>
        </div>
      </div>
      <button
        onClick={handleDelete}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}

export default CompanyCard;
