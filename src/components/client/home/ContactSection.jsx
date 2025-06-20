import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

function ContactSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="p-8 text-center bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Ready to Take the Next Step?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Contact us today to learn more about our programs and how we can help
          you achieve your goals.
        </p>
        <div className="flex items-center justify-center space-x-4">
          {/* Contact Us Button */}
          <Link
            to="/contact"
            className="flex items-center bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            <Mail className="mr-2 h-5 w-5 text-white" />
            Contact Us
          </Link>

          {/* Download Brochure Button */}
          <a
            href="../../../public/Brocher.pdf"
            download="Brocher.pdf"
            className="border border-gray-300 text-gray-900 hover:bg-gray-100 hover:text-gray-800 py-3 px-6 rounded-lg transition"
          >
            Download Brochure
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
