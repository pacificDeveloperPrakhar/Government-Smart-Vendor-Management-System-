import { MapPin, Phone, Mail } from "lucide-react";

function FooterContact() {
  return (
    <div>
      <h4 className="font-bold text-lg mb-4">Contact Information</h4>
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
          <p className="text-gray-300">
            123 Main Street Kalanagar,
            <br />
            Nashik, Maharashtra,
            <br />
            India
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <p className="text-gray-300">+91 9356019433</p>
        </div>
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <a
            href="mailto:bhaleraohanuman4@gmail.com"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            bhaleraohanuman4@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default FooterContact;
