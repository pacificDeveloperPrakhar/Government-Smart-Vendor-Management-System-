import {
  X,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
} from "lucide-react";
import JobApplicationForm from "./JobApplicationForm.jsx";

function JobDetails({ job, isRegistered, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <img
                src={job.logo}
                alt={job.company}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {job.title}
                </h2>
                <div className="flex items-center text-gray-600">
                  <Building2 className="h-4 w-4 mr-1" />
                  <span>{job.company}</span>
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
              <MapPin className="h-5 w-5 mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-5 w-5 mr-2" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>{job.posted}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Briefcase className="h-5 w-5 mr-2" />
              <span>{job.type}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Job Description</h3>
            <p className="text-gray-600">{job.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Requirements</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>5+ years of experience in software development</li>
              <li>Strong proficiency in React, TypeScript, and Node.js</li>
              <li>Experience with cloud platforms (AWS, GCP, or Azure)</li>
              <li>Excellent problem-solving and communication skills</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Benefits</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Competitive salary and equity package</li>
              <li>Health, dental, and vision insurance</li>
              <li>Flexible work hours and remote options</li>
              <li>Professional development budget</li>
            </ul>
          </div>

          {isRegistered ? (
            <JobApplicationForm
              job={job} // Pass the job object to JobApplicationForm
              jobId={job.id}
              onClose={onClose}
            />
          ) : (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-2">
                Please sign in to apply for this position
              </p>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200">
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
