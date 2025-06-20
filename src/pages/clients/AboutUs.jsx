import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Mail,
  Target,
  Users,
  Briefcase,
  Award,
  Heart,
} from "lucide-react";

function AboutUs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const features = [
    {
      icon: <Target className="w-6 h-6 text-indigo-600" />,
      title: "Training Programs",
      description:
        "Free, high-quality training programs tailored to manufacturing industry needs.",
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      title: "Community Engagement",
      description:
        "Active engagement with local communities through workshops and seminars.",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-indigo-600" />,
      title: "Partnerships for Impact",
      description:
        "Strategic collaborations to expand reach and enhance program quality.",
    },
  ];

  const outcomes = [
    "Increase the employability of rural and Adivasi youth",
    "Foster economic growth in local communities",
    "Contribute to India's manufacturing sector",
    "Empower women through skill training",
    "Reduce migration by creating local opportunities",
  ];

  const faqs = [
    {
      question: "What is the duration of the courses?",
      answer: "Each course has a duration of 4 to 6 weeks.",
    },
    {
      question: "Are there any prerequisites for the courses?",
      answer: "No prerequisites are required. All levels are welcome!",
    },
    {
      question: "Can I get a certificate after completing a course?",
      answer:
        "Yes, a certificate will be provided upon successful completion of the course.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept various payment methods including credit cards, debit cards, and PayPal.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "Yes, we have a refund policy in place. Please refer to our terms and conditions for more details.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Empowering Futures at CADMAX
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          At CADMAX, we are driven by a singular mission: to empower the youth
          of rural India, particularly from Adivasi communities, through skill
          development and education.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-gray-600">
            We envision a future where every young individual has access to
            quality education and training, enabling them to thrive in India's
            burgeoning manufacturing sector.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            CADMAX is dedicated to bridging the skill gap in rural India through
            comprehensive training programs that focus on practical, in-demand
            skills.
          </p>
        </div>
      </div>

      {/* What We Do */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          What We Do
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Expected Outcomes */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Expected Outcomes
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <p className="text-gray-600">{outcome}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleAnswer(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Join Us in Making a Difference
        </h2>
        <p className="text-gray-600 mb-8">
          We invite you to partner with CADMAX as we work towards creating a
          brighter future for rural youth in India.
        </p>
        <div className="flex items-center justify-center space-x-2 text-indigo-600">
          <Mail className="w-5 h-5" />
          <a
            href="mailto:caddmax2014@gmail.com"
            className="hover:text-indigo-700 transition-colors"
          >
            caddmax2014@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
