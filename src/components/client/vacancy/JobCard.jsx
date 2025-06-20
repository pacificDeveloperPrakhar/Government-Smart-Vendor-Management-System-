import { Building2, MapPin, DollarSign, Clock } from "lucide-react";

function JobCard({ job, onViewDetails }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={job.logo}
            alt={job.company}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
            <div className="flex items-center text-gray-600">
              <Building2 className="h-4 w-4 mr-1" />
              <span>{job.company}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-4">{job.description}</p>

        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>{job.posted}</span>
          </div>
        </div>

        <button
          onClick={() => onViewDetails(job.id)}
          className="mt-4 w-full bg-indigo-50 text-indigo-700 py-2 px-4 rounded-md hover:bg-indigo-100 transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default JobCard;
