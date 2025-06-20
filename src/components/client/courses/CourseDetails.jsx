import {
  X,
  GraduationCap,
  DollarSign,
  Clock,
  Layers,
  ClipboardList,
} from "lucide-react";
import CourseApplicationForm from "./CourseApplicationForm";

function CourseDetails({ course, onClose }) {
  const { title, description, duration, fees, syllabus, benefits } = course;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <div className="bg-primary-50 p-4 rounded-full">
                <GraduationCap className="text-primary w-12 h-12" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{duration}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
              <span>Fees: {fees}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Layers className="h-5 w-5 mr-2 text-indigo-500" />
              <span>Duration: {duration}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Course Description</h3>
            <p className="text-gray-600">{description}</p>
          </div>

          {syllabus && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Syllabus</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {syllabus.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {benefits && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Benefits</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <CourseApplicationForm courseId={course.id} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
