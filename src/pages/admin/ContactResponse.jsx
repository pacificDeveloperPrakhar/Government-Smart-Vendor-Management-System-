import { useState, useEffect } from "react";
import axios from "axios";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/contact-responses",
          { withCredentials: true }
        );
        setContacts(response.data || []);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError(
            "❌ You are not authorized to view this page. Please log in."
          );
        } else {
          setError("❌ Failed to load contact responses. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleRemove = (contact) => {
    setContacts(contacts.filter((c) => c._id !== contact._id));
  };

  const handleViewDetails = (contact) => {
    console.log("Contact details:", contact);
  };

  const headers = ["Name", "Email", "Subject", "Message", "Actions"];

  if (loading) {
    return <p className="text-gray-600">Loading contact responses...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Contact Form Responses
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 border-b bg-gray-50 text-left text-sm font-medium text-gray-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id} className="border-b">
                <td className="px-6 py-4 text-sm text-gray-700">
                  {contact.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {contact.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {contact.subject}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {contact.message}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div className="flex gap-2">
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(contact)}
                      className="bg-red-600 text-white text-sm font-medium py-1 px-3 rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
                    >
                      Remove
                    </button>

                    {/* Details Button */}
                    <button
                      onClick={() => handleViewDetails(contact)}
                      className="bg-gray-200 text-gray-800 text-sm font-medium py-1 px-3 rounded hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                    >
                      Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactList;
