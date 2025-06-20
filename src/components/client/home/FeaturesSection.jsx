import { motion } from "framer-motion";
import { GraduationCap, Target, Users } from "lucide-react";

const features = [
  {
    icon: <GraduationCap className="w-8 h-8 text-indigo-600" />, 
    title: "High Accuracy & Durability",
    description: "Our tools are designed to provide the highest level of accuracy and durability for all your precision needs."
  },
  {
    icon: <Target className="w-8 h-8 text-indigo-600" />,
    title: "Affordable Prices",
    description: "We offer competitive pricing without compromising on quality."
  },
  {
    icon: <Users className="w-8 h-8 text-indigo-600" />,
    title: "Perfect for Professionals and Learners",
    description: "Our tools are suitable for both professionals and students, ensuring everyone can achieve precision."
  }
];

function FeaturesSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CadMax?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We provide high-quality tools that ensure precision and reliability for all your projects.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="rounded-xl border bg-card text-card-foreground shadow p-6 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-indigo-50 rounded-full mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default FeaturesSection;
