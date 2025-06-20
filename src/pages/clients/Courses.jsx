import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { CourseCard, CourseDetails } from "../../components/index.js";

const courses = [
  {
    id: 1,
    title: "Basic Training Program",
    description: "Comprehensive 6-month training to build a solid foundation.",
    duration: "6 months",
    fees: "₹30,000",
  },
  {
    id: 2,
    title: "On-Job Training Program",
    description:
      "Gain practical experience during this 6-month job-oriented program with 90% attendance required.",
    duration: "6 months",
    fees: "₹60,000",
  },
  {
    id: 3,
    title: "Advanced Upskilling Program",
    description:
      "Upgrade your skills for better opportunities after 3 years of experience.",
    duration: "3 years (post-training)",
    earnings: "₹12L - ₹18L annually",
  },
  {
    id: 4,
    title: "Abroad Job Training",
    description:
      "Specialized training for jobs in Germany and Japan under government schemes.",
    duration: "Varies",
    cost: "₹3L - ₹4L (includes skill training, language, and expenses)",
  },
  {
    id: 5,
    title: "Short-Term Skill Development",
    description:
      "500-hour, 3-month program for candidates aged 15-45 under government collaboration.",
    duration: "3 months",
    fees: "Varies based on education level",
    stipend: {
      "12th Pass": "₹6,000/month",
      "ITI Qualified": "₹8,000/month",
      Undergraduate: "₹10,000/month",
    },
  },
];

function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 justify-center items-center mb-12">
          <div className="flex items-center justify-center">
            <GraduationCap className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Training Programs at CADMAX
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={() => setSelectedCourse(course)}
            />
          ))}
        </div>
      </div>

      {selectedCourse && (
        <CourseDetails
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}

export default Courses;
