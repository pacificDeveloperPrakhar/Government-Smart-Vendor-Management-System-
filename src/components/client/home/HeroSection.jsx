import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black/60 " />
      <img
        src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt="Precision Engineering"
        className="w-full h-screen object-cover"
      />
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Welcome to Vendorly
            </h1>
            <p className="text-xl text-gray-200 mb-8">
            Powers the recommendation system by analyzing historical trends, weather, location data, and unstructured
insights to suggest high-demand items and optimize inventory
🏛 Government Policy & PM SVANidhi API
To integrate vendor access to schemes, rewards, and government benefits.
⚙️ Automation Tools
Send SMS recommendations to vendors based on demand and trends
Trigger hygiene/low score alerts with tips and links to relevant government policies
Increase awareness and encourage compliance through real-time messaging
            </p>
            <div className="flex gap-4">
              <Link
                to="/sales"
                className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
              >
                Explore
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
