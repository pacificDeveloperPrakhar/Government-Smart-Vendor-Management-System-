import { MapPin, Phone, Mail } from "lucide-react";

function ContactInfo() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
      <div className="space-y-4">
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3" />
          <div>
            <h3 className="font-semibold">Address</h3>
            <p className="text-gray-600">
              123 CADMAX Street, Tech City, TX 78001
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <Phone className="w-5 h-5 text-blue-600 mt-1 mr-3" />
          <div>
            <h3 className="font-semibold">Phone</h3>
            <p className="text-gray-600">(123) 456-7890</p>
          </div>
        </div>
        <div className="flex items-start">
          <Mail className="w-5 h-5 text-blue-600 mt-1 mr-3" />
          <div>
            <h3 className="font-semibold">Email</h3>
            <p className="text-gray-600">info@cadmax.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
