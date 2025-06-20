import { UserPlus, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

function Registration() {
  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join CadMax Institute
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your path and begin your journey with CadMax Institute
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Student Registration Section */}
          <div className="p-8 hover:shadow-xl transition-shadow bg-white rounded-lg">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-indigo-50 rounded-full mb-6">
                <UserPlus className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Student Registration</h3>
              <p className="text-gray-600 mb-8">
                Explore our comprehensive courses designed to empower you with
                the knowledge and skills needed for success in precision
                engineering and related fields.
              </p>
              <Link
                to="/registration/student"
                className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition"
              >
                Register as Student
              </Link>
            </div>
          </div>
          {/* Company Partnership Section */}
          <div className="p-8 hover:shadow-xl transition-shadow bg-white rounded-lg">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-indigo-50 rounded-full mb-6">
                <Building2 className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Company Partnership</h3>
              <p className="text-gray-600 mb-8">
                Collaborate with CadMax Institute to access a pool of skilled
                professionals and post job vacancies tailored to your
                organizational needs.
              </p>
              <Link
                to="/registration/company"
                className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition"
              >
                Register as Partner
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
