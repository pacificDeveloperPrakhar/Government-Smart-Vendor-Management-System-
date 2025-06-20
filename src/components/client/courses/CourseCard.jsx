import { GraduationCap, DollarSign, Clock, Layers } from "lucide-react";

function CourseCard({ course, onSelect }) {
  const { title, description, duration, fees, earnings, cost, stipend } = course;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-primary-50 rounded-full p-3">
            <GraduationCap className="text-primary w-8 h-8" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <div className="flex items-center text-gray-600 text-sm">
              <Layers className="h-4 w-4 mr-1" />
              <span>{duration}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-4">{description}</p>

        <div className="space-y-2">
          {fees && (
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-4 w-4 mr-2 text-blue-500" />
              <span>Fees: {fees}</span>
            </div>
          )}
          {earnings && (
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-4 w-4 mr-2 text-green-500" />
              <span>Potential Earnings: {earnings}</span>
            </div>
          )}
          {cost && (
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-4 w-4 mr-2 text-purple-500" />
              <span>Cost: {cost}</span>
            </div>
          )}
          {stipend && (
            <div className="text-gray-600">
              <div className="flex items-center mb-2">
                <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                <span>Stipend Details</span>
              </div>
              <ul className="pl-6 list-disc">
                {Object.entries(stipend).map(([key, value]) => (
                  <li key={key}>
                    <span className="text-sm">{`${key}: ${value}`}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={onSelect}
          className="mt-4 w-full bg-indigo-50 text-indigo-700 py-2 px-4 rounded-md hover:bg-indigo-100 transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
