import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Wrench, Book } from "lucide-react";

function AboutSection() {
  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to CadMax</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At CadMax, we combine precision tools and skill-based training to empower professionals, students, and engineers. Discover high-quality tools and courses designed to meet your unique needs.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tools Section */}
          <motion.div
            className="p-8 hover:shadow-xl transition-shadow bg-white rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-indigo-50 rounded-full mb-6">
                <Wrench className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Precision Tools for Every Project</h3>
              <p className="text-gray-600 mb-8">
                From Vernier Calipers to Set Squares, our tools are designed for accuracy, durability, and affordability. Whether you're an engineer, architect, or student, our tools ensure excellence in every measurement.
              </p>
              <Link to="/sales" className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition">
                Shop Tools
              </Link>
            </div>
          </motion.div>
          {/* Courses Section */}
          <motion.div
            className="p-8 hover:shadow-xl transition-shadow bg-white rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-indigo-50 rounded-full mb-6">
                <Book className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Industry-Ready Courses</h3>
              <p className="text-gray-600 mb-8">
                Learn the skills you need to succeed in your career. Our courses provide hands-on experience and practical knowledge in precision tools and related fields.
              </p>
              <Link to="/courses" className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition">
                Explore Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
